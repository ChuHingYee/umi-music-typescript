import React from 'react';
import styles from './index.module.less';
import Link from 'umi/link';

type Props = {
  label: string;
  path: string;
};

const DiscoverTitle: React.SFC<Props> = ({ label = '', path = '', children }) => (
  <div className={styles.row}>
    <div className={styles.rowLabel}>
      <Link to={path} className={styles.rowLabelTxt}>
        {label}
      </Link>
      {children && children}
    </div>
    <div className={styles.rowMore}>
      <Link to={path} className={styles.rowMoreTxt}>
        更多
      </Link>
      <i className={styles.rowMoreIcon} />
    </div>
  </div>
);

export default DiscoverTitle;
