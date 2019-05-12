import { GetPlaylist } from './service';
import { DvaModel } from '@/interfaces/dva';

export interface PlaylistState {
  order: 'hot' | 'new';
  page: 0;
  playlist: PlaylistType[];
  total: 0;
}

type PlaylistType = {
  picUrl: string;
  playCount: number;
  id: number;
  name: string;
  creator: {
    nickname: string;
    userId: number;
  };
};

const model: DvaModel<PlaylistState> = {
  namespace: 'playlist',
  state: {
    order: 'hot',
    page: 0,
    playlist: [],
    total: 0,
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *getPlaylist({ payload }, { put, call, select }) {
      const page = yield select((state: any) => state.playlist.page);
      const order = yield select((state: any) => state.playlist.order);
      const result = yield call(GetPlaylist, {
        cat: payload.cat,
        offset: page * 35,
        limit: 35,
        order: order,
      });
      yield put({
        type: 'save',
        payload: {
          playlist: result.playlists.map((item: any) => {
            return {
              picUrl: item.coverImgUrl,
              playCount: item.playCount,
              id: item.id,
              name: item.name,
              creator: {
                nickname: item.creator.nickname,
                userId: item.creator.userId,
              },
            };
          }),
          total: result.total,
        },
      });
    },
  },
};

export default model;
