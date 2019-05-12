import { GetArtists } from './service';
import { DvaModel } from '@/interfaces/dva';

export interface DiscoverArtistCatModel {
  cat: number;
  artists: ArtistType[];
  tab: string;
}

type ArtistType = {
  img1v1Url: string;
  id: number;
  name: string;
  [props: string]: any;
};

const model: DvaModel<DiscoverArtistCatModel> = {
  namespace: 'artistsCat',
  state: {
    artists: [],
    tab: '0',
    cat: 0,
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *getArtists(_, { call, put, select }) {
      const tab = yield select((state: any) => state.artistsCat.tab);
      const cat = yield select((state: any) => state.artistsCat.cat);
      const params: any = {
        cat: cat,
        limit: 100,
      };
      if (tab !== '0') {
        params.initial = tab;
      }
      const result = yield call(GetArtists, params);
      yield put({
        type: 'save',
        payload: {
          artists: result.artists.map((item: ArtistType) => {
            return {
              img1v1Url: item.img1v1Url,
              id: item.id,
              name: item.name,
            };
          }),
        },
      });
    },
  },
};

export default model;
