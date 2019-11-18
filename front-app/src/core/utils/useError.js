import get from 'lodash.get';

export const useError = rawError => {
  let formError = false;

  if (rawError) {
    const errorDetails = get(
      rawError,
      'graphQLErrors[0].extensions.exception.details',
      () => false
    );

    if (errorDetails && Array.isArray(errorDetails)) {
      formError = errorDetails.reduce((acc, item) => {
        acc[item.path[0]] = item.message.replace(/"/g, '');
        return acc;
      }, {});
    }
  }

  return { formError };
};
