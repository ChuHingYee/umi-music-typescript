import {
  GetBanner,
  GetHotPlayList,
  GetHotDj,
  GetNewAlbums,
  GetTopList,
  GetArtistList,
} from './service';
import { DvaModel } from '@/interfaces/dva';

type Artist = {
  name: string;
  id: number;
};

type DiscoverBanner = {
  picUrl: string;
  backgroundUrl: string;
  targetType: number;
  targetId: number;
  url: string;
  [props: string]: any;
};

type DiscoverPlaylistType = {
  picUrl: string;
  playCount: number;
  id: number;
  name: string;
  type: number;
  [props: string]: any;
};

type DiscoverAlbum = {
  picUrl: string;
  id: number;
  name: string;
  artists: Artist[];
  [props: string]: any;
};

type DiscoverTopList = {
  id: number;
  name: string;
  coverImgUrl: string;
  tracks: DiscoverTopListTrack[];
  [props: string]: any;
};

export type DiscoverTopListTrack = {
  name: string;
  id: number;
  [props: string]: any;
};

type DiscoverArtist = {
  imgUrl: string;
  id: number;
  name: string;
  alias: string[];
  [props: string]: any;
};

export interface DiscoverModel {
  bannerList: DiscoverBanner[];
  playlist: DiscoverPlaylistType[];
  albumList: DiscoverAlbum[];
  upTopList: DiscoverTopList;
  newTopList: DiscoverTopList;
  originTopList: DiscoverTopList;
  artistList: DiscoverArtist[];
}

function formatTopList(list: DiscoverTopList): DiscoverTopList {
  let tracks = list.tracks.slice(0, 10);
  return {
    id: list.id,
    name: list.name,
    coverImgUrl: list.coverImgUrl,
    tracks: tracks.map(i => {
      const { id, name, ar, mv, al, dt } = i;
      return {
        id,
        name,
        ar,
        mv,
        al,
        dt,
      };
    }),
  };
}

const model: DvaModel<DiscoverModel> = {
  namespace: 'discover',
  state: {
    bannerList: [],
    playlist: [],
    albumList: [],
    upTopList: { id: -1, name: '', coverImgUrl: '', tracks: [] },
    newTopList: { id: -1, name: '', coverImgUrl: '', tracks: [] },
    originTopList: { id: -1, name: '', coverImgUrl: '', tracks: [] },
    artistList: [],
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *getBanner(_, { call, put }) {
      const result = yield call(GetBanner, {});
      const formatList = result.banners.map((item: DiscoverBanner) => {
        return {
          picUrl: item.picUrl,
          backgroundUrl: item.backgroundUrl,
          targetType: item.targetType,
          targetId: item.targetId,
          url: item.url,
        };
      });
      yield put({
        type: 'save',
        payload: {
          bannerList: formatList,
        },
      });
    },
    *getHotPlayList(_, { call, put }) {
      const [playListResult, djResult] = yield [call(GetHotPlayList, {}), call(GetHotDj, {})];
      const formatPlayList = playListResult.result
        .filter((item: DiscoverPlaylistType, index: number) => {
          return index < 6;
        })
        .map((item: DiscoverPlaylistType) => {
          return {
            picUrl: item.picUrl,
            playCount: item.playCount,
            id: item.id,
            name: item.name,
            type: item.type,
          };
        });
      const formatDjList = djResult.result
        .filter((item: DiscoverPlaylistType, index: number) => {
          return index < 3;
        })
        .map((item: DiscoverPlaylistType) => {
          return {
            picUrl: item.picUrl,
            playCount: item.program.adjustedPlayCount,
            id: item.id,
            name: item.name,
            type: item.number,
          };
        });
      const list = [
        formatPlayList[0],
        formatPlayList[1],
        formatPlayList[2],
        formatDjList[0],
        formatPlayList[3],
        formatDjList[1],
        formatPlayList[4],
        formatDjList[2],
      ];
      yield put({
        type: 'save',
        payload: {
          playlist: list,
        },
      });
    },
    *getNewAblum(_, { call, put }) {
      const result = yield call(GetNewAlbums, {});
      const formatList = result.albums.map((item: any) => {
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
      });
      yield put({
        type: 'save',
        payload: {
          albumList: formatList.slice(0, 10),
        },
      });
    },
    *getTopList(_, { call, put }) {
      const [upResult, newResult, originResult] = yield [
        call(GetTopList, { idx: 3 }),
        call(GetTopList, { idx: 0 }),
        call(GetTopList, { idx: 2 }),
      ];
      const formatUpList = formatTopList(upResult.playlist);
      const formatNewList = formatTopList(newResult.playlist);
      const formatOrigubList = formatTopList(originResult.playlist);
      yield put({
        type: 'save',
        payload: {
          upTopList: formatUpList,
          newTopList: formatNewList,
          originTopList: formatOrigubList,
        },
      });
    },
    *getArtistList(_, { call, put }) {
      const result = yield call(GetArtistList, { cat: 5001 });
      let formatArtList = result.artists.slice(0, 5);
      formatArtList = formatArtList.map((item: DiscoverArtist) => {
        return {
          imgUrl: item.img1v1Url,
          id: item.id,
          name: item.name,
          alias: item.alias.join('/'),
        };
      });
      yield put({
        type: 'save',
        payload: {
          artistList: formatArtList,
        },
      });
    },
  },
};

export default model;
