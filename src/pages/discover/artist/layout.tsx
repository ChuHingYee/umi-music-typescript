import React from 'react';
import { Link } from 'umi';
import Classnames from 'classnames';
import styles from './layout.module.less';

type RenderNavProps = {
  title: string;
  list: {
    label: string;
    query: string;
  }[];
};

type State = {
  rNavList: RenderNavProps;
  cnNavList: RenderNavProps;
  euavList: RenderNavProps;
  jpNavList: RenderNavProps;
  krNavList: RenderNavProps;
  otNavList: RenderNavProps;
};

type Props = {
  children?: React.ReactNode;
  location: Location;
};

class DiscoverArtistLayout extends React.Component<Props, State> {
  state = {
    rNavList: {
      title: '推荐',
      list: [
        {
          label: '推荐歌手',
          query: '/',
        },
        {
          label: '入驻歌手',
          query: '/signed/',
        },
      ],
    },
    cnNavList: {
      title: '华语',
      list: [
        {
          label: '华语男歌手',
          query: '/cat?id=1001',
        },
        {
          label: '华语女歌手',
          query: '/cat?id=1002',
        },
        {
          label: '华语组合/乐队',
          query: '/cat?id=1003',
        },
      ],
    },
    euavList: {
      title: '欧美',
      list: [
        {
          label: '欧美男歌手',
          query: '/cat?id=2001',
        },
        {
          label: '欧美女歌手',
          query: '/cat?id=2002',
        },
        {
          label: '欧美组合/乐队',
          query: '/cat?id=2003',
        },
      ],
    },
    jpNavList: {
      title: '日本',
      list: [
        {
          label: '日本男歌手',
          query: '/cat?id=6001',
        },
        {
          label: '日本女歌手',
          query: '/cat?id=6002',
        },
        {
          label: '日本组合/乐队',
          query: '/cat?id=6003',
        },
      ],
    },
    krNavList: {
      title: '韩国',
      list: [
        {
          label: '韩国男歌手',
          query: '/cat?id=7001',
        },
        {
          label: '韩国女歌手',
          query: '/cat?id=7002',
        },
        {
          label: '韩国组合/乐队',
          query: '/cat?id=7003',
        },
      ],
    },
    otNavList: {
      title: '其他',
      list: [
        {
          label: '其他男歌手',
          query: '/cat?id=4001',
        },
        {
          label: '其他女歌手',
          query: '/cat?id=4002',
        },
        {
          label: '其他组合/乐队',
          query: '/cat?id=4003',
        },
      ],
    },
  };

  renderNav = ({ title, list }: RenderNavProps) => {
    return (
      <div className={styles.nav}>
        <h3 className={styles.navTitle}>{title}</h3>
        <div className={styles.navList}>
          {list.map(item => {
            return (
              <Link
                to={`/discover/artist${item.query}`}
                key={item.query}
                className={styles.navListItem}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    );
  };

  render() {
    const { renderNav } = this;
    const { children } = this.props;
    const { rNavList, cnNavList, euavList, jpNavList, krNavList, otNavList } = this.state;
    return (
      <div className={styles.page}>
        <div className={styles.pageLeft}>
          {renderNav(rNavList)}
          {renderNav(cnNavList)}
          {renderNav(euavList)}
          {renderNav(jpNavList)}
          {renderNav(krNavList)}
          {renderNav(otNavList)}
        </div>
        <div className={styles.pageRight}>{children}</div>
      </div>
    );
  }
}

export default DiscoverArtistLayout;
