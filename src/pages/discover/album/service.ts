import fetch from '@/utils/request';

export const GetNewAlbums = () => {
  return fetch({
    url: '/album/newest',
    method: 'get',
  });
};

export const GetAlbums = (params: any) => {
  return fetch({
    url: '/top/album',
    method: 'get',
    params,
  });
};
