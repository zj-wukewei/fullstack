import { SWRConfig } from '@zeit/swr';
import { GraphQLClient  } from 'graphql-request';

import { message } from 'antd';

const API = 'http://localhost:3000/graphql';

const graphQLClient = new GraphQLClient(API, {
  headers: {
    authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjE4MjU4MDA1NTc4IiwiaWQiOjEsImlhdCI6MTU3NDY2MDY1OSwiZXhwIjoxNTc0NjYxMjU5fQ.DkgX7z3_N8BU6iRMKju3ykNK_yjc91SNNkPAJwPwnF4',
  },
}) 


function BasicLayout(props) {
  return (
    <SWRConfig
      value={{
        fetcher: (...args) => graphQLClient.request(...args),
        shouldRetryOnError: false,
        onError: (err) => {
          message.error(err.message)
        }
      }}>
      {props.children}
    </SWRConfig>
  );
}

export default BasicLayout;
