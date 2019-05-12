import React, { FC } from 'react';
import Classnames from 'classnames';
import { Link } from 'umi';
import { ToplistType } from '../../model';
import styles from './index.module.less';

type Props = {
  item: ToplistType;
  current: number | string;
};

const NavItem: FC<Props> = ({ item, current }) => {
  return (
    <Link
      to={`/discover/toplist?id=${item.id}`}
      className={Classnames(styles.item, {
        [styles.actived]: current === item.id,
      })}
    >
      <img src={item.coverImgUrl} alt={item.name} className={styles.itemPic} />
      <div className={styles.itemInfo}>
        <span className={Classnames(styles.itemInfoTxt, styles.itemInfoName)}>{item.name}</span>
        <span className={Classnames(styles.itemInfoTxt, styles.itemInfoDesc)}>
          {item.updateFrequency}
        </span>
      </div>
    </Link>
  );
};

export default NavItem;
