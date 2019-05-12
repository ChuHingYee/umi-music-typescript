import React from 'react';
import DetailHeader from './components/DetailHeader';
import ArtistsLink from '@/components/artistsLink';
import CommentWrap from '@/components/commentWrap';
import LeftNav from './components/Nav';
import DetailTable from './components/DetailTable';
import { Link } from 'umi';
import { Skeleton } from 'antd';
import { connect } from 'dva';
import { DiscoverToplistModel, TrackDetail } from './model';
import { PlayerSongType } from '@/models/player';
import { Dispatch } from 'redux';
import { formatTime } from '@/utils/utils';
import Classnames from 'classnames';

import styles from './index.module.less';

type Store = {
  discoverToplist: DiscoverToplistModel;
  loading: DvaLoadingModel;
};

type PageStateProps = {
  cloudList: DiscoverToplistModel['cloudList'];
  globalList: DiscoverToplistModel['globalList'];
  topListDetail: DiscoverToplistModel['topListDetail'];
  commentList: DiscoverToplistModel['commentList'];
  hotCommentList: DiscoverToplistModel['hotCommentList'];
  commentCount: DiscoverToplistModel['commentCount'];
  isDetailLoading: boolean;
  isListLoading: boolean;
  isCommentLoading: boolean;
  location: LocationUmi;
};

type PageDispatchProps = {
  getListDetail: (id: number) => void;
  getListComment: (id: number) => void;
  toplistPageChange: (count: number) => void;
  getList: () => void;
  playSong: (item: Partial<PlayerSongType>) => void;
  playList: (list: PlayerSongType[]) => void;
  addSongs: (list: PlayerSongType[]) => void;
};

type Props = PageStateProps & PageDispatchProps;

@connect(
  ({ discoverToplist, loading }: Store) => {
    return {
      cloudList: discoverToplist.cloudList,
      globalList: discoverToplist.globalList,
      topListDetail: discoverToplist.topListDetail,
      commentList: discoverToplist.commentList,
      hotCommentList: discoverToplist.hotCommentList,
      commentCount: discoverToplist.commentCount,
      isDetailLoading: loading.effects['discoverToplist/getDetail'],
      isListLoading: loading.effects['discoverToplist/getList'],
      isCommentLoading: loading.effects['discoverToplist/getComment'],
    };
  },
  (dispatch: Dispatch<any>) => {
    return {
      getList: () => dispatch({ type: 'discoverToplist/getList' }),
      getListDetail: (id: number) =>
        dispatch({ type: 'discoverToplist/getDetail', payload: { id } }),
      getListComment: (id: number) =>
        dispatch({ type: 'discoverToplist/getComment', payload: { id } }),
      toplistPageChange: (commentPage: number) =>
        dispatch({ type: 'discoverToplist/save', payload: { commentPage: commentPage - 1 } }),
      playSong: (item: PlayerSongType) => dispatch({ type: 'player/playSong', payload: item }),
      playList: (list: PlayerSongType[]) => dispatch({ type: 'player/playList', payload: list }),
      addSongs: (list: PlayerSongType[]) => dispatch({ type: 'player/addSongs', payload: list }),
    };
  },
)
class DiscoverTopList extends React.Component<Props, {}> {
  state = {};

  componentWillReceiveProps(nextProps: any) {
    if (nextProps.location.query.id !== this.props.location.query.id) {
      this.props.getListDetail(nextProps.location.query.id);
      this.props.getListComment(nextProps.location.query.id);
    }
  }

  async componentDidMount() {
    this.initPage();
  }

  initPage = async () => {
    const { location } = this.props;
    let currentId = parseInt(location.query.id) || '';
    if (currentId) {
      this.props.getList();
      this.props.getListDetail(currentId as number);
      this.props.getListComment(currentId as number);
    } else {
      await this.props.getList();
      this.props.getListDetail(this.props.cloudList[0].id);
      this.props.getListComment(this.props.cloudList[0].id);
    }
  };

  onPageChange = (page: number) => {
    this.props.toplistPageChange(page - 1);
    this.props.getListComment(this.props.cloudList[0].id);
  };

  //渲染详情列表
  detailTableRenderer = (list: TrackDetail[], count: number) => {
    const { tableHeaderRenderer, tableListRenderer } = this;
    return (
      <div className={styles.table}>
        <div className={styles.tableTitle}>
          <div className={styles.tableTitleInfo}>
            <span className={styles.infoName}>歌曲列表</span>
            <span className={styles.infoCount}>{list.length}首歌</span>
          </div>
          <span className={styles.tableTitleCount}>
            播放：<i className={styles.courtNo}>{count}</i>次
          </span>
        </div>
        <div className={styles.tableMain}>
          {tableHeaderRenderer()}
          {tableListRenderer(list)}
        </div>
      </div>
    );
  };

  //渲染详情列表头部
  tableHeaderRenderer = () => {
    return (
      <div className={styles.header}>
        <div className={Classnames(styles.headerRow, styles.row1)} />
        <div className={Classnames(styles.headerRow, styles.row2)}>
          <div className={styles.headerRowInner}>歌曲标题</div>
        </div>
        <div className={Classnames(styles.headerRow, styles.row3)}>
          <div className={styles.headerRowInner}>时长</div>
        </div>
        <div className={Classnames(styles.headerRow, styles.row4)}>
          <div className={styles.headerRowInner}>歌手</div>
        </div>
      </div>
    );
  };

  //渲染详情列表列表
  tableListRenderer = (tracks: TrackDetail[]) => {
    return (
      <div className={styles.body}>
        {tracks.map((track, index) => {
          return (
            <div className={styles.bodyRow} key={track.id}>
              <div className={Classnames(styles.row1, styles.bodyRowTd)}>{index + 1}</div>
              <div
                className={Classnames(styles.row2, styles.bodyRowTd, {
                  [styles.bDetail]: index < 3,
                })}
              >
                {index < 3 && (
                  <>
                    <img src={track.al.picUrl} className={styles.bDetailPic} />
                    <i
                      className={Classnames(styles.bIcon, {
                        [styles.bIconRed]: index === 0,
                        [styles.bIconPlay]: index !== 0,
                      })}
                      onClick={this.playSong.bind(this, track)}
                    />
                    <Link className={styles.tdName} to={`/song?id=${track.id}`}>
                      {track.name}
                    </Link>
                  </>
                )}
                {index > 3 && (
                  <>
                    <i className={Classnames(styles.bIcon, styles.bIconPlay)} />
                    <Link className={styles.tdName} to={`/song?id=${track.id}`}>
                      {track.name}
                    </Link>
                  </>
                )}
                {track.alia && <span className={styles.tdAlia}>-{track.alia}</span>}
                {track.mv !== 0 && <i className={Classnames(styles.bIcon, styles.bIconMv)} />}
              </div>
              <div className={Classnames(styles.row3, styles.bodyRowTd)}>
                {formatTime(track.dt)}
              </div>
              <div className={Classnames(styles.row4, styles.bodyRowTd, styles.bodyRowArt)}>
                <ArtistsLink artists={track.ar} className={styles.artItem} />
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  playSong = (item: TrackDetail) => {
    const { id, name, ar, mv, al, dt } = item;
    this.props.playSong({
      id,
      name,
      ar,
      mv,
      al,
      dt,
    });
  };

  playList = (list: TrackDetail[]) => {
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

  addSongs = (list: TrackDetail[]) => {
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
    const { detailTableRenderer, onPageChange } = this;
    const {
      cloudList,
      globalList,
      hotCommentList,
      commentList,
      commentCount,
      location,
      topListDetail,
      isDetailLoading,
      isListLoading,
      isCommentLoading,
      playSong,
    } = this.props;
    const { tracks, playCount } = topListDetail;
    const current = (location as any).query.id - 0 || '';
    return (
      <div className={styles.toplist}>
        <div className={styles.toplistLeft}>
          <Skeleton paragraph={{ rows: 6 }} active={true} title={true} loading={isListLoading}>
            <LeftNav title="云音乐特色榜" list={cloudList} current={current} />
          </Skeleton>
          <Skeleton paragraph={{ rows: 6 }} active={true} title={true} loading={isListLoading}>
            <LeftNav title="全球媒体榜" list={globalList} current={current} />
          </Skeleton>
        </div>
        <div className={styles.toplistRight}>
          <Skeleton
            avatar={{ size: 'large' }}
            paragraph={{ rows: 15 }}
            active={true}
            title={true}
            loading={isDetailLoading}
          >
            <DetailHeader
              detail={topListDetail}
              handleAdd={this.addSongs}
              handlePlay={this.playList}
            />
            <div className={styles.table}>
              <div className={styles.tableTitle}>
                <div className={styles.tableTitleInfo}>
                  <span className={styles.infoName}>歌曲列表</span>
                  <span className={styles.infoCount}>{tracks.length}首歌</span>
                </div>
                <span className={styles.tableTitleCount}>
                  播放：<i className={styles.courtNo}>{playCount}</i>次
                </span>
              </div>
              <div className={styles.tableMain}>
                <DetailTable list={tracks} playSong={playSong} />
              </div>
            </div>
            <Skeleton
              avatar={{ size: 'large' }}
              paragraph={{ rows: 8 }}
              active={true}
              title={true}
              loading={isCommentLoading}
            >
              <CommentWrap
                hotCommentList={hotCommentList}
                commentList={commentList}
                commentCount={commentCount}
                onPageChange={onPageChange}
              />
            </Skeleton>
          </Skeleton>
        </div>
      </div>
    );
  }
}

export default DiscoverTopList;
