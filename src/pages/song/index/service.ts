import fetch from '@/utils/request';

type SongDetailParams = {
  idx: number;
};

type SongLrcParams = {
  id: number;
};

type SongCommentParams = {
  offset: number;
  id: number;
};

export const GetSongDetail = (params: SongDetailParams) => {
  return fetch({
    url: '/song/detail',
    method: 'get',
    params,
  });
};

export const GetSongLrc = (params: SongLrcParams) => {
  return fetch({
    url: '/lyric',
    method: 'get',
    params,
  });
};

export const GetSongComment = (params: SongCommentParams) => {
  return fetch({
    url: '/comment/music',
    method: 'get',
    params,
  });
};

export const GetSongPlayList = (params: SongLrcParams) => {
  return fetch({
    url: '/simi/playlist',
    method: 'get',
    params,
  });
};

export const GetSimpleSongList = (params: SongLrcParams) => {
  return fetch({
    url: '/simi/song',
    method: 'get',
    params,
  });
};
