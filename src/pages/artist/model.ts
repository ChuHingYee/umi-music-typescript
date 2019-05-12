import { GetHotArtists, GetArtistsInfo } from './service';
import { DvaModel } from '@/interfaces/dva';
import { string } from 'prop-types';

export interface ArtistModel {
  artists: ArtistType[];
  id: number;
  artistInfo: ArtistInfoType;
  songs: SongType[];
  musicSize: number;
  albumSize: number;
  mvSize: number;
}

type ArtistType = {
  pic: string;
  name: string;
  id: number;
  [props: string]: any;
};

type ArtistInfoType = {
  name: string;
  picUrl: string;
  id: number;
  alias: string[];
  [props: string]: any;
};

type SongType = {
  name: string;
  mv: number;
  dt: number;
  id: number;
  al: { name: string; id: number; alia: string[]; [props: string]: any };
  [props: string]: any;
};

const model: DvaModel<ArtistModel> = {
  namespace: 'artist',
  state: {
    id: -1,
    artists: [],
    artistInfo: {
      name: '',
      picUrl: '',
      id: -1,
      alias: [],
    },
    songs: [],
    musicSize: 0,
    albumSize: 0,
    mvSize: 0,
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *getHotArtists(_, { put, call }) {
      const result = yield call(GetHotArtists, {});
      yield put({
        type: 'save',
        payload: {
          artists: result.artists.map((item: ArtistType) => {
            return {
              pic: item.img1v1Url,
              name: item.name,
              id: item.id,
            };
          }),
        },
      });
    },
    *getArtistsInfo(_, { put, call, select }) {
      const id = yield select((state: any) => state.artist.id);
      const result = yield call(GetArtistsInfo, { id });
      const { artist, hotSongs } = result;
      yield put({
        type: 'save',
        payload: {
          artistInfo: {
            name: artist.name,
            picUrl: artist.picUrl,
            id: artist.id,
            alias: artist.alias,
          },
          songs: hotSongs.map((item: SongType) => {
            return {
              name: item.name,
              mv: item.mv,
              dt: item.dt,
              id: item.id,
              alia: item.alia.join('/'),
              al: {
                name: item.al.name,
                id: item.al.id,
                alia: item.al.alia,
              },
            };
          }),
          musicSize: artist.musicSize,
          albumSize: artist.albumSize,
          mvSize: artist.mvSize,
        },
      });
    },
  },
};

export default model;
