import React, { FC } from 'react';
import ArtistsLink from '@/components/artistsLink';
import PlayBtn from '@/components/playButton';
import CommonBtn from '@/components/commonButton';
import { SongDetailModel } from '../../model';
import { PlayerSongType } from '@/models/player';
import { Link } from 'umi';
import Classnames from 'classnames';
import styles from './index.module.less';

type Props = {
  detail: SongDetailModel['songDetail'];
  lrc: SongDetailModel['lrc'];
  lrcOwn: SongDetailModel['lrcOwn'];
  lrcTransUser: SongDetailModel['tLrcOwn'];
  isHide: boolean;
  handleTriggleLrc: () => void;
  handlePlaySong: (song: Partial<PlayerSongType>) => void;
  handleAddSong: (song: Partial<PlayerSongType>) => void;
};

const SongsListItem: FC<Props> = ({
  detail,
  lrc,
  lrcOwn,
  lrcTransUser,
  isHide,
  handleTriggleLrc,
  handlePlaySong,
  handleAddSong,
}) => {
  const showLrc = lrc.slice(0, 8);
  const hideLrc = lrc.slice(8, lrc.length);
  const handlePlay = () => {
    const { al, ar, dt, id, mv, name } = detail;
    handlePlaySong({
      al,
      ar,
      dt,
      id,
      mv,
      name,
      url: '',
      lrc: [],
    });
  };
  const handleAdd = () => {
    const { al, ar, dt, id, mv, name } = detail;
    handleAddSong({
      al,
      ar,
      dt,
      id,
      mv,
      name,
      url: '',
      lrc: [],
    });
  };
  return (
    <div className={styles.info}>
      <div className={styles.infoLeft}>
        <div className={styles.infoLeftCover}>
          <img className={styles.pic} src={detail.al.picUrl} alt={detail.al.name} />
          <span className={styles.mask} />
        </div>
      </div>
      <div className={styles.infoRight}>
        <div className={styles.name}>
          <i className={Classnames(styles.icon, styles.iconLabel)} />
          <span>{detail.name}</span>
          {detail.mv !== 0 && <i className={Classnames(styles.icon, styles.iconMv)} />}
        </div>
        <p className={styles.row}>
          歌手: <ArtistsLink artists={detail.ar} className={styles.rowLink} />
        </p>
        <p className={styles.row}>
          专辑:{' '}
          <Link to={`/album?id=${detail.al.id}`} className={styles.rowLink}>
            {detail.al.name}
          </Link>
        </p>
        <div className={styles.btns}>
          <PlayBtn className={styles.btnsItem} onPlay={handlePlay} onAdd={handleAdd} />
          <CommonBtn type="favour" label="收藏" className={styles.btnsItem} />
          <CommonBtn type="share" label="分享" className={styles.btnsItem} />
          <CommonBtn type="download" label="下载" className={styles.btnsItem} />
          <CommonBtn type="comment" count={0} className={styles.btnsItem} />
        </div>
        <div className={styles.lrc}>
          {showLrc.map(item => {
            return (
              <div className={styles.lrcRow} key={item.time}>
                <p> {item.lrc}</p>
                <p>{item.tlrc && item.tlrc}</p>
              </div>
            );
          })}
          <div
            className={Classnames({
              [styles.lrcHide]: isHide,
            })}
          >
            {hideLrc.map(item => {
              return (
                <div className={styles.lrcRow} key={item.time}>
                  <p> {item.lrc}</p>
                  <p>{item.tlrc && item.tlrc}</p>
                </div>
              );
            })}
          </div>
          <div>
            <a href="javascript:;" className={styles.lrcBtn} onClick={handleTriggleLrc}>
              展开
              <i className={Classnames(styles.icon, styles.iconArrow)} />
            </a>
          </div>
        </div>
        <div className={styles.tips}>
          <p>
            {lrcOwn.name && (
              <>
                贡献歌词：
                <Link className={styles.tipsLink} to={`/user/home?id=${lrcOwn.id}`}>
                  {lrcOwn.name}
                </Link>
              </>
            )}
            {lrcTransUser.name && (
              <>
                贡献翻译：
                <Link className={styles.tipsLink} to={`/user/home?id=${lrcTransUser.id}`}>
                  {lrcTransUser.name}
                </Link>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SongsListItem;
