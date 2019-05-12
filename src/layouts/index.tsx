import React from 'react';
import Link from 'umi/link';
import { Menu, Dropdown, Icon } from 'antd';
import HeaderLink from '@/components/headerLink';
import Footer from '@/components/footer';
import Player from '@/components/player';
import withRouter from 'umi/withRouter';
import { connect } from 'dva';
import { PlayerModel } from '@/models/player';
import '@/styles/reset.less';
import styles from './index.less';

type Store = {
  player: PlayerModel;
};

type tab = {
  label: string;
  path: string;
};

type State = {
  tabsList: tab[];
};

type PageStateProps = {
  children?: React.ReactNode;
  location: Location;
};

type PageDispatchProps = {
  getSongUrl: () => void;
};

type Props = PageStateProps & PageDispatchProps;

class BasicLayout extends React.Component<Props, State> {
  state = {
    tabsList: [
      {
        label: '发现音乐',
        path: '/discover',
      },
      {
        label: '我的音乐',
        path: '/my',
      },
      {
        label: '朋友',
        path: '/friend',
      },
      {
        label: '商城',
        path: '/store',
      },
      {
        label: '音乐人',
        path: '/musician',
      },
      {
        label: '下载客户端',
        path: '/download',
      },
    ],
  };

  componentDidUpdate(prevProps: any) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  componentDidMount() {
  }

  headerLinkRenderer(pathname: string): React.ReactNode {
    const { tabsList } = this.state;
    return tabsList.map((item: tab) => {
      return <HeaderLink key={item.path} path={item.path} current={pathname} label={item.label} />;
    });
  }

  render() {
    const { children, location } = this.props;
    const { pathname } = location;
    const _pathname = `/${pathname.split('/')[1]}`;
    const menu = (
      <Menu>
        <Menu.Item className={styles.loginItem}>
          <span>手机号登陆</span>
        </Menu.Item>
        <Menu.Item className={styles.loginItem}>
          <span>微信登陆</span>
        </Menu.Item>
        <Menu.Item className={styles.loginItem}>
          <span>QQ登陆</span>
        </Menu.Item>
        <Menu.Item className={styles.loginItem}>
          <span>新浪微博登陆</span>
        </Menu.Item>
        <Menu.Item className={styles.loginItem}>
          <span>网易邮箱账号登陆</span>
        </Menu.Item>
      </Menu>
    );
    return (
      <div>
        <header className={styles.header}>
          <div className={styles.headerContainer}>
            <div className={styles.headerContainerLeft}>
              <h1 className={styles.logo}>
                <Link to="/" className={styles.logoLink}>
                  网易云音乐
                </Link>
              </h1>
              {this.headerLinkRenderer(_pathname)}
            </div>
            <div className={styles.headerContainerRight}>
              <div className={styles.search}>
                <input type="text" className={styles.searchInput} />
              </div>
              <div className={styles.creater}>创造者中心</div>
              <Dropdown overlay={menu} trigger={['click', 'hover']}>
                <a className={styles.login} href="#">
                  登录 <Icon type="down" />
                </a>
              </Dropdown>
              ,
            </div>
          </div>
        </header>
        {children}
        <Footer />
        <Player />
      </div>
    );
  }
}

export default withRouter(connect()(BasicLayout));
