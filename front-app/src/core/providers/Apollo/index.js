/** Apollo Client  */
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';

import { checkCookie } from 'core/utils/token';
import { config } from 'core/constants/service';

/** Apollo Http link */
const httpLink = new HttpLink({
  uri: `${config.url.BACKEND_API}/graphql`,
  credentials: 'same-origin'
});

/** Apollo Auth link */
const authLink = setContext((_, { headers }) => {
  const token = checkCookie();

  return {
    headers: {
      ...headers,
      authorization: token
    }
  };
});

/** Apollo Error link */
const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    for (let err of graphQLErrors) {
      switch (err.extensions.code) {
        case 'UNAUTHENTICATED':
          return window.location.replace(config.url.SSO_LINK_ERR);

        // return new Observable(async observer => {
        //   const { token } = await doRefreshToken();

        //   if (!token) {
        //     return window.location.replace('/login');
        //   }

        //   operation.setContext(({ headers = {} }) => ({
        //     headers: {
        //       ...headers,
        //       authorization: token
        //     }
        //   }));

        //   const subscriber = {
        //     next: observer.next.bind(observer),
        //     error: observer.error.bind(observer),
        //     complete: observer.complete.bind(observer)
        //   };

        //   forward(operation).subscribe(subscriber);
        // });

        default:
          break;
      }
    }
  }

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

/** Create one apollo link */
const link = ApolloLink.from([errorLink, authLink, httpLink]);

/** Create apollo client */
const client = new ApolloClient({
  link,
  fetchOptions: {
    mode: 'no-cors'
  },
  cache: new InMemoryCache({ addTypename: false })
});

export default client;
