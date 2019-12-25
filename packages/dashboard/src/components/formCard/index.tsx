import React from 'react';
import { Card } from 'antd';

import './index.less';

interface FormCardProps {
  children: React.ReactNode;
  title?: string | React.ReactNode;
  extra?: string | React.ReactNode;
}

const FormCard = (props: FormCardProps) => {
  return (
    <Card>
      <div className="form-card-header">
        {props.title && <div className="title">{props.title}</div>}
        {props.extra && <div className="extra">{props.extra}</div>}
      </div>
      {props.children}
    </Card>
  );
};

export default FormCard;
