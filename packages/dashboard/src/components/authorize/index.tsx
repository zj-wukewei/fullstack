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

interface AuthorizeProps {
  children?: ((props: any) => React.ReactNode) | React.ReactNode;
  match: string;
}

const Authorize = (props: AuthorizeProps) => {
  const { match } = props;
  const { loading, data } = useQuery(EXCHANGE_WHOAMI);

  if (loading || !data || !data.whoAmI) {
    return null;
  }
  const permission = data.whoAmI.permission || [];
  return <>{checkPermission(match, permission) ? props.children : null}</>;
};

export function authorize(match: string, fallback: React.ReactNode) {
  return (WrappedComponent: any) => {
    const ComponentWithPermission = (props: any) => {
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

    ComponentWithPermission.displayName = `authorize(${displayName})`;

    return ComponentWithPermission;
  };
}

export default Authorize;
