import { GetAlubmDetail, GetAlbumComment } from './service';
import { formatCommentList } from '@/utils/utils';
import { DvaModel } from '@/interfaces/dva';
import { CommentDetail } from '@/interfaces';

export interface AlbumDetailState {
  detail: AlbumDetailType;
  songs: SongType[];
  commentList: CommentDetail[];
  hotCommentList: CommentDetail[];
  commentCount: number;
  commentPage: number;
}

type AlbumDetailType = {
  name: string;
  id: number;
  publishTime: number;
  company: string;
  artists: { name: string; id: number; [props: string]: any }[];
  shareCount: number;
  likedCount: number;
  description: string[] | string;
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

const model: DvaModel<AlbumDetailState> = {
  namespace: 'album',
  state: {
    detail: {
      name: '',
      id: -1,
      publishTime: -1,
      company: '',
      artists: [],
      shareCount: -1,
      likedCount: -1,
      description: [],
      picUrl: '',
    },
    songs: [],
    commentList: [],
    hotCommentList: [],
    commentCount: 0,
    commentPage: 0,
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *getAlbumDetail({ payload }, { put, call }) {
      const result = yield call(GetAlubmDetail, { id: payload.id });
      const { songs, album } = result as { album: AlbumDetailType; songs: SongType[] };
      yield put({
        type: 'save',
        payload: {
          detail: {
            name: album.name,
            id: album.id,
            picUrl: album.picUrl,
            publishTime: album.publishTime,
            company: album.company,
            artists: album.artists.map(art => {
              return {
                name: art.name,
                id: art.id,
              };
            }),
            shareCount: album.info.shareCount,
            likedCount: album.info.likedCount,
            description: (album.description as string).split('\n'),
          },
          songs: songs.map(song => {
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
            };
          }),
        },
      });
    },
    *getAlbumComment({ payload }, { call, put, select }) {
      const commentPage = yield select((state: any) => state.album.commentPage);
      const result = yield call(GetAlbumComment, { id: payload.id, offset: commentPage * 20 });
      let formatHotComment: CommentDetail[] = [];
      let formatComment: CommentDetail[] = [];
      formatComment = formatCommentList(result.comments);
      let data: Partial<AlbumDetailState> = {
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
  },
};

export default model;
