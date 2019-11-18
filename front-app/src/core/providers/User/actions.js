import { useQuery, useMutation } from 'react-apollo-hooks';
import { GET_USERS_COUNT, GET_USERS, GET_CURRENT_USER } from 'core/providers/User/queries';
import { SAVE_USER_PROFILE } from 'core/providers/User/mutations';
import { GET_APPLICATIONS_HOME } from 'core/providers/Applications/queries/application';

/** Get Users count */
export const useGetUsersCount = () => {
  const { data, loading } = useQuery(GET_USERS_COUNT);

  const result = data?.getUsersCount || 0;
  return { result, loading };
};

export const useGetUsers = () => {
  const { data, loading } = useQuery(GET_USERS);

  const result = data?.getUsers || [];
  return { result, loading };
};

export const useGetCurrentUser = userId => {
  const { data, loading } = useQuery(GET_CURRENT_USER, {
    variables: { userId },
    fetchPolicy: 'no-cache'
  });

  const result = data?.getCurrentUser || [];

  return { result, loading };
};

export const useSaveUserProfile = userId => {
  const [handleSubmit, { error }] = useMutation(SAVE_USER_PROFILE, {
    refetchQueries: [
      {
        query: GET_APPLICATIONS_HOME
      },
      {
        query: GET_CURRENT_USER,
        variables: { userId }
      }
    ]
  });

  return { handleSubmit, error };
};
