import React, { SFC } from 'react';
import { Link } from 'umi';
import { formatDay } from '@/utils/utils';
import Classnames from 'classnames';
import { CommentDetail } from '@/interfaces';

import styles from './index.module.less';

type ownProps = {
  hasBorder?: boolean;
};

type Props = ownProps & CommentDetail;

const CommentReply: SFC<Props> = ({ hasBorder = true, ...props }) => {
  const { user, content, time, likedCount, beReplied } = props;
  return (
    <div
      className={Classnames(styles.reply, {
        [styles.nb]: !hasBorder,
      })}
    >
      <Link to={`/user/home?id=${user.userId}`} className={styles.replyPic}>
        <img src={user.avatarUrl} className={styles.replyPicMain} />
      </Link>
      <div className={styles.replyInfo}>
        <div className={styles.replyInfoContent}>
          <Link to={`/user/home?id=${user.userId}`} className={styles.user}>
            {user.nickname}
          </Link>
          :{content}
        </div>
        {beReplied.length > 0 && (
          <div className={styles.replyInfoPrev}>
            <Link to={`/user/home?id=${beReplied[0].user.userId}`} className={styles.user}>
              {beReplied[0].user.nickname}
            </Link>
            :{beReplied[0].content}
            <div className={styles.arrow}>
              <i className={Classnames(styles.arrowTxt, styles.arrowLine)}>◆</i>
              <i className={Classnames(styles.arrowTxt, styles.arrowInner)}>◆</i>
            </div>
          </div>
        )}
        <div className={styles.replyInfoBottom}>
          <span>{formatDay(time, 'HH:mm')}</span>
          <div>
            <a href="javascript:;">
              <i className={styles.icon} />
              {likedCount}
            </a>
            <span className={styles.line}>|</span>
            <a href="javascript:;">回复</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentReply;
