import React from 'react';
import { Link, withRouter } from 'umi';
import ArtistInfo from '@/components/artistInfo';
import SiderPanel from '@/components/siderPanel';
import SiderPanelDownload from '@/components/siderPanelDownload';
import { Skeleton } from 'antd';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import { ArtistModel } from './model';
import styles from './layout.module.less';

type Store = {
  artist: ArtistModel;
  loading: DvaLoadingModel;
};

type PageStateProps = {
  artists: ArtistModel['artists'];
  artistInfo: ArtistModel['artistInfo'];
  id: ArtistModel['id'];
  isHotLoading: boolean;
  isInfoLoading: boolean;
  location: LocationUmi;
};

type PageDispatchProps = {
  getHotArtists: () => void;
  setArtistId: (id: number) => void;
  getArtistsInfo: () => void;
};

type Props = PageStateProps & PageDispatchProps;

class ArtistLayout extends React.Component<Props, {}> {
  componentDidMount() {
    const id = parseInt(this.props.location.query.id);
    this.props.setArtistId(id);
    this.props.getArtistsInfo();
    this.props.getHotArtists();
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.location.query.id !== this.props.location.query.id) {
      const id = parseInt(nextProps.location.query.id);
      this.props.setArtistId(id);
      this.props.getArtistsInfo();
    }
  }

  render() {
    const { children, artists, isHotLoading, isInfoLoading, artistInfo, id, location } = this.props;
    const { pathname } = location;
    return (
      <div className={styles.page}>
        <div className={styles.pageLeft}>
          <Skeleton loading={isInfoLoading}>
            <ArtistInfo {...artistInfo} current={pathname} id={id} />
          </Skeleton>
          {children}
        </div>
        <div className={styles.pageRight}>
          <SiderPanel title="热门歌手">
            <Skeleton title={false} loading={isHotLoading}>
              <ul className={styles.artists}>
                {artists.map(item => {
                  return (
                    <li key={item.id} className={styles.artistsItem}>
                      <Link to={`/artist?id=${item.id}`} className={styles.artistsItemPic}>
                        <img src={item.pic} title={item.name} />
                      </Link>
                      <Link to={`/artist?id=${item.id}`} className={styles.artistsItemName}>
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </Skeleton>
          </SiderPanel>
          <SiderPanelDownload />
        </div>
      </div>
    );
  }
}

export default withRouter(
  connect(
    ({ artist, loading }: Store) => {
      return {
        id: artist.id,
        artists: artist.artists,
        artistInfo: artist.artistInfo,
        isHotLoading: loading.effects['artist/getHotArtists'],
        isInfoLoading: loading.effects['artist/getArtistsInfo'],
      };
    },
    (dispatch: Dispatch<any>) => {
      return {
        getArtistsInfo: () => dispatch({ type: 'artist/getArtistsInfo' }),
        getHotArtists: () => dispatch({ type: 'artist/getHotArtists' }),
        setArtistId: (id: number) => dispatch({ type: 'artist/save', payload: { id } }),
      };
    },
  )(ArtistLayout),
);
