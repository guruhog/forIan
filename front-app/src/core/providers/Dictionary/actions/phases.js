import { useQuery, useMutation } from 'react-apollo-hooks';
import { GET_PHASES } from 'core/providers/Dictionary/queries/phases';
import { DELETE_PHASE, ADD_PHASE } from 'core/providers/Dictionary/mutations/phases';

/** */
export const useGetPhases = () => {
  const { data, loading } = useQuery(GET_PHASES);

  // const result = data?.getPhases || [];
  return { data, loading };
};

/** */
export const useAddPhase = () => {
  const [handleSavePhase, { error }] = useMutation(ADD_PHASE, {
    update: (cache, { data: { addPhase } }) => {
      const { getPhases } = cache.readQuery({ query: GET_PHASES });

      getPhases.push(addPhase);

      cache.writeQuery({
        query: GET_PHASES,
        data: { getPhases }
      });
    }
  });

  return { handleSavePhase, error };
};

/** */
export const useDeletePhase = () => {
  const [handleDelete, { error }] = useMutation(DELETE_PHASE, {
    update: (cache, { data: { deletePhase: id } }) => {
      const { getPhases } = cache.readQuery({ query: GET_PHASES });

      cache.writeQuery({
        query: GET_PHASES,
        data: { getPhases: getPhases.filter(item => item._id !== id) }
      });
    }
  });

  return { handleDelete, error };
};
