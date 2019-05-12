import React, { FC } from 'react';
import Classnames from 'classnames';
import { Link } from 'umi';
import ToplistItem from '../ToplistItem';
import { DiscoverModel } from '@/pages/discover/index/model';

import styles from './index.module.less';

type Props = {
  toplist: DiscoverModel['upTopList'];
  hasBorder?: boolean;
  onPlay: () => void;
  onAddSongs: () => void;
  onPlaySong: (song: any) => void;
  onAddSong: (song: any) => void;
};

const Toplist: FC<Props> = ({
  toplist,
  onPlay,
  onAddSong,
  onPlaySong,
  onAddSongs,
  hasBorder = true,
}) => {
  return (
    <div
      className={Classnames(styles.list, {
        [styles.nb]: !hasBorder,
      })}
    >
      <div className={styles.listTop}>
        <Link to={`/discover/toplist?id=${toplist.id}`} className={styles.listTopPic}>
          <img src={toplist.coverImgUrl} alt={name} className={styles.listTopPicMain} />
        </Link>
        <div className={styles.listTopInfo}>
          <Link to={`/discover/toplist?id=${toplist.id}`} className={styles.listTopInfoName}>
            {name}
          </Link>
          <div className={styles.listTopInfoBtn}>
            <i className={Classnames(styles.icon, styles.iconPlay)} onClick={onPlay} />
            <i className={Classnames(styles.icon, styles.iconAdd)} onClick={onAddSongs} />
          </div>
        </div>
        <div />
      </div>
      <div className={styles.listContainer}>
        {toplist.tracks.map((item, index) => {
          return (
            <ToplistItem
              key={item.id}
              item={item}
              index={index}
              onAddSong={onAddSong}
              onPlaySong={onPlaySong}
            />
          );
        })}
        <div className={styles.more}>
          <Link className={styles.moreTxt} to={`/discover/toplist?id=${toplist.id}`}>
            查看全部>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Toplist;
