import { useMutation } from 'react-apollo-hooks';
import { UPDATE_USER } from 'core/providers/Applications/mutations/user';
import { GET_APPLICATIONS_HOME } from 'core/providers/Applications/queries/application';

/** Mark App as favorite */
export const useMarkAppAsFavorite = () => {
  const [handleMarkApp] = useMutation(UPDATE_USER, {
    refetchQueries: [
      {
        query: GET_APPLICATIONS_HOME
      }
    ]
  });
  return { handleMarkApp };
};
