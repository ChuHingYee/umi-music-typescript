import React from 'react';
import { Link } from 'umi';
import { Skeleton } from 'antd';
import { formatTime } from '@/utils/utils';
import Classnames from 'classnames';
import { connect } from 'dva';
import { ArtistModel } from '../model';
import styles from './index.module.less';

type Store = {
  artist: ArtistModel;
  loading: DvaLoadingModel;
};

type State = {};

type PageStateProps = {
  songs: ArtistModel['songs'];
  location: LocationUmi;
  isLoading: boolean;
};

type PageDispatchProps = {};

type Props = PageStateProps & PageDispatchProps;

@connect(({ artist, loading }: Store) => {
  return {
    artistInfo: artist.artistInfo,
    songs: artist.songs,
    isLoading: loading.effects['artist/getArtistsInfo'],
  };
})
class ArtistLayout extends React.Component<Props, State> {
  state = {};

  componentDidMount() {}

  render() {
    const { songs, isLoading } = this.props;
    return (
      <div>
        <Skeleton loading={isLoading} paragraph={{ rows: 12 }}>
          <div className={styles.body}>
            {songs.map((item, index) => {
              return (
                <div className={styles.bodyRow} key={item.id}>
                  <div className={Classnames(styles.row1, styles.bodyRowTd)}>{index + 1}</div>
                  <div className={Classnames(styles.row2, styles.bodyRowTd)}>
                    <i className={Classnames(styles.bIcon, styles.bIconPlay)} />
                    <Link className={styles.tdName} to={`/song?id=${item.id}`}>
                      {item.name}
                    </Link>
                    {item.alia && <span className={styles.tdAlia}>-{item.alia}</span>}
                    {item.mv !== 0 && <i className={Classnames(styles.bIcon, styles.bIconMv)} />}
                  </div>
                  <div className={Classnames(styles.row3, styles.bodyRowTd)}>
                    {formatTime(item.dt)}
                  </div>
                  <div className={Classnames(styles.row4, styles.bodyRowTd, styles.bodyRowArt)}>
                    <Link className={styles.tdName} to={`/album?id=${item.al.id}`}>
                      {item.al.name}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </Skeleton>
      </div>
    );
  }
}

export default ArtistLayout;
