import React, { SFC } from 'react';
import styles from './index.module.less';
type Props = {
  title: string;
};

const SiderPanel: SFC<Props> = ({ title, children }) => {
  return (
    <div className={styles.sider}>
      <div className={styles.siderHeader}>{title}</div>
      {children}
    </div>
  );
};
export default SiderPanel;
