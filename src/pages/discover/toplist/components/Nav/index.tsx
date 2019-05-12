import React, { FC } from 'react';
import NavItem from '../NavItem';
import { ToplistType } from '../../model';
import styles from './index.module.less';

type Props = {
  title: string;
  list: ToplistType[];
  current: number | string;
};

const Nav: FC<Props> = ({ title, list, current }) => {
  return (
    <div className={styles.nav}>
      <h2 className={styles.navTitle}>{title}</h2>
      <div>
        {list.map(item => {
          return <NavItem key={item.id} item={item} current={current} />;
        })}
      </div>
    </div>
  );
};

export default Nav;
