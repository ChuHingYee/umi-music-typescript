import fetch from '@/utils/request';

type IdParams = {
  id: number;
};

type CommentParams = {
  offset: number;
  id: number;
};

export const GetPlaylistDetail = (params: IdParams) => {
  return fetch({
    url: '/playlist/detail',
    method: 'get',
    params,
  });
};

export const GetPlaylistComment = (params: IdParams) => {
  return fetch({
    url: '/comment/playlist',
    method: 'get',
    params,
  });
};

export const GetPlaylistSubscribers = (params: IdParams) => {
  return fetch({
    url: '/playlist/subscribers',
    method: 'get',
    params,
  });
};

export const GetRelatedPlaylist = (params: IdParams) => {
  return fetch({
    url: '/related/playlist',
    method: 'get',
    params,
  });
};
