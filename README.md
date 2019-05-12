# 基于 umi 的网易云音乐PC端

##项目介绍

想完成一个由TypeScript编写的react应用（现今项目代码有点粗糙，待不定期完善，目前先占坑）。

##接口地址
感谢Binaryify开源的NeteaseCloudMusicApi，请根据下面自己clone
[Binaryify/NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi)

[关于首页banner图请自行回滚版本](https://github.com/Binaryify/NeteaseCloudMusicApi/issues/435)

## 功能特性

1. 目前只完成了发现首页(推荐/排行榜/歌单/主播电台（找不到接口 - -！）/歌手/新碟上架)/歌手详情/专辑详情/歌单详情/歌曲详情页面及添加删除播放列表功能(各页面代码如项目介绍，粗糙粗糙粗糙)
2. 其余页面不定期完成

## 安装

```shell
$ git clonehttps://github.com/ChuHingYee/umi-music-typescript.git
$ yarn
```

## 运行

### 开发环境

```shell
$ yarn start
```

### 生产环境

```shell
$ yarn build
```

有关相关可前往[Umi官网](https://umijs.org/)自行了解