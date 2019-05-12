import fetch from '@/utils/request';

export const GetPlaylist = (params: any) => {
  return fetch({
    url: '/top/playlist',
    method: 'get',
    params,
  });
};
