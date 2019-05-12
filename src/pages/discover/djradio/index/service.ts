import fetch from '@/utils/request';

export const GetProgramRecommend = () => {
  return fetch({
    url: '/program/recommend',
    method: 'get',
  });
};

export const GetRadioList = (params: any) => {
  return fetch({
    url: '/dj/recommend/type',
    method: 'get',
    params,
  });
};
