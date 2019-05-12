import React, { Component } from 'react';
import CommentWrap from '@/components/commentWrap';
import SongsList from '@/components/songsList';
import SiderPanel from '@/components/siderPanel';
import SiderPanelDownload from '@/components/siderPanelDownload';
import PlaylistInfo from './components/PlaylistInfo';
import LikerWrap from './components/LikerWrap';
import RecommendWrap from './components/RecommendWrap';
import { Skeleton } from 'antd';
import { Link } from 'umi';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import { PlaylistModel } from './model';
import { PlayerSongType } from '@/models/player';
import styles from './index.module.less';

type Store = {
  playlistDetail: PlaylistModel;
  loading: DvaLoadingModel;
};

type PageStateProps = {
  playlistDetail: PlaylistModel['detail'];
  playlistSongs: PlaylistModel['songs'];
  commentList: PlaylistModel['commentList'];
  hotCommentList: PlaylistModel['hotCommentList'];
  commentCount: PlaylistModel['commentCount'];
  subscribers: PlaylistModel['subscribers'];
  relatedPlaylist: PlaylistModel['relatedPlaylist'];
  isDetailLoading: boolean;
  isCommentLoading: boolean;
  isRelateLoading: boolean;
  isLikerLoading: boolean;
  location: LocationUmi;
};

type PageDispatchProps = {
  getPlaylistDetail: (id: number) => void;
  getPlaylistComment: (id: number) => void;
  getPlaylistSubscribers: (id: number) => void;
  getRelatedPlaylist: (id: number) => void;
  playlistPageChange: (count: number) => void;
  playSong: (item: PlayerSongType) => void;
  playList: (list: PlayerSongType[]) => void;
  addSongs: (list: PlayerSongType[]) => void;
};

type Props = PageStateProps & PageDispatchProps;

type State = {
  isHide: boolean;
};

@connect(
  ({ playlistDetail, loading }: Store) => {
    return {
      playlistDetail: playlistDetail.detail,
      playlistSongs: playlistDetail.songs,
      commentList: playlistDetail.commentList,
      hotCommentList: playlistDetail.hotCommentList,
      commentCount: playlistDetail.commentCount,
      subscribers: playlistDetail.subscribers,
      relatedPlaylist: playlistDetail.relatedPlaylist,
      isDetailLoading: loading.effects['playlistDetail/getDetail'],
      isCommentLoading: loading.effects['playlistDetail/getDetail'],
      isRelateLoading: loading.effects['playlistDetail/getDetail'],
      isLikerLoading: loading.effects['playlistDetail/getDetail'],
    };
  },
  (dispatch: Dispatch<any>) => {
    return {
      getPlaylistDetail: (id: number) =>
        dispatch({ type: 'playlistDetail/getDetail', payload: { id } }),
      getPlaylistComment: (id: number) =>
        dispatch({ type: 'playlistDetail/getComment', payload: { id } }),
      getRelatedPlaylist: (id: number) =>
        dispatch({ type: 'playlistDetail/getRelatedPlaylist', payload: { id } }),
      getPlaylistSubscribers: (id: number) =>
        dispatch({ type: 'playlistDetail/getPlaylistSubscribers', payload: { id } }),
      playlistPageChange: (commentPage: number) =>
        dispatch({ type: 'playlistDetail/save', payload: { commentPage: commentPage - 1 } }),
      playSong: (item: PlayerSongType) => dispatch({ type: 'player/playSong', payload: item }),
      playList: (list: PlayerSongType[]) =>
        dispatch({ type: 'player/playList', payload: { list } }),
      addSongs: (list: PlayerSongType[]) =>
        dispatch({ type: 'player/addSongs', payload: { list } }),
    };
  },
)
class Playlist extends Component<Props, State> {
  state = {
    isHide: true,
  };

  componentWillReceiveProps(nextProps: any) {
    const id = nextProps.location.query.id;
    if (id !== this.props.location.query.id) {
      this.props.getPlaylistDetail(id);
      this.props.getPlaylistComment(id);
      this.props.getPlaylistSubscribers(id);
      this.props.getRelatedPlaylist(id);
    }
  }

  componentDidMount() {
    const id = parseInt(this.props.location.query.id);
    this.props.getPlaylistDetail(id);
    this.props.getPlaylistComment(id);
    this.props.getPlaylistSubscribers(id);
    this.props.getRelatedPlaylist(id);
  }

  onPageChange = (page: number) => {
    this.props.playlistPageChange(page - 1);
    this.props.getPlaylistComment(parseInt(this.props.location.query.id));
  };

  triggerIsHide = () => {
    this.setState((state: State) => ({
      isHide: !state.isHide,
    }));
  };

  handlePlaySong = (item: PlayerSongType) => {
    const { id, name, ar, mv, al, dt } = item;
    this.props.playSong({
      id,
      name,
      ar,
      mv,
      al,
      dt,
      url: '',
      lrc: [],
    });
  };

  handlePlayList = (list: PlaylistModel['songs']) => {
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

  handleAddSongs = (list: PlaylistModel['songs']) => {
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

  render() {
    const { onPageChange } = this;
    const {
      playlistDetail,
      hotCommentList,
      commentList,
      commentCount,
      playlistSongs,
      subscribers,
      relatedPlaylist,
      isCommentLoading,
      isDetailLoading,
      isLikerLoading,
      isRelateLoading,
    } = this.props;
    return (
      <div className={styles.page}>
        <div className={styles.pageLeft}>
          <Skeleton active={true} paragraph={{ rows: 10 }} loading={isDetailLoading}>
            <PlaylistInfo
              detail={playlistDetail}
              songs={playlistSongs}
              addList={this.handleAddSongs}
              playList={this.handlePlayList}
            />
            <SongsList
              list={playlistSongs}
              className={styles.list}
              handlePlay={this.handlePlaySong}
            />
          </Skeleton>
          <Skeleton
            active={true}
            paragraph={{ rows: 5 }}
            avatar={{ size: 'large' }}
            loading={isCommentLoading}
          >
            <CommentWrap
              className={styles.comment}
              hotCommentList={hotCommentList}
              commentList={commentList}
              commentCount={commentCount}
              onPageChange={onPageChange}
            />
          </Skeleton>
        </div>
        <div className={styles.pageRight}>
          <Skeleton active={true} loading={isLikerLoading}>
            <LikerWrap list={subscribers} />
          </Skeleton>
          <Skeleton active={true} loading={isRelateLoading}>
            <RecommendWrap list={relatedPlaylist} />
          </Skeleton>
          <SiderPanelDownload />
        </div>
      </div>
    );
  }
}

export default Playlist;
