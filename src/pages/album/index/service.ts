import fetch from '@/utils/request';

type SongDetailParams = {
  idx: number;
};

type IdParams = {
  id: number;
};

export const GetAlubmDetail = (params: IdParams) => {
  return fetch({
    url: '/album',
    method: 'get',
    params,
  });
};

export const GetAlbumComment = (params: IdParams) => {
  return fetch({
    url: '/comment/album',
    method: 'get',
    params,
  });
};
