export interface CommentDetail {
  content: string;
  time: number;
  commentId: number;
  likedCount: number;
  status: number;
  user: {
    userId: number;
    nickname: string;
    avatarUrl: string;
    vipType: number;
    userType: number;
  };
  beReplied: {
    beRepliedCommentId: number;
    content: string;
    user: {
      userId: number;
      nickname: string;
      avatarUrl: string;
      vipType: number;
      userType: number;
    };
  }[];
  [props: string]: any;
}
