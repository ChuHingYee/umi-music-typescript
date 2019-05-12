import fetch from '@/utils/request';

type ParamsType = {
  offset: number;
  id: number;
};
export const GetArtistsAblum = (params: ParamsType) => {
  return fetch({
    url: '/artist/album',
    method: 'get',
    params,
  });
};
