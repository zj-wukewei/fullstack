import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

import { checkPermission } from '../../utils/permission';

const EXCHANGE_WHOAMI = gql`
  query WhoAmI  {
    whoAmI @client {
      permission
    }
  }
`;

const Authorize = props => {
    const { match } = props;
    const { loading, data } = useQuery(EXCHANGE_WHOAMI); 

    if (loading || !data || !data.whoAmI) {
        return null;
    }
    const permission = data.whoAmI.permission || [];
    return (
        <>
           { checkPermission(match, permission) ? props.children : null }
        </>
    )

};


export default Authorize;

