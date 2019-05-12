import React, { FC } from 'react';
import Classnames from 'classnames';
import { Link } from 'umi';
import { DiscoverTopListTrack } from '@/pages/discover/index/model';

import styles from './index.module.less';

type Props = {
  item: DiscoverTopListTrack;
  index: number;
  onAddSong: (song: Partial<DiscoverTopListTrack>) => void;
  onPlaySong: (song: Partial<DiscoverTopListTrack>) => void;
};

const ToplistItem: FC<Props> = ({ item, index, onAddSong, onPlaySong }) => {
  const playSong = () => {
    onPlaySong(item);
  };
  const addSong = () => {
    onAddSong(item);
  };
  return (
    <div
      className={Classnames(styles.item, {
        [styles.odd]: index % 2 === 0,
        [styles.odd]: index % 2 === 1,
      })}
    >
      <div className={styles.itemInfo}>
        <span
          className={Classnames(styles.itemInfoIndex, {
            [styles.itemInfoTop]: index < 3,
          })}
        >
          {index + 1}
        </span>
        <Link to={`/song?id=${item.id}`} className={styles.itemInfoName}>
          {item.name}
        </Link>
      </div>
      <div className={styles.itemBtn}>
        <i className={Classnames(styles.itemBtnIcon, styles.itemBtnPlay)} onClick={playSong} />
        <i className={Classnames(styles.itemBtnIcon, styles.itemBtnAdd)} onClick={addSong} />
        <i className={Classnames(styles.itemBtnIcon, styles.itemBtnFavuour)} />
      </div>
    </div>
  );
};

export default ToplistItem;
