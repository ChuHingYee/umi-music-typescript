import { GetSignArtists } from './service';
import { DvaModel } from '@/interfaces/dva';

export interface ArtistsState {
  signArtists: ArtistType[];
  pageCount: number;
  more: boolean;
}

type ArtistType = {
  img1v1Url: string;
  id: number;
  name: string;
  [props: string]: any;
};

const model: DvaModel<ArtistsState> = {
  namespace: 'artistsSigned',
  state: {
    signArtists: [],
    pageCount: -1,
    more: true,
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *getSignArtists(_, { call, put, select }) {
      let pageCount = yield select((state: any) => state.artistsSigned.pageCount);
      yield put({
        type: 'save',
        payload: {
          pageCount: pageCount + 1,
        },
      });
      const result = yield call(GetSignArtists, {
        cat: 5001,
        limit: 60,
        initial: 'a',
        offset: (pageCount + 1) * 60,
      });
      const signArtists = yield select((state: any) => state.artistsSigned.signArtists);
      yield put({
        type: 'save',
        payload: {
          signArtists: signArtists.concat(
            result.artists.map((item: ArtistType) => {
              return {
                img1v1Url: item.img1v1Url,
                id: item.id,
                name: item.name,
              };
            }),
          ),
          more: result.more,
        },
      });
    },
  },
};

export default model;
