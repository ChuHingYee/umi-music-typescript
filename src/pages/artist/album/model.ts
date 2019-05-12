import { GetArtistsAblum } from './service';
import { DvaModel } from '@/interfaces/dva';

export interface ArtistAlbumState {
  albums: AlbumType[];
  albumPage: number;
}

type AlbumType = {
  name: string;
  id: number;
  picUrl: string;
  publishTime: number;
  [props: string]: any;
};

const model: DvaModel<ArtistAlbumState> = {
  namespace: 'artistAlbum',
  state: {
    albums: [],
    albumPage: 0,
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *getArtistsAlbum({ payload }, { put, call, select }) {
      const albumPage = yield select((state: any) => state.artistAlbum.albumPage);
      const result = yield call(GetArtistsAblum, {
        id: payload.id,
        offset: albumPage * 12,
        limit: 12,
      });
      const { hotAlbums } = result;
      yield put({
        type: 'save',
        payload: {
          albums: hotAlbums.map((item: AlbumType) => {
            return {
              name: item.name,
              id: item.id,
              picUrl: item.picUrl,
              publishTime: item.publishTime,
            };
          }),
        },
      });
    },
  },
};

export default model;
