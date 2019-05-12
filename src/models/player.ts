import { GetSongUrl, GetSongLrc, GetPlaylistDetail, GetAlubmDetail } from '@/services/player';
import { DvaModel } from '@/interfaces/dva';
import { delay } from 'redux-saga';

export interface PlayerModel {
  playlist: PlayerSongType[];
  currentIndex: number;
  ref: any;
}

export type PlayerSongType = {
  name: string;
  id: number;
  ar: {
    name: string;
    id: number;
  }[];
  mv: number;
  al: {
    id: number;
    name: string;
    picUrl: string;
  };
  dt: number;
  url: string;
  lrc: LrcDetail[];
  [props: string]: any;
};

type LrcDetail = {
  time: number;
  lrc: string;
  tlrc?: string;
};

const model: DvaModel<PlayerModel> = {
  namespace: 'player',
  state: {
    playlist: [],
    currentIndex: -1,
    ref: null,
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
    add(state, { payload }) {
      return { ...state, playlist: [...state.playlist, { ...payload }] };
    },
    set(state, { payload }) {
      return {
        ...state,
        playlist: state.playlist.map(song =>
          song.id === payload.id ? { ...song, ...payload } : song,
        ),
      };
    },
  },
  effects: {
    *playSong({ payload }, { put, call, select }) {
      let playlist: PlayerSongType[] = yield select((state: any) => state.player.playlist);
      let index = playlist.findIndex(song => {
        return song.id === payload.id;
      });
      if (index !== -1) {
        yield put({
          type: 'save',
          payload: {
            currentIndex: index,
          },
        });
      } else {
        yield put({
          type: 'add',
          payload: {
            ...payload,
            url: '',
            lrc: [],
          },
        });
        yield put({
          type: 'save',
          payload: {
            currentIndex: playlist.length,
          },
        });
      }
      playlist = yield select((state: any) => state.player.playlist);
      index = yield select((state: any) => state.player.currentIndex);
      if (!playlist[index].url) {
        const result = yield call(GetSongUrl, { id: playlist[index].id });
        yield put({
          type: 'set',
          payload: {
            id: playlist[index].id,
            url: result.data[0].url,
          },
        });
      }
      yield put({
        type: 'getLrc',
        payload: {
          index,
        },
      });
      yield delay(200);
      const playerRef = yield select((state: any) => state.player.ref);
      playerRef.play();
    },
    *playList({ payload }, { put, call, select }) {
      yield put({
        type: 'save',
        payload: {
          playlist: payload.list,
          currentIndex: 0,
        },
      });
      const result = yield call(GetSongUrl, { id: payload.list[0].id });
      yield put({
        type: 'set',
        payload: {
          id: payload.list[0].id,
          url: result.data[0].url,
        },
      });
      yield put({
        type: 'getLrc',
        payload: {
          index: 0,
        },
      });
      yield delay(200);
      const playerRef = yield select((state: any) => state.player.ref);
      playerRef.play();
    },
    *addSong({ payload }, { put, select }) {
      let playlist: PlayerSongType[] = yield select((state: any) => state.player.playlist);
      let index = playlist.findIndex(item => {
        return item.id === payload.id;
      });
      if (index === -1) {
        yield put({
          type: 'add',
          payload: {
            ...payload,
            url: '',
            lrc: [],
          },
        });
      }
    },
    *addSongs({ payload }, { put, select }) {
      let playlist: PlayerSongType[] = yield select((state: any) => state.player.playlist);
      playlist = playlist.concat(payload.list);
      let cache: { [props: number]: boolean } = {};
      let list: PlayerSongType[] = [];
      playlist.forEach(item => {
        if (!cache[item.id]) {
          cache[item.id] = true;
          list.push(item);
        }
      });
      yield put({
        type: 'save',
        payload: {
          playlist: list,
        },
      });
    },
    *getLrc({ payload }, { put, call, select }) {
      const { index } = payload;
      const playlist = yield select((state: any) => state.player.playlist);
      if (playlist[index].lrc.length === 0) {
        const result = yield call(GetSongLrc, { id: playlist[index].id });
        const lrcArr = result.lrc.lyric.split('\n');
        let arr: LrcDetail[] = [];
        lrcArr.forEach((item: string) => {
          const match = /\[(.+?)\]/.exec(item) as RegExpExecArray;
          if (match) {
            const innerMatch = match[1];
            let formatTime: number = 0;
            let flag = true;
            if (innerMatch) {
              const timeArr = innerMatch.split(':');
              timeArr.forEach((time: string | number) => {
                if (isNaN((time as number) - 0) && flag) {
                  flag = false;
                } else {
                  formatTime = parseFloat(timeArr[0]) * 60 + parseFloat(timeArr[1]);
                }
              });
            }
            if (flag) {
              arr.push({
                time: formatTime,
                lrc: item.split(match[0])[1],
              });
            }
          }
        });
        if (result.tlyric && result.tlyric.lyric && result.tlyric.lyric.length > 0) {
          const tlrcArr = result.tlyric.lyric.split('\n');
          tlrcArr.forEach((titem: string) => {
            const tMatch = /\[(.+?)\]/.exec(titem) as RegExpExecArray;
            if (tMatch) {
              const tInnerMatch = tMatch[1];
              let formatTime: number;
              let flag = true;
              if (tInnerMatch) {
                const timeArr = tInnerMatch.split(':');
                timeArr.forEach((time: string | number) => {
                  if (isNaN((time as number) - 0) && flag) {
                    flag = false;
                  } else {
                    formatTime = parseFloat(timeArr[0]) * 60 + parseFloat(timeArr[1]);
                  }
                });
              }
              if (flag) {
                let index = arr.findIndex(i => {
                  return i.time === formatTime;
                });
                if (index !== -1) {
                  arr[index].tlrc = titem.split(tMatch[0])[1];
                }
              }
            }
          });
        }
        yield put({
          type: 'set',
          payload: {
            id: playlist[index].id,
            lrc: arr,
          },
        });
      }
    },
    *playPlaylist({ payload }, { call, put }) {
      const result = yield call(GetPlaylistDetail, { id: payload.id });
      yield put({
        type: 'playList',
        payload: {
          list: result.playlist.tracks.map((item: any) => {
            const { id, name, ar, mv, al, dt } = item;
            return {
              id,
              name,
              ar,
              mv,
              al,
              dt,
              url: '',
              lrc: [],
            };
          }),
        },
      });
    },
    *playAlbum({ payload }, { call, put }) {
      const result = yield call(GetAlubmDetail, { id: payload.id });
      yield put({
        type: 'playList',
        payload: {
          list: result.songs.map((item: any) => {
            const { id, name, ar, mv, al, dt } = item;
            return {
              id,
              name,
              ar,
              mv,
              al,
              dt,
              url: '',
              lrc: [],
            };
          }),
        },
      });
    },
    *delSong({ payload }, { put, select }) {
      const playerRef = yield select((state: any) => state.player.ref);
      let playlist: PlayerSongType[] = yield select((state: any) => state.player.playlist);
      const currentIndex: number = yield select((state: any) => state.player.currentIndex);
      const newList = playlist.filter(item => {
        return item.id !== payload.id;
      });
      const songIndex = playlist.findIndex(item => {
        return item.id === payload.id;
      });
      let nextProps: Partial<PlayerModel> = {
        playlist: newList,
      };
      if (songIndex === currentIndex) {
        playerRef.pause();
        nextProps.currentIndex = 0;
      }
      yield put({
        type: 'save',
        payload: nextProps,
      });
      if (nextProps.currentIndex === 0 || nextProps.currentIndex) {
        yield put({
          type: 'playSong',
          payload: {
            id: newList[nextProps.currentIndex].id,
          },
        });
      }
    },
  },
};

export default model;
