import { GetTopList, GetTopListDetail, GetTopListComment } from './service';
import { formatCommentList } from '@/utils/utils';
import { DvaModel } from '@/interfaces/dva';
import { CommentDetail } from '@/interfaces';

export interface DiscoverToplistModel {
  cloudList: ToplistType[];
  globalList: ToplistType[];
  topListDetail: ToplistDetail;
  hotCommentList: CommentDetail[];
  commentList: CommentDetail[];
  commentPage: number;
  commentCount: number;
}

export type ToplistType = {
  coverImgUrl: string;
  id: number;
  name: string;
  updateFrequency: string;
  ToplistType?: string;
  [props: string]: any;
};

type ToplistDetail = {
  coverImgUrl: string;
  id: number;
  name: string;
  commentCount: number;
  playCount: number;
  subscribedCount: number;
  shareCount: number;
  updateTime: number;
  description: string;
  tracks: TrackDetail[];
};

export type TrackDetail = {
  id: number;
  name: string;
  alia: string;
  mv: number;
  dt: number;
  ar: ToplistDetailAr[];
  al: {
    name: string;
    id: number;
    picUrl: string;
  };
};

type ToplistDetailAr = {
  name: string;
  id: number;
};

const model: DvaModel<DiscoverToplistModel> = {
  namespace: 'discoverToplist',
  state: {
    cloudList: [],
    globalList: [],
    topListDetail: {
      coverImgUrl: '',
      id: 0,
      name: '',
      description: '',
      commentCount: 0,
      playCount: 0,
      subscribedCount: 0,
      shareCount: 0,
      updateTime: 0,
      tracks: [],
    },
    commentList: [],
    hotCommentList: [],
    commentPage: 0,
    commentCount: 0,
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *getList(_, { call, put }) {
      const result = yield call(GetTopList, {});
      let cloudList: ToplistType[] = [];
      let globalList: ToplistType[] = [];
      result.list.forEach((item: ToplistType) => {
        const litem = {
          coverImgUrl: item.coverImgUrl,
          id: item.id,
          name: item.name,
          updateFrequency: item.updateFrequency,
        };
        if (item.ToplistType) {
          cloudList.push(litem);
        } else {
          globalList.push(litem);
        }
      });
      yield put({
        type: 'save',
        payload: {
          cloudList: cloudList,
          globalList: globalList,
        },
      });
    },
    *getDetail({ payload }, { call, put }) {
      const result = yield call(GetTopListDetail, { id: payload.id });
      const { playlist } = result;
      yield put({
        type: 'save',
        payload: {
          topListDetail: {
            coverImgUrl: playlist.coverImgUrl,
            id: playlist.id,
            name: playlist.name,
            commentCount: playlist.commentCount,
            playCount: playlist.playCount,
            subscribedCount: playlist.subscribedCount,
            shareCount: playlist.shareCount,
            updateTime: playlist.updateTime,
            description: playlist.description,
            tracks: playlist.tracks.map((item: any, index: number) => {
              const data: TrackDetail = {
                id: item.id,
                name: item.name,
                alia: item.alia.join('/'),
                dt: item.dt,
                mv: item.mv,
                ar: item.ar.map((a: any) => {
                  return {
                    name: a.name,
                    id: a.id,
                  };
                }),
                al: {
                  id: item.al.id,
                  name: item.al.name,
                  picUrl: item.al.picUrl,
                },
              };
              return data;
            }),
          },
        },
      });
    },
    *getComment({ payload }, { call, put, select }) {
      const commentPage = yield select((state: any) => state.discoverToplist.commentPage);
      const result = yield call(GetTopListComment, { id: payload.id, offset: commentPage * 20 });
      let formatHotComment: CommentDetail[] = [];
      let formatComment: CommentDetail[] = [];
      formatComment = formatCommentList(result.comments);
      let data: any = {
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
