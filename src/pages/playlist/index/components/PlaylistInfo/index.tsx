import React, { FC } from 'react';
import PlayBtn from '@/components/playButton';
import CommonBtn from '@/components/commonButton';
import Classnames from 'classnames';
import { formatDay } from '@/utils/utils';
import { Link } from 'umi';
import { PlaylistModel } from '../../model';

import styles from './index.module.less';

type Props = {
  detail: PlaylistModel['detail'];
  songs: PlaylistModel['songs'];
  playList: (songs: PlaylistModel['songs']) => void;
  addList: (songs: PlaylistModel['songs']) => void;
};

const PlaylistInfo: FC<Props> = ({ detail, songs, playList, addList }) => {
  const handlePlay = () => {
    playList(songs);
  };
  const handleAdd = () => {
    addList(songs);
  };
  return (
    <div className={styles.info}>
      <div className={styles.infoLeft}>
        <div className={styles.infoLeftCover}>
          <img className={styles.pic} src={detail.coverImgUrl} alt={detail.name} />
          <span className={styles.mask} />
        </div>
      </div>
      <div className={styles.infoRight}>
        <div className={styles.name}>
          <i className={Classnames(styles.icon, styles.iconLabel)} />
          <span>{detail.name}</span>
        </div>
        <p className={styles.row}>
          <Link className={styles.rowAva} to={`/user/home?id=${detail.creator.userId}`}>
            <img src={detail.creator.avatarUrl} alt={detail.creator.name} />
          </Link>
          <Link to={`/user/home?id=${detail.creator.userId}`} className={styles.rowUser}>
            {detail.creator.nickname}
          </Link>
          {formatDay(detail.createTime)}创建
        </p>
        <div className={styles.btns}>
          <PlayBtn className={styles.btnsItem} onPlay={handlePlay} onAdd={handleAdd} />
          <CommonBtn type="favour" label="收藏" className={styles.btnsItem} />
          <CommonBtn type="share" label="分享" className={styles.btnsItem} />
          <CommonBtn type="download" label="下载" className={styles.btnsItem} />
          <CommonBtn type="comment" count={0} className={styles.btnsItem} />
        </div>
        <div className={styles.tags}>
          标签：
          {detail.tags.map(tag => {
            return (
              <Link
                className={styles.tagsItem}
                key={tag}
                to={`/discover/playlist/?cat=${tag}&order=hot`}
              >
                <i>{tag}</i>
              </Link>
            );
          })}
        </div>
        <p className={styles.row}>介绍：{detail.description}</p>
      </div>
    </div>
  );
};

export default PlaylistInfo;
