import { useQuery, useMutation } from 'react-apollo-hooks';
import { GET_COMMENTS } from 'core/providers/Applications/queries/comment';
import { ADD_COMMENT } from 'core/providers/Applications/mutations/comment';
import { GET_APPLICATIONS_HOME } from 'core/providers/Applications/queries/application';
import moment from 'moment';

/** */
export const useGetComments = appId => {
  const { data, loading } = useQuery(GET_COMMENTS, { variables: { appId } });
  const result = data?.getComments || [];

  return { result, loading };
};

/** */
export const useAddComment = (inputValues, appId) => {
  const [handleSubmit, { error }] = useMutation(ADD_COMMENT, {
    variables: { appId, ...inputValues, createdAt: moment().format('YYYY-MM-DD H:mm:ss') },
    refetchQueries: [
      {
        query: GET_COMMENTS,
        variables: { appId }
      }
    ],
    update: cache => {
      const { getApplicationsHome } = cache.readQuery({ query: GET_APPLICATIONS_HOME });
      getApplicationsHome.applications.forEach(app => {
        if (app._id === appId) {
          app.comments = app.comments + 1;
        }
      });

      cache.writeQuery({
        query: GET_APPLICATIONS_HOME,
        data: { getApplicationsHome }
      });
    }
  });

  return { handleSubmit, error };
};
