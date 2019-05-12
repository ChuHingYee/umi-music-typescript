import React from 'react';
import { Link } from 'umi';
import { Skeleton } from 'antd';
import { formatDay } from '@/utils/utils';
import { Pagination, Empty } from 'antd';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import { ArtistAlbumState } from './model';
import { ArtistModel } from '../model';
import styles from './index.module.less';

type Store = {
  artistAlbum: ArtistAlbumState;
  artist: ArtistModel;
  loading: DvaLoadingModel;
};

type State = {};

type PageStateProps = {
  albums: ArtistAlbumState['albums'];
  albumCount: ArtistModel['albumSize'];
  id: ArtistModel['id'];
  isAlbumLoading: boolean;
  location: LocationUmi;
};

type PageDispatchProps = {
  getArtistsAlbum: (id: number) => void;
  albumPageChange: (num: number) => void;
};

type Props = PageStateProps & PageDispatchProps;

@connect(
  ({ artist, artistAlbum, loading }: Store) => {
    return {
      id: artist.id,
      albums: artistAlbum.albums,
      albumCount: artist.albumSize,
      isAlbumLoading: loading.effects['artistAlbum/getArtistsAlbum'],
    };
  },
  (dispatch: Dispatch<any>) => {
    return {
      getArtistsAlbum: (id: number) =>
        dispatch({ type: 'artistAlbum/getArtistsAlbum', payload: { id } }),
      albumPageChange: (albumPage: number) => {
        dispatch({ type: 'artistAlbum/save', payload: { albumPage } });
      },
    };
  },
)
class ArtistAlbum extends React.Component<Props, State> {
  state = {};

  componentDidMount() {
    const { id } = this.props;
    this.props.getArtistsAlbum(id);
  }

  onPageChange = (page: number) => {
    this.props.albumPageChange(page - 1);
    this.props.getArtistsAlbum(this.props.id);
  };

  render() {
    const { albums, albumCount, isAlbumLoading } = this.props;
    return (
      <div>
        <Skeleton loading={isAlbumLoading} paragraph={{ rows: 10 }}>
          {albums.length > 0 && (
            <div className={styles.body}>
              {albums.map(item => {
                return (
                  <div key={item.id} className={styles.item}>
                    <div className={styles.itemPic}>
                      <img src={item.picUrl} title={item.name} />
                      <span className={styles.itemPicMask} />
                    </div>
                    <Link to={`/album?id=${item.id}`} className={styles.itemName}>
                      {item.name}
                    </Link>
                    <p className={styles.itemTime}>{formatDay(item.publishTime)}</p>
                  </div>
                );
              })}
            </div>
          )}
          {albums.length === 0 && <Empty description="暂无数据" />}
        </Skeleton>
        {albumCount > 0 && (
          <Pagination
            style={{ textAlign: 'center' }}
            defaultPageSize={12}
            total={albumCount}
            onChange={this.onPageChange}
          />
        )}
      </div>
    );
  }
}

export default ArtistAlbum;
