import fetch from '@/utils/request';

export const GetSignArtists = () => {
  return fetch({
    url: '/artist/list?cat=5001&limit=10',
    method: 'get',
  });
};

export const GetHotArtists = () => {
  return fetch({
    url: '/top/artists?offset=0&limit=100',
    method: 'get',
  });
};
