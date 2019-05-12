import { IConfig } from 'umi-types';

// ref: https://umijs.org/config/
const config: IConfig = {
  treeShaking: true,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: {
          immer: true,
        },
        dynamicImport: { webpackChunkName: true },
        title: 'pc-music',
        dll: true,

        routes: {
          exclude: [
            /models\//,
            /services\//,
            /model\.(t|j)sx?$/,
            /service\.(t|j)sx?$/,
            /components\//,
          ],
        },
      },
    ],
  ],
  routes: [
    {
      path: '/',
      component: '../layouts',
      routes: [
        {
          path: '/artist',
          component: './artist/layout',
          routes: [
            {
              path: '/artist/',
              component: './artist/index',
            },
            {
              path: '/artist/album',
              component: './artist/album',
            },
            {
              path: '/artist/mv',
              component: './artist/mv',
            },
            {
              path: '/artist/desc',
              component: './artist/desc',
            },
          ],
        },
        {
          path: '/playlist',
          component: './playlist/index',
        },
        {
          path: '/song',
          component: './song/index',
        },
        {
          path: '/album',
          component: './album/index',
        },
        {
          path: '/',
          component: './discover/layout',
          routes: [
            {
              path: '/',
              component: './discover/index',
            },
            {
              path: '/discover',
              component: './discover/index',
            },
            {
              path: '/discover/toplist',
              component: './discover/toplist',
            },
            {
              path: '/discover/playlist',
              component: './discover/playlist',
            },
            {
              path: '/discover/djradio',
              component: './discover/djradio/layout',
              routes: [
                {
                  path: '/discover/djradio/category',
                  component: './discover/djradio/category',
                },
                {
                  path: '/discover/djradio',
                  component: './discover/djradio/index',
                },
              ],
            },
            {
              path: '/discover/artist',
              component: './discover/artist/layout',
              routes: [
                {
                  path: '/discover/artist/cat',
                  component: './discover/artist/cat',
                },
                {
                  path: '/discover/artist/signed',
                  component: './discover/artist/signed',
                },
                {
                  path: '/discover/artist/',
                  component: './discover/artist/index',
                },
              ],
            },
            {
              path: '/discover/album',
              component: './discover/album',
            },
          ],
        },
      ],
    },
  ],
};

export default config;
