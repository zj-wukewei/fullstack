import { Card } from 'antd';

import './index.less';

const FormCard = props => {
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
