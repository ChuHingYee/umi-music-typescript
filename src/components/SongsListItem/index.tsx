import React, { FC } from 'react';
import ArtistsLink from '../artistsLink';
import { Link } from 'umi';
import { formatTime } from '@/utils/utils';
import { PlayerSongType } from '@/models/player';
import Classnames from 'classnames';
import styles from './index.module.less';

type SongType = {
  name: string;
  mv: number;
  dt: number;
  id: number;
  ar: { name: string; id: number; [props: string]: any }[];
  [props: string]: any;
};

type Props = {
  song: SongType;
  index: number;
  handlePlay: (song: PlayerSongType) => void;
};

const SongsListItem: FC<Props> = ({ song, index, handlePlay }) => {
  const play = () => {
    const { id, name, ar, mv, al, dt } = song;
    handlePlay({
      id,
      name,
      ar,
      mv,
      al,
      dt,
      url: '',
      lrc: [],
    });
  };
  return (
    <div
      className={Classnames(styles.song, {
        [styles.odd]: index % 2 === 0,
      })}
      key={song.id}
    >
      <div className={Classnames(styles.songTd, styles.row1)}>{index + 1}</div>
      <div className={Classnames(styles.songTd, styles.row2)}>
        <i className={Classnames(styles.songTdIcon, styles.songTdPlay)} onClick={play} />
        <Link className={styles.songTdName} to={`/song?id=${song.id}`}>
          {song.name}
        </Link>
        {song.alia && <span className={styles.songTdAlia}>-{song.alia}</span>}
        {song.mv !== 0 && <i className={Classnames(styles.songTdIcon, styles.songTdMv)} />}
      </div>
      <div className={Classnames(styles.songTd, styles.row3)}>{formatTime(song.dt)}</div>
      <div className={Classnames(styles.songTd, styles.row4, styles.songArt)}>
        <ArtistsLink artists={song.ar} className={styles.artItem} />
      </div>
    </div>
  );
};

export default SongsListItem;
