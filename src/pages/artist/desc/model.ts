import { GetArtistsDesc } from './service';
import { DvaModel } from '@/interfaces/dva';

export interface ArtistDescModel {
  briefDesc: string;
  introduction: {
    ti: string;
    txt: string;
  }[];
}

const model: DvaModel<ArtistDescModel> = {
  namespace: 'artistDesc',
  state: {
    briefDesc: '',
    introduction: [],
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *getDesc(_, { put, call, select }) {
      const id = yield select((state: any) => state.artist.id);
      const result = yield call(GetArtistsDesc, {
        id,
      });
      yield put({
        type: 'save',
        payload: {
          briefDesc: result.briefDesc,
          introduction: result.introduction,
        },
      });
    },
  },
};

export default model;
