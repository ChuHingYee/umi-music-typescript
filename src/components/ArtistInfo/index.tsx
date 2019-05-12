import React, { FC } from 'react';
import Classnames from 'classnames';
import styles from './index.module.less';
import { Link } from 'umi';
import { Skeleton } from 'antd';

interface Props {
  name: string;
  alias: string[];
  picUrl: string;
  current: string;
  id: number | string;
  className?: string;
}

type Artists = {
  name: string;
  id: number;
  [props: string]: any;
};

const tabs = [
  { label: '热门作品', value: '/artist/' },
  { label: '所有专辑', value: '/artist/album' },
  { label: '相关MV', value: '/artist/mv' },
  { label: '艺人介绍', value: '/artist/desc' },
];

const ArtistsLink: FC<Props> = ({ name, alias, picUrl, current, id = '', className }) => {
  return (
    <Skeleton loading={!id} active={true} avatar={{ size: 'large' }} paragraph={{ rows: 8 }}>
      <div className={Classnames(styles.info, className)}>
        <h3 className={styles.infoHeader}>
          {name} <span className={styles.infoHeaderAli}>{alias.join('/')}</span>
        </h3>
        <div className={styles.infoAva}>
          <img src={`${picUrl}?param=640y300`} alt={name} />
          <span className={styles.infoAvaMask} />
        </div>
        <div className={styles.infoNav}>
          {tabs.map(tab => {
            return (
              <Link
                to={`${tab.value}?id=${id}`}
                className={Classnames(styles.infoNavItem, {
                  [styles.infoNavActived]: current === tab.value,
                })}
                key={tab.value}
              >
                <em>{tab.label}</em>
              </Link>
            );
          })}
        </div>
      </div>
    </Skeleton>
  );
};

export default ArtistsLink;
