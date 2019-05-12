import { ComponentType } from 'react';
import dayjs from 'dayjs';
import { CommentDetail } from '@/interfaces';

export function getComponentName(component: ComponentType<any>) {
  return component.displayName || (component as any).name;
}

export function getHOCComponentName(hocName: string, component: ComponentType<any>) {
  return `${hocName}(${getComponentName(component)})`;
}

export function getFormatCount(count: number): string {
  let formatCount = '';
  if (count > 100000000) {
    formatCount = Math.ceil(count / 10000000).toFixed(0) + '亿';
  } else if (count > 10000) {
    formatCount = Math.ceil(count / 10000).toFixed(0) + '万';
  } else {
    formatCount = count + '';
  }
  return formatCount;
}

/**
 * 格式化时间 年月日
 * @param {*} dataStr
 * @param {*} pattern
 */
export function formatDay(dataStr: number, pattern = 'YYYY-MM-DD') {
  return dayjs(dataStr).format(pattern);
}

/**
 * 格式化时间 时间
 * @param {*} dataStr
 * @param {*} pattern
 */
export function formatTime(time: number) {
  let m = parseInt(time / 1000 / 60 + '') - 0;
  let s = parseInt((time - m * 60 * 1000) / 1000 + '') - 0;
  return `${m >= 10 ? m : '0' + m}:${s >= 10 ? s : '0' + s}`;
}

/**
 * 格式化评论列表
 * @param list
 */
export function formatCommentList(list: CommentDetail[]) {
  return list.map(item => {
    return {
      content: item.content,
      time: item.time,
      commentId: item.commentId,
      likedCount: item.likedCount,
      status: item.status,
      user: {
        userId: item.user.userId,
        nickname: item.user.nickname,
        avatarUrl: item.user.avatarUrl,
        vipType: item.user.vipType,
        userType: item.user.userType,
      },
      beReplied: item.beReplied.map(r => {
        return {
          beRepliedCommentId: r.beRepliedCommentId,
          content: r.content,
          user: {
            userId: r.user.userId,
            nickname: r.user.nickname,
            avatarUrl: r.user.avatarUrl,
            vipType: r.user.vipType,
            userType: r.user.userType,
          },
        };
      }),
    };
  });
}
