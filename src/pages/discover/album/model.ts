import { GetNewAlbums, GetAlbums } from './service';
import { DvaModel } from '@/interfaces/dva';

export interface DiscoverAlbumModel {
  hotList: ListType[];
  albumsCount: number;
  albumsPage: number;
  albumsList: ListType[];
}

type ListType = {
  picUrl: string;
  id: number;
  name: string;
  artists: ArtistType[];
  [props: string]: any;
};

type ArtistType = {
  name: string;
  id: number;
};

const model: DvaModel<DiscoverAlbumModel> = {
  namespace: 'discoverAlbum',
  state: {
    hotList: [],
    albumsList: [],
    albumsCount: 0,
    albumsPage: 0,
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *getNewAblum(_, { call, put }) {
      const result = yield call(GetNewAlbums, {});
      const formatList = result.albums.slice(0, 10);
      yield put({
        type: 'save',
        payload: {
          hotList: formatList.map((item: any) => {
            return {
              name: item.name,
              id: item.id,
              picUrl: item.picUrl,
              artists: item.artists.map((art: any) => {
                return {
                  name: art.name,
                  id: art.id,
                };
              }),
            };
          }),
        },
      });
    },
    *getList(_, { call, put, select }) {
      const albumsPage = yield select((state: any) => state.discoverAlbum.albumsPage);
      const result = yield call(GetAlbums, { limit: 35, offset: albumsPage * 35 });
      yield put({
        type: 'save',
        payload: {
          albumsList: result.albums.map((item: any) => {
            return {
              name: item.name,
              id: item.id,
              picUrl: item.picUrl,
              artists: item.artists.map((art: any) => {
                return {
                  name: art.name,
                  id: art.id,
                };
              }),
            };
          }),
          albumsCount: result.total,
        },
      });
    },
  },
};

export default model;
