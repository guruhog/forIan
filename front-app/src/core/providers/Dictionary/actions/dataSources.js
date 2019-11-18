import { useQuery, useMutation } from 'react-apollo-hooks';
import { GET_DATASOURCES } from 'core/providers/Dictionary/queries/dataSource';

import { DELETE_DATASOURCE, ADD_DATASOURCE } from 'core/providers/Dictionary/mutations/dataSource';
import { GET_APPLICATIONS_HOME } from 'core/providers/Applications/queries/application';

/** */
export const useGetDataSources = () => {
  const { data, loading } = useQuery(GET_DATASOURCES);

  const result = data?.getDataSources || [];
  return { result, loading };
};

export const useAddDataSource = () => {
  const [handleSaveDataSource, { error }] = useMutation(ADD_DATASOURCE, {
    update: (cache, { data: { addDataSource } }) => {
      const { getDataSources } = cache.readQuery({ query: GET_DATASOURCES });

      getDataSources.push(addDataSource);

      cache.writeQuery({
        query: GET_DATASOURCES,
        data: { getDataSources }
      });
    }
  });

  return { handleSaveDataSource, error };
};

/** */
export const useDeleteDataSource = () => {
  const [handleDelete, { error }] = useMutation(DELETE_DATASOURCE, {
    refetchQueries: [
      {
        query: GET_APPLICATIONS_HOME
      }
    ],
    update: (cache, { data: { deleteDataSource: id } }) => {
      const { getDataSources } = cache.readQuery({ query: GET_DATASOURCES });

      cache.writeQuery({
        query: GET_DATASOURCES,
        data: { getDataSources: getDataSources.filter(item => item._id !== id) }
      });
    }
  });

  return { handleDelete, error };
};
