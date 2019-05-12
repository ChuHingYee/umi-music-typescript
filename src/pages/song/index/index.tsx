import React, { Component } from 'react';
import { Skeleton } from 'antd';
import ArtistsLink from '@/components/artistsLink';
import CommentWrap from '@/components/commentWrap';
import SiderPanel from '@/components/siderPanel';
import SiderPanelDownload from '@/components/siderPanelDownload';
import SongInfo from './components/SongInfo';
import { PlayerSongType } from '@/models/player';
import { Link } from 'umi';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import { SongDetailModel } from './model';
import Classnames from 'classnames';
import styles from './index.module.less';

type Store = {
  song: SongDetailModel;
  loading: DvaLoadingModel;
};

type PageStateProps = {
  songDetail: SongDetailModel['songDetail'];
  songLrc: SongDetailModel['lrc'];
  lrcOwn: SongDetailModel['lrcOwn'];
  lrcTransUser: SongDetailModel['tLrcOwn'];
  commentList: SongDetailModel['commentList'];
  hotCommentList: SongDetailModel['hotCommentList'];
  commentCount: SongDetailModel['commentCount'];
  playList: SongDetailModel['playList'];
  simpleList: SongDetailModel['simpleList'];
  location: LocationUmi;
  isCommentLoading: boolean;
  isDetailLoading: boolean;
};

type PageDispatchProps = {
  getSongDetail: (id: number) => void;
  getSongPlayList: (id: number) => void;
  getSimpleSongList: (id: number) => void;
  getSongLrc: (id: number) => void;
  getSongComment: (id: number) => void;
  songPageChange: (count: number) => void;
  playSong: (song: Partial<PlayerSongType>) => void;
  addSong: (song: Partial<PlayerSongType>) => void;
};

type Props = PageStateProps & PageDispatchProps;

type State = {
  isHide: boolean;
};

@connect(
  ({ song, loading }: Store) => {
    return {
      songDetail: song.songDetail,
      songLrc: song.lrc,
      lrcOwn: song.lrcOwn,
      lrcTransUser: song.tLrcOwn,
      commentList: song.commentList,
      hotCommentList: song.hotCommentList,
      commentCount: song.commentCount,
      playList: song.playList,
      simpleList: song.simpleList,
      isCommentLoading: loading.effects['song/getSongComment'],
      isDetailLoading: loading.effects['song/getSongDetail'],
    };
  },
  (dispatch: Dispatch<any>) => {
    return {
      getSongDetail: (id: number) => dispatch({ type: 'song/getSongDetail', payload: { id } }),
      getSongLrc: (id: number) => dispatch({ type: 'song/getSongLrc', payload: { id } }),
      getSongPlayList: (id: number) => dispatch({ type: 'song/getSongPlayList', payload: { id } }),
      getSimpleSongList: (id: number) =>
        dispatch({ type: 'song/getSimpleSongList', payload: { id } }),
      getSongComment: (id: number) => dispatch({ type: 'song/getSongComment', payload: { id } }),
      songPageChange: (commentPage: number) =>
        dispatch({ type: 'song/save', payload: { commentPage: commentPage - 1 } }),
      playSong: (song: Partial<PlayerSongType>) =>
        dispatch({ type: 'player/playSong', payload: song }),
      addSong: (song: Partial<PlayerSongType>) =>
        dispatch({ type: 'player/addSong', payload: song }),
    };
  },
)
class Song extends Component<Props, State> {
  state = {
    isHide: true,
  };

  componentDidMount() {
    const id = parseInt(this.props.location.query.id);
    this.props.getSongDetail(id);
    this.props.getSongLrc(id);
    this.props.getSongComment(id);
    this.props.getSongPlayList(id);
    this.props.getSimpleSongList(id);
  }

  triggerIsHide = () => {
    this.setState((state: State) => ({
      isHide: !state.isHide,
    }));
  };

  onPageChange = (page: number) => {
    this.props.songPageChange(page - 1);
    this.props.getSongComment(parseInt(this.props.location.query.id));
  };

  render() {
    const { onPageChange, triggerIsHide } = this;
    const { isHide } = this.state;
    const {
      hotCommentList,
      commentList,
      commentCount,
      playList,
      simpleList,
      songDetail,
      songLrc,
      lrcOwn,
      lrcTransUser,
      playSong,
      addSong,
      isDetailLoading,
      isCommentLoading,
    } = this.props;
    return (
      <div className={styles.song}>
        <div className={styles.songLeft}>
          <Skeleton active={true} paragraph={{ rows: 10 }} loading={isDetailLoading}>
            <SongInfo
              detail={songDetail}
              lrc={songLrc}
              lrcOwn={lrcOwn}
              lrcTransUser={lrcTransUser}
              isHide={isHide}
              handleTriggleLrc={triggerIsHide}
              handlePlaySong={playSong}
              handleAddSong={addSong}
            />
          </Skeleton>
          <Skeleton loading={isCommentLoading}>
            <CommentWrap
              className={styles.comment}
              hotCommentList={hotCommentList}
              commentList={commentList}
              commentCount={commentCount}
              onPageChange={onPageChange}
            />
          </Skeleton>
        </div>
        <div className={styles.songRight}>
          {playList.length > 0 && (
            <SiderPanel title="包含这首歌的歌单">
              {playList.map(item => {
                return (
                  <div key={item.id} className={styles.playlist}>
                    <Link className={styles.playlistPic} to={`/playlist?id=${item.id}`}>
                      <img src={item.coverImgUrl} alt={item.name} />
                    </Link>
                    <div className={styles.playlistInfo}>
                      <p className={styles.name}>
                        <Link to={`/playlist?id=${item.id}`} className={styles.nameLink}>
                          {item.name}
                        </Link>
                      </p>
                      <p className={styles.user}>
                        by{' '}
                        <Link
                          to={`/user/home?id=${item.creator.userId}`}
                          className={styles.userLink}
                        >
                          {item.creator.nickname}
                        </Link>
                      </p>
                    </div>
                  </div>
                );
              })}
            </SiderPanel>
          )}
          <SiderPanel title="相似歌曲">
            {simpleList.map(item => {
              return (
                <div key={item.id} className={styles.simpleList}>
                  <div className={styles.simpleListInfo}>
                    <p className={styles.sRow}>
                      <Link className={styles.sRowName} to={`song?id=${item.id}`}>
                        {item.name}
                      </Link>
                    </p>
                    <p className={styles.sRow}>
                      <ArtistsLink artists={item.artists} className={styles.sRowArt} />
                    </p>
                  </div>
                  <div className={styles.simpleListBtns}>
                    <i className={Classnames(styles.icon2, styles.icon2Play)} />
                    <i className={Classnames(styles.icon2, styles.icon2Add)} />
                  </div>
                </div>
              );
            })}
          </SiderPanel>
          <SiderPanelDownload />
        </div>
      </div>
    );
  }
}

export default Song;
