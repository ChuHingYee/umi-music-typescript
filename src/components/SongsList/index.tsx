import React, { FC } from 'react';
import ArtistsLink from '../artistsLink';
import SongsListItem from '../SongsListItem';
import { Link } from 'umi';
import { formatTime } from '@/utils/utils';
import { PlayerSongType } from '@/models/player';
import Classnames from 'classnames';
import styles from './index.module.less';
import Item from 'antd/lib/list/Item';

type SongType = {
  name: string;
  mv: number;
  dt: number;
  id: number;
  ar: { name: string; id: number; [props: string]: any }[];
  [props: string]: any;
};

type Props = {
  list: SongType[];
  label?: string;
  handlePlay: (song: PlayerSongType) => void;
  className?: string;
};

const SongsList: FC<Props> = ({ list, label = '歌曲列表', handlePlay, className }) => {
  return (
    <div className={Classnames(styles.table, className)}>
      <div className={styles.tableTitle}>
        <div className={styles.tableTitleInfo}>
          <span className={styles.infoName}>{label}</span>
          <span className={styles.infoCount}>{list.length}首歌</span>
        </div>
      </div>
      <div className={styles.tableMain}>
        <div className={styles.header}>
          <div className={Classnames(styles.headerRow, styles.row1)} />
          <div className={Classnames(styles.headerRow, styles.row2)}>
            <div className={styles.headerRowInner}>标题</div>
          </div>
          <div className={Classnames(styles.headerRow, styles.row3)}>
            <div className={styles.headerRowInner}>时长</div>
          </div>
          <div className={Classnames(styles.headerRow, styles.row4)}>
            <div className={styles.headerRowInner}>歌手</div>
          </div>
        </div>
        <div className={styles.body}>
          {list.map((item, index) => (
            <SongsListItem key={item.id} song={item} index={index} handlePlay={handlePlay} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SongsList;
