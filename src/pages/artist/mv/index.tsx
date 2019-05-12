import React from 'react';
import { Link } from 'umi';
import { Skeleton } from 'antd';
import { Pagination, Spin, Empty } from 'antd';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import { ArtistMVModel } from './model';
import { ArtistModel } from '../model';
import styles from './index.module.less';

type Store = {
  artistMV: ArtistMVModel;
  artist: ArtistModel;
  loading: DvaLoadingModel;
};

type State = {};

type PageStateProps = {
  mvs: ArtistMVModel['mvs'];
  mvSize: ArtistModel['mvSize'];
  id: ArtistModel['id'];
  isLoading: boolean;
};

type PageDispatchProps = {
  getArtistsMV: () => void;
  albumPageChange: (num: number) => void;
};

type Props = PageStateProps & PageDispatchProps;

@connect(
  ({ loading, artist, artistMV }: Store) => {
    return {
      mvs: artistMV.mvs,
      mvSize: artist.mvSize,
      isLoading: loading.effects['artistMV/getArtistsMV'],
      id: artist.id,
    };
  },
  (dispatch: Dispatch<any>) => {
    return {
      getArtistsMV: (id: number) => dispatch({ type: 'artistMV/getArtistsMV', payload: { id } }),
      albumPageChange: (mvPage: number) => {
        dispatch({ type: 'artistMV/save', payload: { mvPage } });
      },
    };
  },
)
class ArtistMv extends React.Component<Props, State> {
  state = {};

  componentDidMount() {
    this.props.getArtistsMV();
  }

  onPageChange = (page: number) => {
    this.props.albumPageChange(page - 1);
    this.props.getArtistsMV();
  };

  render() {
    const { mvs, mvSize, isLoading } = this.props;
    return (
      <div>
        <Skeleton loading={isLoading} paragraph={{ rows: 10 }}>
          {mvs.length > 0 && (
            <>
              <Spin spinning={isLoading}>
                <div className={styles.body}>
                  {mvs.map(item => {
                    return (
                      <div key={item.id} className={styles.item}>
                        <div className={styles.itemPic}>
                          <img src={item.picUrl} title={item.name} />
                          <span className={styles.itemPicMask} />
                          <Link to={`/mv?id=${item.id}`} className={styles.itemPicIcon} />
                        </div>
                        <Link to={`/mv?id=${item.id}`} className={styles.itemName}>
                          {item.name}
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </Spin>
            </>
          )}
          {mvs.length === 0 && <Empty description="暂无数据" />}
        </Skeleton>
        {mvSize > 0 && (
          <Pagination
            style={{ textAlign: 'center' }}
            defaultPageSize={12}
            total={mvSize}
            onChange={this.onPageChange}
          />
        )}
      </div>
    );
  }
}

export default ArtistMv;
