import React from 'react';
import { connect } from 'dva';
import { Pagination, Spin } from 'antd';
import { Link } from 'umi';
import { Dispatch } from 'redux';
import Classnames from 'classnames';
import { getFormatCount } from '@/utils/utils';
import { PlaylistState } from './model';
import { TabType } from './components/TabsItem';
import PlaylistSheetPanel from '@/components/playlistSheetPanel';
import Tabs from './components/Tabs';
import styles from './index.module.less';

type State = {
  tabs: TabType[];
  showTabs: boolean;
};

type Store = {
  playlist: PlaylistState;
  loading: any;
};

type PageStateProps = {
  playlist: PlaylistState['playlist'];
  playlistTotal: PlaylistState['total'];
  playlistOrder: PlaylistState['order'];
  location: LocationUmi;
  isLoading: boolean;
};

type PageDispatchProps = {
  getPlaylist: (cat: string) => void;
  handlePageChange: (page: number) => void;
  handleOrderChange: (order: string) => void;
  reset: (order: string) => void;
  playPlaylist: (id: number) => void;
};

type Props = PageStateProps & PageDispatchProps;

@connect(
  ({ playlist, loading }: Store) => ({
    playlist: playlist.playlist,
    playlistTotal: playlist.total,
    playlistOrder: playlist.order,
    isLoading: loading.effects['playlist/getPlaylist'],
  }),
  (dispatch: Dispatch<any>) => ({
    getPlaylist(cat: string) {
      dispatch({
        type: 'playlist/getPlaylist',
        payload: {
          cat,
        },
      });
    },
    handlePageChange: (page: number) =>
      dispatch({ type: 'playlist/save', payload: { page: page - 1 } }),
    handleOrderChange: (order: string) =>
      dispatch({ type: 'playlist/save', payload: { order: order, page: 0, total: 0 } }),
    reset: (order: string) =>
      dispatch({ type: 'playlist/save', payload: { page: 0, order: order, total: 0 } }),
    playPlaylist(id: number) {
      dispatch({
        type: 'player/playPlaylist',
        payload: {
          id,
        },
      });
    },
  }),
)
class DiscoverPlaylist extends React.Component<Props, State> {
  state = {
    tabs: [
      {
        label: '语种',
        className: styles.lIcon1,
        types: ['华语', '欧美', '日语', '韩语', '粤语', '小语种'],
      },
      {
        label: '风格',
        className: styles.lIcon2,
        types: [
          '流行',
          '摇滚',
          '民谣',
          '电子',
          '舞曲',
          '说唱',
          '轻音乐',
          '爵士',
          '乡村',
          'R&B/Soul',
          '古典',
          '民族',
          '英伦',
          '金属',
          '朋克',
          '蓝调',
          '雷鬼',
          '世界音乐',
          '拉丁',
          '另类/独立',
          'New Age',
          '古风',
          '后摇',
          'Bossa Nova',
        ],
      },
      {
        label: '场景',
        className: styles.lIcon3,
        types: [
          '清晨',
          '夜晚',
          '学习',
          '工作',
          '午休',
          '下午茶',
          '地铁',
          '驾车',
          '运动',
          '旅行',
          '散步',
          '酒吧',
        ],
      },
      {
        label: '情感',
        className: styles.lIcon4,
        types: [
          '怀旧',
          '清新',
          '浪漫',
          '性感',
          '伤感',
          '治愈',
          '放松',
          '孤独',
          '感动',
          '兴奋',
          '快乐',
          '安静',
          '思念',
        ],
      },
      {
        label: '主题',
        className: styles.lIcon5,
        types: [
          '影视原声',
          'ACG',
          '儿童',
          '校园',
          '游戏',
          '70后',
          '80后',
          '90后',
          '网络歌曲',
          'KTV',
          '经典',
          '翻唱',
          '吉他',
          '钢琴',
          '器乐',
          '榜单',
          '00后',
        ],
      },
    ],
    showTabs: false,
  };

  componentWillReceiveProps(nextProps: any) {
    if (nextProps.location.query.cat !== this.props.location.query.cat) {
      this.setState({
        showTabs: false,
      });
      this.props.reset('hot');
      this.props.getPlaylist(nextProps.location.query.cat);
    }
    if (nextProps.location.query.order !== this.props.location.query.order) {
      this.setState({
        showTabs: false,
      });
      this.props.reset(nextProps.location.query.order);
      this.props.getPlaylist(nextProps.location.query.cat);
    }
  }

  componentDidMount() {
    const cat = this.props.location.query.cat;
    const order = this.props.location.query.order;
    if (order === 'new') {
      this.props.handleOrderChange('new');
    } else {
      this.props.handleOrderChange('hot');
    }
    this.props.getPlaylist(cat);
  }

  triggershowTabs = () => {
    this.setState(prev => ({
      showTabs: !prev.showTabs,
    }));
  };

  onPageChange = (page: number) => {
    const cat = this.props.location.query.cat;
    this.props.handlePageChange(page);
    this.props.getPlaylist(cat);
  };

  render() {
    const { tabs, showTabs } = this.state;
    const {
      playlist,
      playlistTotal,
      isLoading,
      playlistOrder,
      playPlaylist,
      location,
    } = this.props;
    const cat = location.query.cat;
    let currentCat = cat ? `cat=${cat}` : '';
    return (
      <div className={styles.playlist}>
        <div className={styles.playlistHeader}>
          <div className={styles.playlistHeaderLeft}>
            <h3 className={styles.lTitle}>{cat ? cat : '全部'}</h3>
            <a className={styles.lBtn} href="javascript:;" onClick={this.triggershowTabs}>
              <i>
                选择分类
                <em />
              </i>
            </a>
          </div>
          <div
            className={Classnames(styles.playlistHeaderRight, {
              [styles.playlistHeaderNew]: playlistOrder === 'new',
            })}
          >
            <Link
              to={`/discover/playlist?${currentCat}`}
              className={Classnames(styles.rTxt, styles.r1)}
            >
              热门
            </Link>
            <Link
              to={`/discover/playlist?${currentCat}&order=new`}
              className={Classnames(styles.rTxt, styles.r2)}
            >
              最新
            </Link>
          </div>
        </div>
        {showTabs && <Tabs tabs={tabs} />}
        <Spin spinning={isLoading}>
          <div className={styles.playlistContainer}>
            {playlist.map(item => {
              return (
                <PlaylistSheetPanel
                  key={item.id}
                  id={item.id}
                  path={`/playlist?id=${item.id}`}
                  nickname={item.creator.nickname}
                  userPath={`/user/home?id=${item.creator.userId}`}
                  label={item.name}
                  count={getFormatCount(item.playCount)}
                  pic={item.picUrl}
                  className={styles.playlistItem}
                  onPlay={playPlaylist}
                />
              );
            })}
          </div>
        </Spin>
        <Pagination
          style={{ textAlign: 'center' }}
          total={playlistTotal}
          onChange={this.onPageChange}
          defaultPageSize={35}
        />
      </div>
    );
  }
}

export default DiscoverPlaylist;
