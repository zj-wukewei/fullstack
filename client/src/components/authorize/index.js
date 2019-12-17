import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import NotAuthorized from '../../pages/403';
import { checkPermission } from '../../utils/permission';

const EXCHANGE_WHOAMI = gql`
  query WhoAmI {
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
  return <>{checkPermission(match, permission) ? props.children : null}</>;
};

export function authorize(match, fallback) {
  return WrappedComponent => {
    const ComponentWithPolicy = props => {
      const { loading, data } = useQuery(EXCHANGE_WHOAMI);

      if (loading || !data || !data.whoAmI) {
        return null;
      }
      const permission = data.whoAmI.permission || [];
      if (checkPermission(match, permission)) {
        return React.createElement(WrappedComponent, props);
      }

      return fallback || <NotAuthorized />;
    };

    const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

    ComponentWithPolicy.displayName = `authorize(${displayName})`;

    return ComponentWithPolicy;
  };
}

export default Authorize;
