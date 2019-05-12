import React from 'react';
import { Link } from 'umi';
import { connect } from 'dva';
import { Skeleton } from 'antd';
import ArtistHeader from '@/components/artistHeader';
import ArtistPanel from '@/components/artistPanel';
import { Dispatch } from 'redux';
import { DiscoverArtistsModel } from './model';
import styles from './index.module.less';

type Store = {
  discoverArtists: DiscoverArtistsModel;
  loading: DvaLoadingModel;
};

type State = {};

type PageStateProps = {
  signArtists: DiscoverArtistsModel['signArtists'];
  hotArtists: DiscoverArtistsModel['hotArtists'];
  isHotLoading: boolean;
  isSignLoading: boolean;
};

type PageDispatchProps = {
  getSignArtists: () => void;
  getHotArtists: () => void;
};

type Props = PageStateProps & PageDispatchProps;

@connect(
  ({ discoverArtists, loading }: Store) => {
    return {
      signArtists: discoverArtists.signArtists,
      hotArtists: discoverArtists.hotArtists,
      isHotLoading: loading.effects['discoverArtists/getHotArtists'],
      isSignLoading: loading.effects['discoverArtists/getSignArtists'],
    };
  },
  (dispatch: Dispatch<any>) => {
    return {
      getSignArtists: () => dispatch({ type: 'discoverArtists/getSignArtists' }),
      getHotArtists: () => dispatch({ type: 'discoverArtists/getHotArtists' }),
    };
  },
)
class DiscoverArtist extends React.Component<Props, State> {
  static defaultProps: Partial<Props> = {
    signArtists: [],
    hotArtists: [],
  };

  state = {};

  componentDidMount() {
    this.props.getSignArtists();
    this.props.getHotArtists();
  }

  render() {
    const { signArtists, hotArtists, isHotLoading, isSignLoading } = this.props;
    const topHotArtists = hotArtists.slice(0, 10);
    const restHotArtists = hotArtists.slice(10, hotArtists.length);
    return (
      <div className={styles.artist}>
        <ArtistHeader title="入驻歌手">
          <Link className={styles.artistLink} to="/discover/artist/signed/">
            更多>
          </Link>
        </ArtistHeader>
        <Skeleton paragraph={{ rows: 8 }} loading={isSignLoading}>
          <div className={styles.artistPanel}>
            {signArtists.map(item => {
              return (
                <ArtistPanel
                  pic={item.img1v1Url}
                  {...item}
                  key={item.id}
                  className={styles.artistPanelItem}
                />
              );
            })}
          </div>
        </Skeleton>
        <ArtistHeader title="热门歌手" />
        <Skeleton paragraph={{ rows: 8 }} loading={isHotLoading}>
          <div className={styles.artistPanel}>
            {topHotArtists.map(item => {
              return (
                <ArtistPanel
                  pic={item.img1v1Url}
                  {...item}
                  key={item.id}
                  className={styles.artistPanelItem}
                />
              );
            })}
            {restHotArtists.map(art => {
              return (
                <Link to={`/artist?id=${art.id}`} key={art.id} className={styles.artistPanelLink}>
                  <span className={styles.name}>{art.name}</span>
                  <span className={styles.icon} />
                </Link>
              );
            })}
          </div>
        </Skeleton>
      </div>
    );
  }
}

export default DiscoverArtist;
