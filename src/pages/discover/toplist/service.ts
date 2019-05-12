import fetch from '@/utils/request';

type TopListDetailParams = {
  idx: number;
};

type TopLisCommentParams = {
  offset: number;
  id: number;
};

export const GetTopList = () => {
  return fetch({
    url: '/toplist',
    method: 'get',
  });
};

export const GetTopListDetail = (params: TopListDetailParams) => {
  return fetch({
    url: '/playlist/detail',
    method: 'get',
    params,
  });
};

export const GetTopListComment = (params: TopLisCommentParams) => {
  return fetch({
    url: '/comment/playlist',
    method: 'get',
    params,
  });
};
