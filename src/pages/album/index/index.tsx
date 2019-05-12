import React, { Component } from 'react';
import ArtistsLink from '@/components/artistsLink';
import PlayBtn from '@/components/playButton';
import CommonBtn from '@/components/commonButton';
import CommentWrap from '@/components/commentWrap';
import SongsList from '@/components/songsList';
import SiderPanelDownload from '@/components/siderPanelDownload';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import { Skeleton } from 'antd';
import { AlbumDetailState } from './model';
import { formatDay } from '@/utils/utils';
import Classnames from 'classnames';
import styles from './index.module.less';

type Store = {
  album: AlbumDetailState;
  loading: DvaLoadingModel;
};

type PageStateProps = {
  albumDetail: AlbumDetailState['detail'];
  albumSongs: AlbumDetailState['songs'];
  commentList: AlbumDetailState['commentList'];
  hotCommentList: AlbumDetailState['hotCommentList'];
  commentCount: AlbumDetailState['commentCount'];
  isDetailLoading: boolean;
  isCommentLoading: boolean;
  location: LocationUmi;
};

type PageDispatchProps = {
  getAlbumDetail: (id: number) => void;
  getAlbumComment: (id: number) => void;
  albumPageChange: (count: number) => void;
};

type Props = PageStateProps & PageDispatchProps;

@connect(
  ({ album, loading }: Store) => {
    return {
      albumDetail: album.detail,
      albumSongs: album.songs,
      commentList: album.commentList,
      hotCommentList: album.hotCommentList,
      commentCount: album.commentCount,
      isDetailLoading: loading.effects['album/getAlbumDetail'],
      isCommentLoading: loading.effects['album/getAlbumComment'],
    };
  },
  (dispatch: Dispatch<any>) => {
    return {
      getAlbumDetail: (id: number) => dispatch({ type: 'album/getAlbumDetail', payload: { id } }),
      getAlbumComment: (id: number) => dispatch({ type: 'album/getAlbumComment', payload: { id } }),
      albumPageChange: (commentPage: number) =>
        dispatch({ type: 'album/save', payload: { commentPage: commentPage - 1 } }),
    };
  },
)
class Album extends Component<Props, {}> {
  state = {
    isHide: true,
  };

  componentDidMount() {
    const id = parseInt(this.props.location.query.id);
    this.props.getAlbumDetail(id);
    this.props.getAlbumComment(id);
  }

  onPageChange = (page: number) => {
    this.props.albumPageChange(page - 1);
    this.props.getAlbumComment(parseInt(this.props.location.query.id));
  };

  renderAlbumInfo = (detail: AlbumDetailState['detail'], loading: boolean) => {
    const publishTime = formatDay(detail.publishTime);
    return (
      <Skeleton avatar={{ size: 'large' }} paragraph={{ rows: 8 }} active={true} loading={loading}>
        <div className={styles.info}>
          <div className={styles.infoTop}>
            <div className={styles.infoTopLeft}>
              <div className={styles.infoTopLeftCover}>
                <img className={styles.pic} src={detail.picUrl} alt={detail.name} />
                <span className={styles.mask} />
              </div>
            </div>
            <div className={styles.infoTopRight}>
              <div className={styles.name}>
                <i className={Classnames(styles.icon, styles.iconLabel)} />
                <span>{detail.name}</span>
              </div>
              <p className={styles.row}>
                歌手: <ArtistsLink artists={detail.artists} className={styles.rowLink} />
              </p>
              <p className={styles.row}>发行时间：{publishTime}</p>
              <p className={styles.row}>发行公司：{detail.company}</p>
              <div className={styles.btns}>
                <PlayBtn className={styles.btnsItem} />
                <CommonBtn type="favour" label="收藏" className={styles.btnsItem} />
                <CommonBtn type="share" label="分享" className={styles.btnsItem} />
                <CommonBtn type="download" label="下载" className={styles.btnsItem} />
                <CommonBtn type="comment" count={0} className={styles.btnsItem} />
              </div>
            </div>
          </div>
          <div className={styles.infoBottom}>
            <h4>专辑介绍</h4>
            <div className={styles.infoBottomContainer}>
              {(detail.description as string[]).map((desc, index) => {
                return (
                  <p key={index} className={styles.bRow}>
                    {desc}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      </Skeleton>
    );
  };

  render() {
    const { renderAlbumInfo, onPageChange } = this;
    const {
      hotCommentList,
      commentList,
      commentCount,
      albumSongs,
      albumDetail,
      isDetailLoading,
    } = this.props;
    return (
      <div className={styles.song}>
        <div className={styles.songLeft}>
          {renderAlbumInfo(albumDetail, isDetailLoading)}
          <SongsList list={albumSongs} className={styles.list} />
          <CommentWrap
            className={styles.comment}
            hotCommentList={hotCommentList}
            commentList={commentList}
            commentCount={commentCount}
            onPageChange={onPageChange}
          />
        </div>
        <div className={styles.songRight}>
          <SiderPanelDownload />
        </div>
      </div>
    );
  }
}

export default Album;
