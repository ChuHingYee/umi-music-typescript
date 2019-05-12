import React, { FC } from 'react';
import styles from './index.less';
import Link from 'umi/link';
import classNames from 'classnames';

export interface Props {
  path: string;
  current: string;
  label: string;
}
const HeaderLink: FC<Props> = ({ path, current, label }) => {
  return (
    <Link to={path} className={classNames(styles.link, { [styles.active]: current === path })}>
      {label}
      {current === path && <span className={styles.bottom} />}
    </Link>
  );
};

export default HeaderLink;
