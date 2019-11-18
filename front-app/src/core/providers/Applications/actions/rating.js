import { useMutation } from 'react-apollo-hooks';
import { ADD_RATING } from 'core/providers/Applications/mutations/rating';
import { GET_APPLICATIONS_HOME } from 'core/providers/Applications/queries/application';

export const useAddRating = () => {
  const [handleSubmit, { error }] = useMutation(ADD_RATING, {
    refetchQueries: [
      {
        query: GET_APPLICATIONS_HOME
      }
    ]
  });

  return { handleSubmit, error };
};
