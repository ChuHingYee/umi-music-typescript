import React, { FC } from 'react';
import { Link } from 'umi';
import ArtistsLink from '@/components/artistsLink';
import Classnames from 'classnames';
import { formatTime } from '@/utils/utils';
import { TrackDetail } from '../../model';
import styles from './index.module.less';

type Props = {
  detail: TrackDetail;
  index: number;
  playSong: (detail: TrackDetail) => void;
};

const DetailTableRow: FC<Props> = ({ detail, index, playSong }) => {
  const play = () => {
    playSong(detail);
  };
  return (
    <div
      className={Classnames(styles.row, {
        [styles.odd]: index % 2 === 0,
      })}
    >
      <div className={Classnames(styles.row1, styles.rowTd)}>{index + 1}</div>
      <div
        className={Classnames(styles.row2, styles.rowTd, {
          [styles.bDetail]: index < 3,
        })}
      >
        {index < 3 && (
          <>
            <img src={detail.al.picUrl} className={styles.rowDetailPic} />
            <i
              className={Classnames(styles.rowIcon, {
                [styles.rowIconRed]: index === 0,
                [styles.rowIconPlay]: index !== 0,
              })}
              onClick={play}
            />
            <Link className={styles.rowTdName} to={`/song?id=${detail.id}`}>
              {detail.name}
            </Link>
          </>
        )}
        {index >= 3 && (
          <>
            <i className={Classnames(styles.rowIcon, styles.rowIconPlay)} onClick={play} />
            <Link className={styles.rowTdName} to={`/song?id=${detail.id}`}>
              {detail.name}
            </Link>
          </>
        )}
        {detail.alia && <span className={styles.rowTdAlia}>-{detail.alia}</span>}
        {detail.mv !== 0 && <i className={Classnames(styles.rowIcon, styles.rowIconMv)} />}
      </div>
      <div className={Classnames(styles.row3, styles.rowTd)}>{formatTime(detail.dt)}</div>
      <div className={Classnames(styles.row4, styles.rowTd, styles.rowArt)}>
        <ArtistsLink artists={detail.ar} className={styles.rowArtItem} />
      </div>
    </div>
  );
};

export default DetailTableRow;
