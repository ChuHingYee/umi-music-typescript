import React, { SFC } from 'react';
import Classnames from 'classnames';
import styles from './index.module.less';
import DefaultPic from '@/assets/default_avatar.jpg';
interface Props {
  count: number;
  total: number;
  pic?: string;
}

const CommonComent: SFC<Props> = ({ total, count, pic }) => {
  return (
    <div className={styles.comment}>
      <div className={styles.commentHeader}>
        <span className={styles.commentHeaderLabel}>评论</span>
        <span className={styles.commentHeaderTotal}>共{total}条评论</span>
      </div>
      <div className={styles.commentInfo}>
        <img src={pic || DefaultPic} className={styles.commentInfoPic} />
        <div className={styles.commentInfoMain}>
          <textarea disabled={true} className={styles.textarea} />
          <div className={styles.mButtom}>
            <div className={styles.mButtomLeft}>
              <i className={Classnames(styles.mButtomLeftIcon, styles.mButtomLeftEm)} />
              <i className={Classnames(styles.mButtomLeftIcon, styles.mButtomLeftLink)} />
            </div>
            <div className={styles.mButtomRight}>
              <span>{count}</span>
              <a href="javascript:;" className={styles.mButtomRightBtn}>
                评论
              </a>
            </div>
          </div>
          <div className={styles.mIcon}>
            <em className={Classnames(styles.mIconTxt, styles.mIconLine)}>◆</em>
            <em className={Classnames(styles.mIconTxt, styles.mIconInner)}>◆</em>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommonComent;
