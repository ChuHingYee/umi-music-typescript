import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Carousel, Skeleton } from 'antd';
import { Dispatch } from 'redux';
import { Link } from 'umi';
import DiscoverTitle from '@/components/discoverTitle';
import RecomendSheetPanel from '@/components/recomendSheetPanel';
import TopList from './components/TopList';
import Banner from './components/Banner';
import Album from './components/Album';
import { getFormatCount } from '@/utils/utils';
import { DiscoverModel } from './model';
import { PlayerSongType } from '@/models/player';
import Classnames from 'classnames';
import styles from './index.module.less';
type Store = {
  discover: DiscoverModel;
  loading: DvaLoadingModel;
};

type PageStateProps = {
  bannerList: DiscoverModel['bannerList'];
  playlist: DiscoverModel['playlist'];
  albumList: DiscoverModel['albumList'];
  upTopList: DiscoverModel['upTopList'];
  newTopList: DiscoverModel['newTopList'];
  originTopList: DiscoverModel['originTopList'];
  artistList: DiscoverModel['artistList'];
  isPlaylistLoading: boolean;
  isAlbumLoading: boolean;
  isToplistLoading: boolean;
  isArtistLoading: boolean;
  isBannerLoading: boolean;
};

type PageDispatchProps = {
  getBanner: () => void;
  getHotPlayList: () => void;
  getNewAblum: () => void;
  getTopList: () => void;
  getArtistList: () => void;
  playPlaylist: (id: number) => void;
  playAlbum: (id: number) => void;
  playList: (list: PlayerSongType[]) => void;
  addSong: (item: PlayerSongType) => void;
  addSongs: (list: PlayerSongType[]) => void;
  playSong: (item: PlayerSongType) => void;
};

type Props = PageStateProps & PageDispatchProps;

type State = {
  playlistTabs: string[];
};

@connect(
  ({ discover, loading }: Store) => ({
    bannerList: discover.bannerList,
    playlist: discover.playlist,
    albumList: discover.albumList,
    upTopList: discover.upTopList,
    newTopList: discover.newTopList,
    originTopList: discover.originTopList,
    artistList: discover.artistList,
    isBannerLoading: loading.effects['discover/getBanner'],
    isPlaylistLoading: loading.effects['discover/getHotPlayList'],
    isAlbumLoading: loading.effects['discover/getNewAblum'],
    isToplistLoading: loading.effects['discover/getTopList'],
    isArtistLoading: loading.effects['discover/getArtistList'],
  }),
  (dispatch: Dispatch<any>) => ({
    getBanner() {
      dispatch({
        type: 'discover/getBanner',
      });
    },
    getHotPlayList() {
      dispatch({
        type: 'discover/getHotPlayList',
      });
    },
    getNewAblum() {
      dispatch({
        type: 'discover/getNewAblum',
      });
    },
    getTopList() {
      dispatch({
        type: 'discover/getTopList',
      });
    },
    getArtistList() {
      dispatch({
        type: 'discover/getArtistList',
      });
    },
    playPlaylist(id: number) {
      dispatch({
        type: 'player/playPlaylist',
        payload: {
          id,
        },
      });
    },
    playAlbum(id: number) {
      dispatch({
        type: 'player/playAlbum',
        payload: {
          id,
        },
      });
    },
    playList(list: PlayerSongType[]) {
      dispatch({
        type: 'player/playList',
        payload: {
          list,
        },
      });
    },
    addSong(song: PlayerSongType) {
      dispatch({
        type: 'player/addSong',
        payload: song,
      });
    },
    addSongs(list: PlayerSongType[]) {
      dispatch({
        type: 'player/addSongs',
        payload: {
          list,
        },
      });
    },
    playSong: (id: number) => dispatch({ type: 'player/playSong', payload: id }),
  }),
)
class Discover extends React.Component<Props, State> {
  albumCarousel: React.ReactNode = {};
  bannerCarousel: React.ReactNode = {};
  state = {
    playlistTabs: ['华语 ', '流行', ' 摇滚 ', '民谣 ', '电子'],
  };

  componentDidMount() {
    const { getArtistList, getBanner, getHotPlayList, getNewAblum, getTopList } = this.props;
    getBanner();
    getArtistList();
    getHotPlayList();
    getNewAblum();
    getTopList();
  }

  carouselNext(key: 'albumCarousel' | 'bannerCarousel') {
    (this[key] as Carousel).next();
  }
  CarouselPrevious(key: 'albumCarousel' | 'bannerCarousel') {
    (this[key] as Carousel).prev();
  }

  playToplistSongs = (list: DiscoverModel['upTopList']['tracks']) => {
    const formatList = list.map(item => {
      const { id, name, ar, mv, al, dt } = item;
      return {
        id,
        name,
        ar,
        mv,
        al,
        dt,
        url: '',
        lrc: [],
      };
    });
    this.props.playList(formatList);
  };

  addToplistSongs = (list: DiscoverModel['upTopList']['tracks']) => {
    const formatList = list.map(item => {
      const { id, name, ar, mv, al, dt } = item;
      return {
        id,
        name,
        ar,
        mv,
        al,
        dt,
        url: '',
        lrc: [],
      };
    });
    this.props.addSongs(formatList);
  };

  //渲染推荐歌单
  playlistRenderer = (
    list: DiscoverModel['playlist'],
    loading: boolean,
    tabs: State['playlistTabs'],
    onPlay: Props['playPlaylist'],
  ) => {
    return (
      <div className={styles.mainLeftPanel}>
        <DiscoverTitle label="热门推荐" path="/discover/playlist/">
          <div className={styles.panelLink}>
            {tabs.map((tab, index) => {
              return (
                <Fragment key={tab}>
                  <Link className={styles.panelLinkTxt} to={`/discover/playlist/?cat=${tab}`}>
                    {tab}
                  </Link>
                  {index !== tabs.length - 1 && <span className={styles.panelLinkLine}>|</span>}
                </Fragment>
              );
            })}
          </div>
        </DiscoverTitle>
        <Skeleton loading={loading}>
          <div className={styles.playList}>
            {list.map(item => {
              return (
                <RecomendSheetPanel
                  key={item.id}
                  id={item.id}
                  path={`/playlist?id=${item.id}`}
                  label={item.name}
                  count={getFormatCount(item.playCount)}
                  pic={item.picUrl}
                  onPlay={onPlay}
                  className={styles.playListItem}
                />
              );
            })}
          </div>
        </Skeleton>
      </div>
    );
  };

  loginRenderer = () => {
    return (
      <div className={styles.login}>
        <p className={styles.loginTip}>
          登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机
        </p>
        <div className={styles.loginBtn}>
          <div className={styles.loginBtnMain}>用户登录</div>
        </div>
      </div>
    );
  };

  render() {
    const {
      bannerList,
      playlist,
      isPlaylistLoading,
      albumList,
      isAlbumLoading,
      upTopList,
      newTopList,
      originTopList,
      isToplistLoading,
      artistList,
      isArtistLoading,
      playPlaylist,
      isBannerLoading,
      playAlbum,
      addSong,
      playSong,
    } = this.props;
    const { playlistTabs } = this.state;
    const { playlistRenderer, loginRenderer, playToplistSongs, addToplistSongs } = this;
    return (
      <div>
        <Banner list={bannerList} loading={isBannerLoading} />
        <div className={styles.main}>
          <div className={styles.mainLeft}>
            {playlistRenderer(playlist, isPlaylistLoading, playlistTabs, playPlaylist)}
            <div className={styles.mainLeftPanel}>
              <DiscoverTitle label="新碟上架" path="/discover/album/" />
              <Album list={albumList} loading={isAlbumLoading} onPlay={playAlbum} />
            </div>
            <div>
              <DiscoverTitle label="榜单" path="/discover/toplist/" />
              <Skeleton loading={isToplistLoading}>
                <div className={styles.topList}>
                  <TopList
                    toplist={upTopList}
                    hasBorder={false}
                    onPlay={playToplistSongs.bind(this, upTopList['tracks'])}
                    onAddSong={addSong}
                    onPlaySong={playSong}
                    onAddSongs={addToplistSongs.bind(this, upTopList['tracks'])}
                  />
                  <TopList
                    toplist={newTopList}
                    onPlay={playToplistSongs.bind(this, newTopList['tracks'])}
                    onAddSong={addSong}
                    onPlaySong={playSong}
                    onAddSongs={addToplistSongs.bind(this, newTopList['tracks'])}
                  />
                  <TopList
                    toplist={originTopList}
                    onPlay={playToplistSongs.bind(this, originTopList['tracks'])}
                    onAddSong={addSong}
                    onPlaySong={playSong}
                    onAddSongs={addToplistSongs.bind(this, originTopList['tracks'])}
                  />
                </div>
              </Skeleton>
            </div>
          </div>
          <div className={styles.mainRight}>
            {loginRenderer()}
            <div className={styles.panel}>
              <h3 className={styles.panelTitle}>
                <span className={styles.panelTitleLabel}>入驻歌手</span>
                <Link className={styles.panelTitleMore} to="/discover/artist/signed/">
                  查看全部>
                </Link>
              </h3>
              <Skeleton loading={isArtistLoading}>
                <ul className={styles.artists}>
                  {artistList.map(item => {
                    return (
                      <li key={item.id} className={styles.artistsItem}>
                        <img className={styles.artistsItemPic} src={item.imgUrl} alt={item.name} />
                        <div className={styles.artistsItemInfo}>
                          <p className={Classnames(styles.arttxt, styles.artname)}>{item.name}</p>
                          <p className={Classnames(styles.arttxt, styles.artalias)}>{item.alias}</p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </Skeleton>
              <div className={styles.btn}>
                <i className={styles.btnTxt}>申请成为网易音乐人</i>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Discover;
