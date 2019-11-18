import { useQuery, useMutation } from 'react-apollo-hooks';
import { GET_CONTRIBUTORS } from 'core/providers/Dictionary/queries/contributors';
import {
  DELETE_CONTRIBUTOR,
  ADD_CONTRIBUTOR,
  SEARCH_CONTRIBUTORS
} from 'core/providers/Dictionary/mutations/contributors';

/** */
export const useGetContributors = () => {
  const { data, loading } = useQuery(GET_CONTRIBUTORS);

  const result = data?.getContributors || [];

  return { result, loading };
};

/** */
export const useAddContributor = () => {
  const [handleSaveContributor, { error }] = useMutation(ADD_CONTRIBUTOR, {
    update: (cache, { data: { addContributor } }) => {
      const { getContributors } = cache.readQuery({ query: GET_CONTRIBUTORS });

      getContributors.push(addContributor);

      cache.writeQuery({
        query: GET_CONTRIBUTORS,
        data: { getContributors }
      });
    }
  });

  return { handleSaveContributor, error };
};

/** */
export const useDeleteContributor = () => {
  const [handleDelete, { error }] = useMutation(DELETE_CONTRIBUTOR, {
    update: (cache, { data: { deleteContributor: id } }) => {
      const { getContributors } = cache.readQuery({ query: GET_CONTRIBUTORS });

      cache.writeQuery({
        query: GET_CONTRIBUTORS,
        data: { getContributors: getContributors.filter(item => item._id !== id) }
      });
    }
  });

  return { handleDelete, error };
};

export const useSearchContributors = () => {
  const [handleSearch, { error }] = useMutation(SEARCH_CONTRIBUTORS);
  return { handleSearch, error };
};
