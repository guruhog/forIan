import { useQuery } from 'react-apollo-hooks';
import { GET_SUMMARY, GET_APP_SUMMARY } from 'core/providers/Insights/queries';

export const useGetSummary = searchParams => {
  const { data, loading } = useQuery(GET_SUMMARY, {
    variables: { ...searchParams },
    fetchPolicy: 'no-cache'
  });

  return { data, loading };
};

export const useGetAppSummary = (searchParams, appId) => {
  const { data, loading } = useQuery(GET_APP_SUMMARY, {
    variables: { ...searchParams, appId },
    fetchPolicy: 'no-cache'
  });

  return { data, loading };
};

/** Get App page views  */
// export const useGetAppPageViews = appId => {
//   const { data, loading } = useQuery(GET_APP_PAGE_VIEWS, { variables: { appId } });

//   let resultAppPageViews = [];

//   if (data?.getAppPageViews) {
//     const result = JSON.parse(data?.getAppPageViews);

//     resultAppPageViews = Object.entries(result).reduce((acc, [key, value]) => {
//       acc['labels'] = acc['labels'] || [];
//       acc['data'] = acc['data'] || [];

//       // const pageName = key || 'other';
//       if (key !== '') {
//         acc['labels'].push(key);
//         acc['data'].push(value);
//       }
//       return acc;
//     }, {});
//   }

//   return { resultAppPageViews, loadingAppPageViews: loading };
// };

/** */
// export const useGetAppUniqueUsers = appId => {
//   const { data, loading } = useQuery(GET_APP_UNIQUE_USERS, { variables: { appId } });

//   let resultAppUniqueUsers = [];

//   if (data?.getAppUniqueUsers) {
//     const result = JSON.parse(data?.getAppUniqueUsers);

//     resultAppUniqueUsers = Object.entries(result).reduce((acc, [key, value]) => {
//       acc['labels'] = acc['labels'] || [];
//       acc['data'] = acc['data'] || [];

//       acc['labels'].unshift(key);
//       acc['data'].unshift(Object.keys(value).length);

//       return acc;
//     }, []);
//   }

//   return { resultAppUniqueUsers, loadingAppUniqueUsers: loading };
// };
