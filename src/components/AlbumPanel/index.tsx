import React, { FC } from 'react';
import ArtistsLink from '../artistsLink';
import Classnames from 'classnames';
import styles from './index.module.less';
import Link from 'umi/link';

type Props = {
  id: number;
  name: string;
  path: string;
  picUrl: string;
  artists: artist[];
  size: 'small' | 'big';
  className?: string;
  onPlay: (id: number) => void;
};

type artist = {
  name: string;
  id: number;
};

const AlbumPanel: FC<Props> = ({ id, name, path, picUrl, artists, size, onPlay, className }) => {
  const play = () => {
    onPlay(id);
  };
  return (
    <div
      className={Classnames(styles.album, className, {
        [styles.small]: size === 'small',
        [styles.big]: size === 'big',
      })}
    >
      <div className={Classnames(styles.albumPic)}>
        <Link to={path} className={Classnames(styles.albumPicMask)} />
        <img src={picUrl} alt={name} className={styles.albumPicMain} />
        <span className={styles.albumPicIcon} onClick={play} />
      </div>

      <Link to={path} className={Classnames(styles.albumTxt, styles.albumName)}>
        {name}
      </Link>
      <p className={Classnames(styles.albumTxt, styles.albumArtists)}>
        <ArtistsLink artists={artists} className={styles.albumArtistsItem} />
      </p>
    </div>
  );
};

export default AlbumPanel;
