import { useQuery, useMutation } from 'react-apollo-hooks';
import { GET_TARGETAUDIENCE } from 'core/providers/Dictionary/queries/targetAudience';
import { GET_APPLICATIONS_HOME } from 'core/providers/Applications/queries/application';

import {
  DELETE_TARGETAUDIENCE,
  ADD_TARGETAUDIENCE
} from 'core/providers/Dictionary/mutations/targetAudience';

/** */
export const useGetTargetAudience = () => {
  const { data, loading } = useQuery(GET_TARGETAUDIENCE);

  const result = data?.getTargetAudience || [];
  return { result, loading };
};

/** */
export const useAddTargetAudience = () => {
  const [handleSaveTargetAudience, { error }] = useMutation(ADD_TARGETAUDIENCE, {
    update: (cache, { data: { addTargetAudience } }) => {
      const { getTargetAudience } = cache.readQuery({ query: GET_TARGETAUDIENCE });

      getTargetAudience.push(addTargetAudience);

      cache.writeQuery({
        query: GET_TARGETAUDIENCE,
        data: { getTargetAudience }
      });
    }
  });

  return { handleSaveTargetAudience, error };
};

export const useDeleteTargetAudience = () => {
  const [handleDelete, { error }] = useMutation(DELETE_TARGETAUDIENCE, {
    refetchQueries: [
      {
        query: GET_APPLICATIONS_HOME
      }
    ],
    update: (cache, { data: { deleteTargetAudience: id } }) => {
      const { getTargetAudience } = cache.readQuery({ query: GET_TARGETAUDIENCE });

      cache.writeQuery({
        query: GET_TARGETAUDIENCE,
        data: { getTargetAudience: getTargetAudience.filter(item => item._id !== id) }
      });
    }
  });

  return { handleDelete, error };
};
