import React, { FC } from 'react';
import Classnames from 'classnames';
import styles from './index.module.less';

type Props = {
  onPlay: ([props]: any) => void;
  onAdd: ([props]: any) => void;
  className?: string;
};

const PlayButton: FC<Props> = ({ onPlay, onAdd, className }) => {
  return (
    <div className={Classnames(styles.btn, className)}>
      <div className={Classnames(styles.common, styles.btnPlay)} onClick={onPlay}>
        <i className={Classnames(styles.common, styles.btnPlayLabel)}>
          <em className={styles.icon} />
          播放
        </i>
      </div>
      <div className={Classnames(styles.common, styles.btnAdd)} onClick={onAdd} />
    </div>
  );
};

export default PlayButton;
