import fetch from '@/utils/request';

export const GetRadioCateList = () => {
  return fetch({
    url: '/dj/catelist',
    method: 'get',
  });
};
