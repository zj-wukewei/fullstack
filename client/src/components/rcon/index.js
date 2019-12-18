import { Icon } from 'antd';

const Rcon = props => {
  const CustomIcon = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1565872_i0nouu1f4li.js', // 在 iconfont.cn 上生成
  });

  return <CustomIcon type={`${props.type}`} />;
};

export default Rcon;
