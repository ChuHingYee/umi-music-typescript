import React, { SFC } from 'react';
import styles from './index.module.less';

type Props = {
  title: string;
};

const ArtistHeader: SFC<Props> = ({ title, children }) => {
  return (
    <div className={styles.header}>
      <h3 className={styles.headerTitle}>{title}</h3>
      <div>{children && children}</div>
    </div>
  );
};

export default ArtistHeader;
