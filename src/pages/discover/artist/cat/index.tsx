import React from 'react';
import { connect } from 'dva';
import { Link } from 'umi';
import ArtistHeader from '@/components/artistHeader';
import ArtistPanel from '@/components/artistPanel';
import { Skeleton } from 'antd';
import Classnames from 'classnames';
import { Dispatch } from 'redux';
import { DiscoverArtistCatModel } from './model';
import styles from './index.module.less';

type Store = {
  artistsCat: DiscoverArtistCatModel;
  loading: DvaLoadingModel;
};

type State = {
  title: string;
  tabs: string[];
};

type PageStateProps = {
  artists: DiscoverArtistCatModel['artists'];
  currentTab: DiscoverArtistCatModel['tab'];
  currentCat: DiscoverArtistCatModel['cat'];
  isLoading: boolean;
  location: LocationUmi;
};

type PageDispatchProps = {
  getArtists: () => void;
  triggerTab: (tab: string) => void;
  triggerCat: (cat: number) => void;
};

type Props = PageStateProps & PageDispatchProps;

const titleMap: { [props: string]: string } = {
  '1001': '华语男歌手',
  '1002': '华语女歌手',
  '1003': '华语组合/乐队',
  '2001': '欧美男歌手',
  '2002': '欧美女歌手',
  '2003': '欧美组合/乐队',
  '6001': '日本男歌手',
  '6002': '日本女歌手',
  '6003': '日本组合/乐队',
  '7001': '韩国男歌手',
  '7002': '韩国女歌手',
  '7003': '韩国组合/乐队',
  '4001': '其他男歌手',
  '4002': '其他女歌手',
  '4003': '其他组合/乐队',
};

@connect(
  ({ artistsCat, loading }: Store) => {
    return {
      currentCat: artistsCat.cat,
      artists: artistsCat.artists,
      currentTab: artistsCat.tab,
      isLoading: loading.effects['artistsCat/getArtists'],
    };
  },
  (dispatch: Dispatch<any>) => {
    return {
      getArtists: () => dispatch({ type: 'artistsCat/getArtists' }),
      triggerTab: (tab: string) => dispatch({ type: 'artistsCat/save', payload: { tab } }),
      triggerCat: (cat: number) => dispatch({ type: 'artistsCat/save', payload: { cat } }),
    };
  },
)
class DiscoverArtistCat extends React.Component<Props, State> {
  state = {
    title: '',
    tabs: [
      'a',
      'b',
      'c',
      'd',
      'e',
      'f',
      'g',
      'h',
      'i',
      'j',
      'k',
      'l',
      'm',
      'n',
      'o',
      'p',
      'q',
      'r',
      's',
      't',
      'u',
      'v',
      'w',
      'x',
      'y',
      'z',
    ],
  };

  componentWillReceiveProps(nextProps: any) {
    const id = parseInt(nextProps.location.query.id);
    if (id !== this.props.currentCat) {
      this.props.triggerCat(id);
      this.triggerTab('0');
      this.setState({
        title: titleMap[id],
      });
    }
  }

  componentDidMount() {
    const id = parseInt(this.props.location.query.id);
    this.matchTitle(id);
    this.props.triggerCat(id);
    this.props.getArtists();
  }

  componentWillUnmount() {}

  matchTitle = (id: number) => {
    this.setState({
      title: titleMap[id],
    });
  };

  triggerTab = (tab: string) => {
    this.props.triggerTab(tab);
    this.props.getArtists();
  };

  render() {
    const { artists, currentTab, isLoading } = this.props;
    const { title, tabs } = this.state;
    const topArtists = artists.slice(0, 10);
    const restArtists = artists.slice(10, artists.length);
    return (
      <div className={styles.artist}>
        <ArtistHeader title={title} />
        <ul className={styles.artistNav}>
          <li
            className={Classnames(styles.artistNavItem, styles.artistNavCn, {
              [styles.artistNavActived]: currentTab === '0',
            })}
            onClick={this.triggerTab.bind(this, '0')}
          >
            热门
          </li>
          {tabs.map(tab => {
            return (
              <li
                key={tab}
                className={Classnames(styles.artistNavItem, styles.artistNavEn, {
                  [styles.artistNavActived]: currentTab === tab,
                })}
                onClick={this.triggerTab.bind(this, tab)}
              >
                {tab}
              </li>
            );
          })}
        </ul>
        <Skeleton loading={isLoading} paragraph={{ rows: 10 }} active={true}>
          <div className={styles.artistPanel}>
            {topArtists.map(item => {
              return (
                <ArtistPanel
                  pic={item.img1v1Url}
                  {...item}
                  key={item.id}
                  className={styles.artistPanelItem}
                />
              );
            })}
            {restArtists.map(art => {
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

export default DiscoverArtistCat;
