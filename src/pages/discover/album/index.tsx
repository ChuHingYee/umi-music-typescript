import React from 'react';
import { connect } from 'dva';
import { Pagination, Spin } from 'antd';
import AlbumPanel from '@/components/albumPanel';
import { DiscoverAlbumModel } from './model';
import styles from './index.module.less';

type PageStateProps = {
  hotList: DiscoverAlbumModel['hotList'];
  albumsList: DiscoverAlbumModel['albumsList'];
  albumsCount: DiscoverAlbumModel['albumsCount'];
  isAlbumListLoading: boolean;
};

type PageDispatchProps = {
  getNewAblum: () => void;
  getList: () => void;
  albumPageChange: (page: number) => void;
  playAlbum: (id: number) => void;
};

type Props = PageStateProps & PageDispatchProps;

type store = {
  discoverAlbum: DiscoverAlbumModel;
  loading: any;
};

@connect(
  ({ discoverAlbum, loading }: store) => ({
    hotList: discoverAlbum.hotList,
    albumsList: discoverAlbum.albumsList,
    albumsCount: discoverAlbum.albumsCount,
    isAlbumListLoading: loading.effects['discoverAlbum/getList'],
    isHotListLoading: loading.effects['discoverAlbum/hotList'],
  }),
  (dispatch: any) => ({
    getNewAblum() {
      dispatch({
        type: 'discoverAlbum/getNewAblum',
      });
    },
    getList() {
      dispatch({
        type: 'discoverAlbum/getList',
      });
    },
    albumPageChange(page: number) {
      dispatch({
        type: 'discoverAlbum/save',
        payload: {
          albumsPage: page,
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
  }),
)
class DiscoverAlbum extends React.Component<Props, {}> {
  state = {};

  componentDidMount() {
    this.props.getNewAblum();
    this.props.getList();
  }

  onPageChange = (page: number) => {
    this.props.albumPageChange(page - 1);
    this.props.getList();
  };

  renderNew = (list: DiscoverAlbumModel['hotList'], handlePlay: Props['playAlbum']) => {
    return (
      <div className={styles.albumWrap}>
        <div className={styles.albumWrapHeader}>热门新碟</div>
        <div className={styles.albumWrapList}>
          {list.map(item => {
            return (
              <AlbumPanel
                onPlay={handlePlay}
                id={item.id}
                key={item.id}
                name={item.name}
                path={`/album?id=${item.id}`}
                picUrl={item.picUrl}
                size="big"
                artists={item.artists}
                className={styles.albumWrapListItem}
              />
            );
          })}
        </div>
      </div>
    );
  };

  renderList = (
    list: DiscoverAlbumModel['hotList'],
    total: number,
    loading: boolean,
    handlePlay: Props['playAlbum'],
  ) => {
    return (
      <div className={styles.albumWrap}>
        <div className={styles.albumWrapHeader}>全部新碟</div>
        <Spin spinning={loading}>
          <div className={styles.albumWrapList}>
            {list.map(item => {
              return (
                <AlbumPanel
                  onPlay={handlePlay}
                  id={item.id}
                  key={item.id}
                  name={item.name}
                  path={`/album?id=${item.id}`}
                  picUrl={item.picUrl}
                  size="big"
                  artists={item.artists}
                  className={styles.albumWrapListItem}
                />
              );
            })}
          </div>
        </Spin>
        <Pagination
          style={{ textAlign: 'center' }}
          total={total}
          onChange={this.onPageChange}
          defaultPageSize={20}
        />
      </div>
    );
  };

  render() {
    const { hotList, albumsList, albumsCount, isAlbumListLoading, playAlbum } = this.props;
    return (
      <div className={styles.album}>
        {this.renderNew(hotList, playAlbum)}
        {this.renderList(albumsList, albumsCount, isAlbumListLoading, playAlbum)}
      </div>
    );
  }
}

export default DiscoverAlbum;
