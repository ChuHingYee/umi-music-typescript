import { GetSignArtists, GetHotArtists } from './service';
import { DvaModel } from '@/interfaces/dva';

export interface DiscoverArtistsModel {
  signArtists: ArtistType[];
  hotArtists: ArtistType[];
}

type ArtistType = {
  img1v1Url: string;
  id: number;
  name: string;
  [props: string]: any;
};

const model: DvaModel<DiscoverArtistsModel> = {
  namespace: 'discoverArtists',
  state: {
    signArtists: [],
    hotArtists: [],
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *getSignArtists(_, { call, put }) {
      const result = yield call(GetSignArtists, {});
      yield put({
        type: 'save',
        payload: {
          signArtists: result.artists.map((item: ArtistType) => {
            return {
              img1v1Url: item.img1v1Url,
              id: item.id,
              name: item.name,
            };
          }),
        },
      });
    },
    *getHotArtists(_, { call, put }) {
      const result = yield call(GetHotArtists, {});
      yield put({
        type: 'save',
        payload: {
          hotArtists: result.artists.map((item: ArtistType) => {
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
