import fetch from '@/utils/request';

type ParamsType = {
  id: number;
};
export const GetSongUrl = (params: ParamsType) => {
  return fetch({
    url: '/song/url',
    method: 'get',
    params,
  });
};

export const GetSongLrc = (params: ParamsType) => {
  return fetch({
    url: '/lyric',
    method: 'get',
    params,
  });
};

export const GetPlaylistDetail = (params: ParamsType) => {
  return fetch({
    url: '/playlist/detail',
    method: 'get',
    params,
  });
};

export const GetAlubmDetail = (params: ParamsType) => {
  return fetch({
    url: '/album',
    method: 'get',
    params,
  });
};
