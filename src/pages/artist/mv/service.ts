import fetch from '@/utils/request';

type ParamsType = {
  offset: number;
  id: number;
};

export const GetArtistsMV = (params: ParamsType) => {
  return fetch({
    url: '/artist/mv',
    method: 'get',
    params,
  });
};
