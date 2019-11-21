import { SWRConfig } from '@zeit/swr';
import { request } from 'graphql-request';

import { message } from 'antd';

const API = 'http://localhost:3000/graphql';


function BasicLayout(props) {
  return (
    <SWRConfig
      value={{
        fetcher: (...args) => request(API, ...args),
        onError: (err) => message.error(err.message)
      }}>
      {props.children}
    </SWRConfig>
  );
}

export default BasicLayout;
