import React, { SFC } from 'react';
import Classnames from 'classnames';
import styles from './index.module.less';

type Props = {
  type: 'favour' | 'share' | 'download' | 'comment';
  count?: number;
  label?: string;
  className?: string;
};

const CommonButton: SFC<Props> = ({ type, count, label, className }) => {
  return (
    <div className={Classnames(styles.common, styles.btn, className)}>
      <i
        className={Classnames(styles.common, styles.btnLabel, {
          [styles.btnFavour]: type === 'favour',
          [styles.btnShare]: type === 'share',
          [styles.btnDownload]: type === 'download',
          [styles.btnComment]: type === 'comment',
        })}
      >
        {type !== 'download' ? `(${label ? label : count})` : '下载'}
      </i>
    </div>
  );
};

export default CommonButton;
