import React, { FC } from 'react';
import Classnames from 'classnames';
import DetailTableRow from '../DetailTableRow';
import { TrackDetail } from '../../model';
import styles from './index.module.less';

type Props = {
  list: TrackDetail[];
  playSong: (detail: TrackDetail) => void;
};

const DetailTable: FC<Props> = ({ list, playSong }) => {
  return (
    <div className={styles.table}>
      <div className={styles.header}>
        <div className={Classnames(styles.headerRow, styles.row1)} />
        <div className={Classnames(styles.headerRow, styles.row2)}>
          <div className={styles.headerRowInner}>歌曲标题</div>
        </div>
        <div className={Classnames(styles.headerRow, styles.row3)}>
          <div className={styles.headerRowInner}>时长</div>
        </div>
        <div className={Classnames(styles.headerRow, styles.row4)}>
          <div className={styles.headerRowInner}>歌手</div>
        </div>
      </div>
      <div>
        {list.map((item, index) => {
          return <DetailTableRow key={item.id} detail={item} index={index} playSong={playSong} />;
        })}
      </div>
    </div>
  );
};

export default DetailTable;
