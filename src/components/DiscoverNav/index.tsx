import React, { FC } from 'react';
import styles from './index.less';
import Link from 'umi/link';
import classNames from 'classnames';

export interface Props {
  path: string;
  current: string;
  label: string;
}
const DiscoverNav: FC<Props> = ({ path, current, label }) => {
  return (
    <Link to={path} className={classNames(styles.link)}>
      <span className={classNames(styles.linkMain, { [styles.linkActive]: current === path })}>
        {label}
      </span>
    </Link>
  );
};

export default DiscoverNav;
