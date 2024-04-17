import { currentOrg } from '@/utils';
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { message } from 'antd';
import { onError } from '@apollo/client/link/error'; // 引入onError
import i18next from 'i18next';
import { AUTH_TOKEN, LOCAL_CURRENT_ORG } from './constants';

const uri = '/graphql';

const httpLink = createHttpLink({
  uri,
});

const authLink = setContext((_, { headers }) => {
  const token = sessionStorage.getItem(AUTH_TOKEN) || localStorage.getItem(AUTH_TOKEN);
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
      orgId: currentOrg()?.value,
    },
  };
});

const errorLink = onError(({
  graphQLErrors,
  networkError,
}) => {
  if (graphQLErrors) {
    if (!localStorage.getItem(LOCAL_CURRENT_ORG)) {
      message.error(i18next.t('noChooseStore'));
      return;
    }
    message.error(i18next.t('requestError'));
    graphQLErrors.forEach((item) => {
      if (item.message === 'Unauthorized') {
        message.error(i18next.t('logError'));
      }
    });
  }
  if (networkError) {
    message.error(networkError.message);
  }
});

export const client = new ApolloClient({
  link: errorLink.concat(authLink.concat(httpLink)),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
    },
  },
  cache: new InMemoryCache({
    addTypename: false,
  }),
});
