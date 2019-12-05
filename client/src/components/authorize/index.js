import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';


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
    const isAdmin = 'ADMIN'.includes(permission);
    const show = permission.some(item => item.includes(match));

    return (
        <>
           { (isAdmin || show) ? props.children : null }
        </>
    )

};


export default Authorize;

