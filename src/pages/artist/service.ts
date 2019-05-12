import fetch from '@/utils/request';

type IdParamsType = {
  id: number;
};

export const GetHotArtists = () => {
  return fetch({
    url: '/top/artists?offset=0&limit=6',
    method: 'get',
  });
};

export const GetArtistsInfo = (params: IdParamsType) => {
  return fetch({
    url: '/artists',
    method: 'get',
    params,
  });
};
