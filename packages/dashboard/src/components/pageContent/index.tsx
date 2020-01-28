import React from 'react';
import cx from 'classnames';
import  './index.less';

interface PageContentProps {
  className?: string;
}

const PageContent: React.SFC<PageContentProps> = props => {
  return (
    <div className={cx('wrapper', props.className)}>
      {props.children}
    </div>
  );
};

export default PageContent;
