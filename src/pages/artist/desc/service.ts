import fetch from '@/utils/request';

type ParamsType = {
  id: number;
};
export const GetArtistsDesc = (params: ParamsType) => {
  return fetch({
    url: '/artist/desc',
    method: 'get',
    params,
  });
};
