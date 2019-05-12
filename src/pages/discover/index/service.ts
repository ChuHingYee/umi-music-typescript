import fetch from '@/utils/request';

type TopParams = {
  idx: number;
};

type DetailParams = {
  id: number;
};
export const GetBanner = () => {
  return fetch({
    url: '/banner',
    method: 'get',
  });
};

export const GetHotPlayList = () => {
  return fetch({
    url: '/personalized',
    method: 'get',
  });
};

export const GetHotDj = () => {
  return fetch({
    url: '/personalized/djprogram',
    method: 'get',
  });
};

export const GetNewAlbums = () => {
  return fetch({
    url: '/album/newest',
    method: 'get',
  });
};

export const GetTopList = (params: TopParams) => {
  return fetch({
    url: '/top/list',
    method: 'get',
    params,
  });
};

export const GetArtistList = (params: TopParams) => {
  return fetch({
    url: '/artist/list',
    method: 'get',
    params,
  });
};
