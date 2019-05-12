import {
  GetSongDetail,
  GetSongLrc,
  GetSongComment,
  GetSongPlayList,
  GetSimpleSongList,
} from './service';
import { formatCommentList } from '@/utils/utils';
import { DvaModel } from '@/interfaces/dva';
import { CommentDetail } from '@/interfaces';

export interface SongDetailModel {
  songDetail: SongDetail;
  lrc: LrcDetail[];
  lrcOwn: UserType;
  tLrcOwn: UserType;
  hotCommentList: CommentDetail[];
  commentList: CommentDetail[];
  commentPage: number;
  commentCount: number;
  playList: PlayListType[];
  simpleList: SongListType[];
}

type SongDetail = {
  al: {
    id: number;
    picUrl: string;
    name: string;
  };
  ar: ArDetail[];
  name: string;
  mv: number;
  [props: string]: any;
};

type ArDetail = {
  id: number;
  name: string;
};

type LrcDetail = {
  time: string;
  lrc: string;
  tlrc?: string;
};

type UserType = {
  name: string;
  id: number;
};

type PlayListType = {
  coverImgUrl: string;
  name: string;
  id: number;
  creator: {
    nickname: string;
    userId: number;
    [props: string]: any;
  };
  [props: string]: any;
};

type SongListType = {
  name: string;
  id: number;
  artists: { name: string; id: number }[];
  [props: string]: any;
};

const model: DvaModel<SongDetailModel> = {
  namespace: 'song',
  state: {
    songDetail: {
      al: {
        id: -1,
        picUrl: '',
        name: '',
      },
      ar: [],
      name: '',
      mv: -1,
    },
    lrc: [],
    lrcOwn: {
      id: -1,
      name: '',
    },
    tLrcOwn: {
      id: -1,
      name: '',
    },
    commentList: [],
    hotCommentList: [],
    commentPage: 0,
    commentCount: 0,
    playList: [],
    simpleList: [],
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *getSongDetail({ payload }, { put, call }) {
      const result = yield call(GetSongDetail, { ids: payload.id });
      const { songs } = result;
      yield put({
        type: 'save',
        payload: {
          songDetail: {
            al: {
              id: songs[0].al.id,
              picUrl: songs[0].al.picUrl,
              name: songs[0].al.name,
            },
            name: songs[0].name,
            mv: songs[0].mv,
            id: songs[0].id,
            dt: songs[0].dt,
            ar: songs[0].ar.map((item: ArDetail) => {
              return {
                id: item.id,
                name: item.name,
              };
            }),
          },
        },
      });
    },
    *getSongLrc({ payload }, { put, call }) {
      const result = yield call(GetSongLrc, { id: payload.id });
      const lrcArr = result.lrc.lyric.split('\n');
      let arr: LrcDetail[] = [];
      lrcArr.forEach((item: string) => {
        const match = /\[(.+?)\]/.exec(item) as RegExpExecArray;
        if (match) {
          const innerMatch = match[1];
          let flag = true;
          if (innerMatch) {
            const timeArr = innerMatch.split(':');
            timeArr.forEach((time: string | number) => {
              if (isNaN((time as number) - 0) && flag) {
                flag = false;
              }
            });
          }
          if (flag) {
            arr.push({
              time: match[1],
              lrc: item.split(match[0])[1],
            });
          }
        }
      });
      let data: Partial<SongDetailModel> = {
        lrc: arr,
      };
      if (result.lyricUser && result.lyricUser.nickname) {
        data.lrcOwn = {
          name: result.lyricUser.nickname,
          id: result.lyricUser.id,
        };
      }
      if (result.transUser && result.transUser.nickname) {
        data.tLrcOwn = {
          name: result.transUser.nickname,
          id: result.transUser.id,
        };
      }
      if (result.tlyric && result.tlyric.lyric && result.tlyric.lyric.length > 0) {
        const tlrcArr = result.tlyric.lyric.split('\n');
        tlrcArr.forEach((titem: string) => {
          const tMatch = /\[(.+?)\]/.exec(titem) as RegExpExecArray;
          if (tMatch) {
            const tInnerMatch = tMatch[1];
            let flag = true;
            if (tInnerMatch) {
              const timeArr = tInnerMatch.split(':');
              timeArr.forEach((time: string | number) => {
                if (isNaN((time as number) - 0) && flag) {
                  flag = false;
                }
              });
            }
            if (flag) {
              let index = arr.findIndex(i => {
                return i.time === tMatch[1];
              });
              if (index !== -1) {
                arr[index].tlrc = titem.split(tMatch[0])[1];
              }
            }
          }
        });
      }
      yield put({
        type: 'save',
        payload: data,
      });
    },
    *getSongComment({ payload }, { call, put, select }) {
      const commentPage = yield select((state: any) => state.song.commentPage);
      const result = yield call(GetSongComment, { id: payload.id, offset: commentPage * 20 });
      let formatHotComment: CommentDetail[] = [];
      let formatComment: CommentDetail[] = [];
      formatComment = formatCommentList(result.comments);
      let data: Partial<SongDetailModel> = {
        commentList: formatComment,
        commentCount: result.total,
      };
      if (commentPage === 0) {
        formatHotComment = formatCommentList(result.hotComments);
        data.hotCommentList = formatHotComment;
      }
      yield put({
        type: 'save',
        payload: data,
      });
    },
    *getSongPlayList({ payload }, { call, put }) {
      const result = yield call(GetSongPlayList, { id: payload.id });
      yield put({
        type: 'save',
        payload: {
          playList: result.playlists.map((item: PlayListType) => {
            return {
              coverImgUrl: item.coverImgUrl,
              name: item.name,
              id: item.id,
              creator: {
                nickname: item.creator.nickname,
                userId: item.creator.id,
              },
            };
          }),
        },
      });
    },
    *getSimpleSongList({ payload }, { call, put }) {
      const result = yield call(GetSimpleSongList, { id: payload.id });
      yield put({
        type: 'save',
        payload: {
          simpleList: result.songs.map((item: SongListType) => {
            return {
              name: item.name,
              id: item.id,
              artists: item.artists.map(art => {
                return {
                  name: art.name,
                  id: art.id,
                };
              }),
            };
          }),
        },
      });
    },
  },
};

export default model;
