import { GetArtistsMV } from './service';
import { DvaModel } from '@/interfaces/dva';

export interface ArtistMVModel {
  mvs: AlbumType[];
  mvPage: number;
}

type AlbumType = {
  name: string;
  id: number;
  picUrl: string;
  [props: string]: any;
};

const model: DvaModel<ArtistMVModel> = {
  namespace: 'artistMV',
  state: {
    mvs: [],
    mvPage: 0,
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *getArtistsMV(_, { put, call, select }) {
      const mvPage = yield select((state: any) => state.artistMV.mvPage);
      const id = yield select((state: any) => state.artist.id);
      const result = yield call(GetArtistsMV, {
        id: id,
        offset: mvPage * 12,
        limit: 12,
      });
      yield put({
        type: 'save',
        payload: {
          mvs: result.mvs.map((item: AlbumType) => {
            return {
              name: item.name,
              id: item.id,
              picUrl: item.imgurl,
            };
          }),
        },
      });
    },
  },
};

export default model;
