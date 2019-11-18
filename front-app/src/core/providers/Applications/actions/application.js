import { useEffect, useState } from "react";
import { useQuery, useMutation } from "react-apollo-hooks";
import clone from "lodash.clonedeep";

import {
  GET_APPLICATIONS_DASHBOARD,
  GET_APPLICATIONS_HOME,
  GET_APPLICATION_DASHBOARD_DETAILS,
  GET_APPLICATION_DATA_HOME,
  GET_APPLICATION_SUPPORT
} from "core/providers/Applications/queries/application";

import {
  ADD_APPLICATION,
  UPDATE_APPLICATION,
  UPDATE_APP_WITH_IMAGE,
  SHOW_HIDE_APP,
  DELETE_APP,
  SAVE_CLICK_TROUGH
} from "core/providers/Applications/mutations";

import { toast } from "react-toastify";
import axios from "axios";
import client from "core/providers/Apollo";
import { config } from "core/constants/service";

/** Get Applications for Dashboard */
export const useGetApplicationsDashboard = () => {
  const { data, loading } = useQuery(GET_APPLICATIONS_DASHBOARD);

  const result = data?.getApplicationsDashBoard || [];
  return { result, loading };
};

/** Get Application Data Dashboard */
export const useGetApplicationDataDashboard = appId => {
  const [appData, setAppData] = useState({
    appDetails: {},
    contributors: [],
    dataSources: [],
    targetAudience: [],
    phases: [],
    support: {}
  });

  const handleInputChange = event => {
    setAppData({
      ...clone(appData),
      appDetails: {
        ...appData.appDetails,
        [event.target.name]: event.target.value
      }
    });
  };

  const handleDropDownChange = (_, event) => {
    setAppData({
      ...clone(appData),
      appDetails: { ...appData.appDetails, [event.name]: event.value }
    });
  };

  const handleDatePickerChange = (name, value) => {
    const formatedValue = value === null ? "" : value;

    setAppData({
      ...clone(appData),
      appDetails: { ...appData.appDetails, [name]: formatedValue }
    });
  };

  // Changes for dataSources
  const onChangeDataSources = (_, data) => {
    const dataSources = [...appData.dataSources];
    const index = dataSources.findIndex(item => item._id === data.item._id);

    if (index !== -1) {
      dataSources.splice(index, 1);
    } else {
      const { _id, title, type } = data.item;
      dataSources.push({ _id, title, type });
    }

    setAppData({
      ...clone(appData),
      dataSources: [...dataSources]
    });
  };

  // Changes for targetAudience
  const onChangeTargetAudience = (_, data) => {
    const targetAudience = [...appData.targetAudience];
    const index = targetAudience.findIndex(item => item._id === data.item._id);

    if (index !== -1) {
      targetAudience.splice(index, 1);
    } else {
      const { _id, title, type } = data.item;
      targetAudience.push({ _id, title, type });
    }

    setAppData({
      ...clone(appData),
      targetAudience: [...targetAudience]
    });
  };

  const { data, loading } = useQuery(GET_APPLICATION_DASHBOARD_DETAILS, {
    variables: { appId },
    fetchPolicy: "no-cache"
  });

  useEffect(() => {
    if (data && data.getApplication) {
      const {
        dataSources,
        targetAudience,
        currentVersion,
        provider,
        title,
        url,
        releaseDate,
        nextReleaseDate,
        description,
        whenToUse,
        phases,
        contributors
      } = data.getApplication;

      //get support
      const support = data.getSupport;

      setAppData(appData => ({
        ...clone(appData),
        appDetails: {
          currentVersion,
          provider,
          title,
          url,
          releaseDate,
          nextReleaseDate,
          description,
          whenToUse
        },
        dataSources,
        targetAudience,
        phases,
        support: { ...support },
        contributors
      }));
    }
  }, [data]);

  return {
    appData,
    setAppData,
    loading,
    onChangeDataSources,
    onChangeTargetAudience,
    handleInputChange,
    handleDropDownChange,
    handleDatePickerChange
  };
};

/** Insert new Application */
export const useAddApplication = inputValues => {
  const [handleSubmit, { error }] = useMutation(ADD_APPLICATION, {
    variables: { inputData: { ...inputValues } },
    refetchQueries: [
      {
        query: GET_APPLICATIONS_DASHBOARD
      },
      {
        query: GET_APPLICATIONS_HOME
      }
    ]
  });

  return { handleSubmit, error };
};

/** Update Application */
export const useUpdateApplication = (appData, appId) => {
  const [saveApplication, { error }] = useMutation(UPDATE_APPLICATION, {
    variables: {
      inputApplication: appData.appDetails,
      inputDataSources: appData.dataSources,
      inputTargetAudience: appData.targetAudience,
      inputPhase: appData.phases,
      inputSupport: appData.support,
      inputContributors: appData.contributors,
      appId
    },

    refetchQueries: [
      // {
      //   query: GET_APPLICATION_DASHBOARD_DETAILS,
      //   variables: { appId }
      // },
      {
        query: GET_APPLICATIONS_DASHBOARD
      }
    ],

    update: (
      cache,
      {
        data: {
          updateApplication: { _id, targetAudience, title, url, picture }
        }
      }
    ) => {
      try {
        const { getApplicationsHome } = cache.readQuery({
          query: GET_APPLICATIONS_HOME
        });
        if (getApplicationsHome) {
          getApplicationsHome.applications.forEach(app => {
            if (app._id === _id) {
              app.title = title;
              app.url = url;
              app.picture = picture;
              app.targetAudience = targetAudience;
            }
          });
          cache.writeQuery({
            query: GET_APPLICATIONS_HOME,
            data: { getApplicationsHome }
          });
        }
      } catch (e) {}
    }
  });

  return { saveApplication, error };
};

/** Upload Image */
export function uploadFile(appId, image, hideModal, messageType) {
  let toastId = false;

  const fileExtension = image.name
    .substring(image.name.lastIndexOf(".") + 1)
    .toLowerCase();

  return axios
    .post(config.url.UPLOAD_API, { fileExtension })
    .then(({ data: { url, filename } }) => {
      return axios
        .put(url, image, {
          onUploadProgress: event => {
            const progress = event.loaded / event.total;
            if (!toastId & (progress < 1)) {
              toastId = toast.info("Uploading Image", {
                progress
              });
            } else {
              toast.update(toastId, {
                progress
              });
            }
          }
        })
        .then(async () => {
          await client.mutate({
            mutation: UPDATE_APP_WITH_IMAGE,
            variables: {
              appId,
              imageUrl: `${config.url.S3_LINK}/${filename}`
            },
            refetchQueries: [
              {
                query: GET_APPLICATIONS_DASHBOARD
              }
            ]
          });
          toast.done(toastId);
          hideModal();
          toast.info(`Application ${messageType} successfully!`);
        })
        .catch(err => {
          hideModal();
          toast.info(`Application ${messageType} successfully!`);
          toast.error(`Image Upload Failed! ${err}`);
        });
    })
    .catch(err => {
      hideModal();
      toast.info(`Application ${messageType} successfully!`);
      toast.error(`Image Upload Failed! ${err}`);
    });
}

/* HOME PAGE
 **************************************************************/

/** Get Application for Homepage */
export const useGetApplicationsHome = () => {
  const { data, loading } = useQuery(GET_APPLICATIONS_HOME);

  let result = {};

  result.applications = data?.getApplicationsHome?.applications || [];
  result.userApps = data?.getApplicationsHome?.user?.applications || [];
  result.userRatings = data?.getApplicationsHome?.userRatings || [];
  result.userFunction = data?.getApplicationsHome?.user?.userFunction || false;
  result.userRole = data?.getApplicationsHome?.user?.userRole || false;

  return { result, loading };
};

/** Get Application Data for Homepage */
export const useGetApplicationDataHome = appId => {
  const { data, loading } = useQuery(GET_APPLICATION_DATA_HOME, {
    variables: { appId },
    fetchPolicy: "no-cache"
  });

  const result = data?.getApplication || [];

  return { result, loading };
};

/** Get Application Support */
export const useGetApplicationSupport = appId => {
  const { data, loading } = useQuery(GET_APPLICATION_SUPPORT, {
    variables: { appId }
  });

  const result = {};
  result.support = data?.getSupport || [];
  result.app = data?.getApplication || [];

  return { result, loading };
};

export const useShowHideApplication = () => {
  const [handleChange, { error }] = useMutation(SHOW_HIDE_APP, {
    refetchQueries: [
      {
        query: GET_APPLICATIONS_DASHBOARD
      }
    ],
    update: (cache, { data: { showHideApp } }) => {
      try {
        const { getApplicationsHome } = cache.readQuery({
          query: GET_APPLICATIONS_HOME
        });
        if (getApplicationsHome) {
          let applications = [];

          if (!showHideApp.visible) {
            applications = getApplicationsHome.applications.filter(
              app => app._id !== showHideApp._id
            );
          } else {
            applications = getApplicationsHome.applications.push(showHideApp);
          }

          getApplicationsHome.applications = [...applications];

          cache.writeQuery({
            query: GET_APPLICATIONS_HOME,
            data: { getApplicationsHome }
          });
        }
      } catch (e) {}
    }
  });

  return { handleChange, error };
};

export const useDeleteApplication = () => {
  const [handleDelete, { error }] = useMutation(DELETE_APP, {
    refetchQueries: [
      {
        query: GET_APPLICATIONS_DASHBOARD
      }
    ],
    update: (
      cache,
      {
        data: {
          deleteApplication: { _id }
        }
      }
    ) => {
      try {
        const { getApplicationsHome } = cache.readQuery({
          query: GET_APPLICATIONS_HOME
        });
        if (getApplicationsHome) {
          const applications = getApplicationsHome.applications.filter(
            app => app._id !== _id
          );

          getApplicationsHome.applications = [...applications];

          cache.writeQuery({
            query: GET_APPLICATIONS_HOME,
            data: { getApplicationsHome }
          });
        }
      } catch (e) {}
    }
  });

  return { handleDelete, error };
};

export const useSaveClickTrough = () => {
  const [handleSave, { error }] = useMutation(SAVE_CLICK_TROUGH);

  return { handleSave, error };
};
