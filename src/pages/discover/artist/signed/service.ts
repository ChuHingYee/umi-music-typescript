import fetch from '@/utils/request';

type SignParams = {
  cat: number;
  offset: number;
  limit: number;
};

export const GetSignArtists = (params: SignParams) => {
  return fetch({
    url: '/artist/list',
    method: 'get',
    params,
  });
};
