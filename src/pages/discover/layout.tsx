import React from 'react';
import Link from 'umi/link';
import DiscoverNav from '../../components/discoverNav';
import withRouter from 'umi/withRouter';
import styles from './layout.less';

type tab = {
  label: string;
  path: string;
};

interface DiscoverLayoutState {
  tabsList: tab[];
}

interface DiscoverLayoutProp {
  children?: React.ReactNode;
  location: Location;
}

class DiscoverLayout extends React.Component<DiscoverLayoutProp, DiscoverLayoutState> {
  state = {
    tabsList: [
      {
        label: '推荐',
        path: '/discover',
      },
      {
        label: '排行榜',
        path: '/discover/toplist',
      },
      {
        label: '歌单',
        path: '/discover/playlist',
      },
      {
        label: '主播电台',
        path: '/discover/djradio',
      },
      {
        label: '歌手',
        path: '/discover/artist',
      },
      {
        label: '新碟上架',
        path: '/discover/album',
      },
    ],
  };

  renderHeaderLink(pathname: string): React.ReactNode {
    const { tabsList } = this.state;
    return tabsList.map((item: tab) => {
      return (
        <li key={item.path}>
          <DiscoverNav path={item.path} current={pathname} label={item.label} />
        </li>
      );
    });
  }

  render() {
    const { children, location } = this.props;
    const { pathname } = location;
    return (
      <div className={styles.home}>
        <div className={styles.homeHeader}>
          <ul className={styles.homeHeaderNav}>{this.renderHeaderLink(pathname)}</ul>
        </div>
        {children}
      </div>
    );
  }
}

export default DiscoverLayout;
