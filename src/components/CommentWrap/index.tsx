import React, { FC } from 'react';
import CommentReply from '@/components/commentReply';
import CommentInput from '@/components/commentInput';
import { Pagination } from 'antd';
import { CommentDetail } from '@/interfaces';
import Classnames from 'classnames';
import styles from './index.module.less';
type Props = {
  hotCommentList: CommentDetail[];
  commentList: CommentDetail[];
  commentCount: number;
  className?: string;
  onPageChange: (page: number) => void;
};

const CommentPanel: FC<{ title: string; list: CommentDetail[] }> = ({ title, list }) => {
  return (
    <div className={styles.commentPanel}>
      <h2 className={styles.commentPanelHeader}>{title}</h2>
      <div>
        {list.map((item, index) => {
          return <CommentReply {...item} hasBorder={index !== 0} key={item.commentId} />;
        })}
      </div>
    </div>
  );
};

const CommentWrap: FC<Props> = ({
  hotCommentList,
  commentList,
  commentCount,
  onPageChange,
  className,
}) => {
  return (
    <div className={Classnames(styles.comment, className)}>
      <CommentInput total={commentCount} count={1} />
      {hotCommentList.length > 0 && <CommentPanel title="精彩评论" list={hotCommentList} />}
      <CommentPanel title={`最新评论(${commentCount}`} list={commentList} />
      <Pagination
        style={{ textAlign: 'center' }}
        total={commentCount}
        onChange={onPageChange}
        defaultPageSize={20}
      />
    </div>
  );
};

export default CommentWrap;
