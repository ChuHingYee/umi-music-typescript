import React, { FC } from 'react';
import PlayBtn from '@/components/playButton';
import CommonBtn from '@/components/commonButton';
import { formatDay } from '@/utils/utils';
import { DiscoverToplistModel } from '../../model';
import styles from './index.module.less';

type Props = {
  detail: DiscoverToplistModel['topListDetail'];
  handlePlay: (list: DiscoverToplistModel['topListDetail']['tracks']) => void;
  handleAdd: (list: DiscoverToplistModel['topListDetail']['tracks']) => void;
};

const DetailHeader: FC<Props> = ({ detail, handlePlay, handleAdd }) => {
  const play = () => {
    handlePlay(detail.tracks);
  };
  const add = () => {
    handleAdd(detail.tracks);
  };
  return (
    <div className={styles.header}>
      <div className={styles.headerPic}>
        <img className={styles.headerPicMain} src={detail.coverImgUrl} alt={detail.name} />
      </div>
      <div className={styles.headerDesc}>
        <h3 className={styles.headerDescName}>{detail.name}</h3>
        <p className={styles.headerDescRow}>
          <i className={styles.time} />
          <span>最近更新：{formatDay(detail.updateTime)}</span>
        </p>
        <div className={styles.headerDescBtn}>
          <PlayBtn className={styles.item} onPlay={play} onAdd={add} />
          <CommonBtn type="favour" count={detail.subscribedCount} className={styles.item} />
          <CommonBtn type="share" count={detail.shareCount} className={styles.item} />
          <CommonBtn type="download" className={styles.item} />
          <CommonBtn type="comment" count={detail.commentCount} className={styles.item} />
        </div>
      </div>
    </div>
  );
};

export default DetailHeader;
