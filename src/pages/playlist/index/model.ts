import {
  GetPlaylistDetail,
  GetPlaylistComment,
  GetPlaylistSubscribers,
  GetRelatedPlaylist,
} from './service';
import { formatCommentList } from '@/utils/utils';
import { DvaModel } from '@/interfaces/dva';
import { CommentDetail } from '@/interfaces';

export interface PlaylistModel {
  detail: DetailType;
  songs: SongType[];
  commentList: CommentDetail[];
  hotCommentList: CommentDetail[];
  commentCount: number;
  commentPage: number;
  subscribers: UserType[];
  relatedPlaylist: RelatedPlaylistTye[];
}

type DetailType = {
  name: string;
  id: number;
  coverImgUrl: string;
  playCount: number;
  shareCount: number;
  subscribedCount: number;
  tags: string[];
  description: string;
  creator: {
    nickname: string;
    userId: number;
    avatarUrl: string;
    [props: string]: any;
  };
  createTime: number;
  tracks?: SongType[];
  [props: string]: any;
};

type SongType = {
  name: string;
  mv: number;
  dt: number;
  id: number;
  ar: { name: string; id: number; [props: string]: any }[];
  [props: string]: any;
};

type UserType = {
  nickname: string;
  avatarUrl: string;
  userId: number;
};

type RelatedPlaylistTye = {
  coverImgUrl: string;
  id: number;
  name: string;
  creator: {
    nickname: string;
    userId: number;
  };
};

const model: DvaModel<PlaylistModel> = {
  namespace: 'playlistDetail',
  state: {
    detail: {
      name: '',
      id: -1,
      coverImgUrl: '',
      playCount: -1,
      shareCount: -1,
      subscribedCount: -1,
      tags: [],
      description: '',
      creator: {
        nickname: '',
        userId: -1,
        avatarUrl: '',
      },
      createTime: -1,
    },
    songs: [],
    commentList: [],
    hotCommentList: [],
    commentCount: 0,
    commentPage: 0,
    subscribers: [],
    relatedPlaylist: [],
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *getDetail({ payload }, { put, call }) {
      const result = yield call(GetPlaylistDetail, { id: payload.id });
      const { playlist } = result as { playlist: DetailType };
      yield put({
        type: 'save',
        payload: {
          detail: {
            name: playlist.name,
            id: playlist.id,
            coverImgUrl: playlist.coverImgUrl,
            playCount: playlist.playCount,
            shareCount: playlist.shareCount,
            subscribedCount: playlist.subscribedCount,
            tags: playlist.tags,
            description: playlist.description,
            creator: {
              nickname: playlist.creator.nickname,
              userId: playlist.creator.userId,
              avatarUrl: playlist.creator.avatarUrl,
            },
            createTime: playlist.createTime,
          },
          songs: (playlist.tracks as SongType[]).map(song => {
            return {
              name: song.name,
              mv: song.mv,
              dt: song.dt,
              id: song.id,
              alia: song.alia.join('/'),
              ar: song.ar.map(a => {
                return {
                  name: a.name,
                  id: a.id,
                  alia: a.alia,
                };
              }),
              al: {
                name: song.al.name,
                id: song.al.id,
                picUrl: song.al.picUrl,
              },
            };
          }),
        },
      });
    },
    *getComment({ payload }, { call, put, select }) {
      const commentPage = yield select((state: any) => state.playlist.commentPage);
      const result = yield call(GetPlaylistComment, { id: payload.id, offset: commentPage });
      let formatHotComment: CommentDetail[] = [];
      let formatComment: CommentDetail[] = [];
      formatComment = formatCommentList(result.comments);
      let data: Partial<PlaylistModel> = {
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
    *getPlaylistSubscribers({ payload }, { call, put }) {
      const result = yield call(GetPlaylistSubscribers, { id: payload.id });
      const list = result.subscribers.slice(0, 8);
      yield put({
        type: 'save',
        payload: {
          subscribers: list.map((item: UserType) => {
            return {
              nickname: item.nickname,
              avatarUrl: item.avatarUrl,
              userId: item.userId,
            };
          }),
        },
      });
    },
    *getRelatedPlaylist({ payload }, { call, put }) {
      const result = yield call(GetRelatedPlaylist, { id: payload.id });
      yield put({
        type: 'save',
        payload: {
          relatedPlaylist: result.playlists.map((item: RelatedPlaylistTye) => {
            return {
              coverImgUrl: item.coverImgUrl,
              id: item.id,
              name: item.name,
              creator: {
                nickname: item.creator.nickname,
                userId: item.creator.userId,
              },
            };
          }),
        },
      });
    },
  },
};

export default model;
