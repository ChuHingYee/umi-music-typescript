import React from 'react';
import { List, CellMeasurerCache, CellMeasurer, AutoSizer } from 'react-virtualized';
import Link from 'umi/link';
import ArtistsLink from '@/components/artistsLink';
import { connect } from 'dva';
import { formatTime } from '@/utils/utils';
import Classnames from 'classnames';
import { PlayerModel, PlayerSongType } from '@/models/player';
import styles from './index.module.less';
import DefaultPic from '@/assets/default_album.jpg';

type Store = {
  player: PlayerModel;
};

type State = {
  loadPercent: number;
  volStartY: number;
  isVolChange: boolean;
  vol: number;
  timeStartX: number;
  isTimeChange: boolean;
  time: number;
  ct: number;
  dt: number;
  isPaused: boolean;
  mode: string;
  showList: boolean;
  showVol: boolean;
  scrollToIndex: number;
  lock: boolean;
};

type PageStateProps = {
  playlist: PlayerModel['playlist'];
  currentIndex: PlayerModel['currentIndex'];
};

type PageDispatchProps = {
  getSongUrl: () => void;
  setPlayerRef: (ref: any) => void;
  setSong: (payload: Partial<PlayerSongType>) => void;
  playSong: (id: number) => void;
  delSong: (id: number) => void;
  getLrc: (id: number) => void;
  clearList: () => void;
};

type Props = PageStateProps & PageDispatchProps;

const modeType: { [props: number]: string } = {
  0: 'normal',
  1: 'random',
  2: 'single',
};

@connect(
  ({ player }: Store) => ({
    playlist: player.playlist,
    currentIndex: player.currentIndex,
  }),
  (dispatch: any) => ({
    getSongUrl() {
      dispatch({
        type: 'player/getSongUrl',
      });
    },
    setSong(payload: Partial<PlayerSongType>) {
      dispatch({
        type: 'player/setSong',
        payload: payload,
      });
    },
    setPlayerRef(ref: any) {
      dispatch({
        type: 'player/save',
        payload: ref,
      });
    },
    playSong(id: number) {
      dispatch({
        type: 'player/playSong',
        payload: {
          id,
        },
      });
    },
    delSong(id: number) {
      dispatch({
        type: 'player/delSong',
        payload: {
          id,
        },
      });
    },
    getLrc(id: number) {
      dispatch({
        type: 'player/getLrc',
        payload: {
          id,
        },
      });
    },
    clearList() {
      dispatch({
        type: 'player/save',
        payload: {
          playlist: [],
          currentIndex: -1,
        },
      });
    },
  }),
)
class Player extends React.Component<Props, State> {
  state = {
    loadPercent: 0,
    isVolChange: false,
    vol: 1,
    volStartY: 0,
    isTimeChange: false,
    time: 1,
    timeStartX: 0,
    ct: 0,
    dt: 0,
    isPaused: true,
    mode: 'normal',
    showList: false,
    showVol: false,
    scrollToIndex: 0,
    lock: true,
  };

  static defaultProps: Partial<Props> = {
    playlist: [],
    currentIndex: -1,
  };

  private playerRef = React.createRef<HTMLAudioElement>();
  private barRef = React.createRef<HTMLDivElement>();

  private measureCache = new CellMeasurerCache({
    fixedWidth: true,
    minHeight: 32,
    defaultHeight: 32,
  });

  componentDidMount() {
    this.props.setPlayerRef({
      ref: this.playerRef.current,
    });
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.currentIndex !== this.props.currentIndex) {
      this.measureCache.clearAll();
    }
  }

  handleAudioLoad = () => {};

  handleDTChange = () => {
    const { playlist, currentIndex } = this.props;
    let scrollToIndex: number = 0;
    if (this.state.isTimeChange) {
      return;
    }
    const currentTime = this.playerRef.current!.currentTime;
    const current = playlist[currentIndex];
    if (current && current.lrc && current.lrc.length > 0) {
      for (let i = current.lrc.length - 1; i > 0; i--) {
        if (current.lrc[i].time < currentTime) {
          scrollToIndex = i + 1;
          break;
        }
      }
      if (scrollToIndex !== -1) {
        scrollToIndex = scrollToIndex - 1;
      } else {
        scrollToIndex = current.lrc.length - 1;
      }
    }
    this.setState({
      ct: currentTime * 1000,
      scrollToIndex,
    });
  };

  handleProgress = () => {
    let percent = 0;
    let buffered;
    if (this.playerRef.current) {
      this.setState({
        dt: this.playerRef.current!.duration * 1000,
      });
      this.playerRef.current.readyState == 4 &&
        (buffered = this.playerRef.current.buffered.end(
          this.playerRef.current.buffered.length - 1,
        ));
      this.playerRef.current.readyState == 4 &&
        (percent = Math.round(((buffered as number) / this.playerRef.current.duration) * 100));
    }
    this.setState({
      loadPercent: percent,
    });
  };

  handleVolMouseDonw: React.MouseEventHandler<HTMLDivElement> = e => {
    e.persist();
    e.stopPropagation();
    this.setState({
      volStartY: e.clientY,
      isVolChange: true,
    });
    window.addEventListener('mousemove', this.handleVolMouseMove);
    window.addEventListener('mouseup', this.handleVolMouseUp);
  };

  handleVolMouseMove: React.MouseEventHandler<HTMLDivElement> = e => {
    e.stopPropagation();
    e.preventDefault();
    const { volStartY, isVolChange, vol } = this.state;
    if (!isVolChange) {
      return;
    }
    let diff = volStartY - e.clientY;
    this.setState(prevState => ({
      vol: this.computedValue(prevState.vol, diff),
      volStartY: e.clientY,
    }));
  };

  handleVolMouseUp: React.MouseEventHandler<HTMLDivElement> = e => {
    e.stopPropagation();
    e.preventDefault();
    this.setState({
      isVolChange: false,
    });
    const { vol } = this.state;
    this.playerRef.current!.volume = vol;
    window.removeEventListener('mousemove', this.handleVolMouseMove);
    window.removeEventListener('mouseup', this.handleVolMouseUp);
  };

  computedValue = (vol: number, diff: number) => {
    const diffF = diff / 100;
    if (vol + diffF > 1) {
      return 1;
    } else if (vol + diffF < 0) {
      return 0;
    } else {
      return vol + diffF;
    }
  };

  handleTimeMouseDonw: React.MouseEventHandler<HTMLDivElement> = e => {
    const { dt } = this.state;
    if (isNaN(dt) || !dt) {
      return;
    }
    e.persist();
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      timeStartX: e.clientX - e.target.offsetLeft + 9,
      isTimeChange: true,
    });
    window.addEventListener('mousemove', this.handleTimeMouseMove);
    window.addEventListener('mouseup', this.handleTimeMouseUp);
  };

  handleTimeMouseMove: React.MouseEventHandler<HTMLDivElement> = e => {
    e.stopPropagation();
    e.preventDefault();
    const { timeStartX, isTimeChange, dt } = this.state;
    if (!isTimeChange) {
      return;
    }
    let diff = e.clientX - timeStartX + 22;
    if (diff > 493) {
      diff = 493;
    } else if (diff < 0) {
      diff = 0;
    }
    const moveCT = (diff / 493) * dt;
    this.setState({
      ct: moveCT,
    });
  };

  computedTime = (ct: number, dt: number, diff: number) => {
    const now = ct / dt;
    const diffF = diff / 100;
    if (now + diffF > 1) {
      return dt;
    } else if (now + diffF < 0) {
      return 0;
    } else {
      return (now + diffF) * ct;
    }
  };

  handleTimeMouseUp: React.MouseEventHandler<HTMLDivElement> = e => {
    e.stopPropagation();
    const { ct } = this.state;
    this.setState({
      isTimeChange: false,
    });
    this.playerRef.current!.currentTime = ct / 1000;
    this.playerRef.current!.play();
    this.removeTimeListens();
  };

  removeTimeListens = () => {
    window.removeEventListener('mousemove', this.handleTimeMouseMove);
    window.removeEventListener('mouseup', this.handleTimeMouseUp);
  };

  handelPlayStaus = () => {
    const { currentIndex } = this.props;
    if (currentIndex === -1) {
      return;
    }
    const { current } = this.playerRef;
    const { isPaused } = this.state;
    if (isPaused) {
      current!.play();
    } else {
      current!.pause();
    }
    this.setState(prev => ({
      isPaused: !prev.isPaused,
    }));
  };

  triggerPlayStatus = (status: boolean) => {
    this.setState({
      isPaused: status,
    });
  };

  handleEnded = () => {
    const { mode } = this.state;
    if (mode === 'single') {
      return;
    }
    this.playNext();
  };

  playNext = () => {
    const { mode } = this.state;
    const { playlist, currentIndex, playSong, getLrc } = this.props;
    let nextId;
    if (mode === 'random') {
      let randomIndex =
        currentIndex + Math.floor(Math.random() * (playlist.length - 1 - currentIndex));
      nextId = playlist[randomIndex].id;
    } else {
      if (currentIndex === playlist.length - 1) {
        nextId = playlist[0].id;
      } else {
        nextId = playlist[currentIndex + 1].id;
      }
    }
    playSong(nextId);
    getLrc(nextId);
  };

  playPrev = () => {
    const { mode } = this.state;
    const { playlist, currentIndex, playSong } = this.props;
    let nextId;
    if (mode === 'random') {
      let randomIndex = currentIndex + Math.floor(Math.random() * currentIndex);
      nextId = playlist[randomIndex].id;
    } else {
      if (currentIndex === 0) {
        nextId = playlist[playlist.length - 1].id;
      } else {
        nextId = playlist[currentIndex - 1].id;
      }
    }
    playSong(nextId);
  };

  triggerPlayMode = () => {
    const { mode } = this.state;
    if (mode === 'normal') {
      this.setState({
        mode: 'random',
      });
    } else if (mode === 'random') {
      this.setState({
        mode: 'single',
      });
    } else {
      this.setState({
        mode: 'normal',
      });
    }
  };

  triggerShowList = () => {
    this.setState(prev => ({
      showList: !prev.showList,
    }));
  };

  triggerShowVol = () => {
    this.setState(prev => ({
      showVol: !prev.showVol,
    }));
  };

  handleDelSong = (id: number, e) => {
    e.stopPropagation();
    this.props.delSong(id);
  };

  triggerLock = () => {
    this.setState(prevState => ({
      lock: !prevState.lock,
    }));
  };

  changePrecent: React.MouseEventHandler<HTMLDivElement> = e => {
    e.persist();
    const { currentIndex, playlist } = this.props;
    this.playerRef.current!.currentTime =
      (playlist[currentIndex].dt * (e.clientX - this.barRef.current!.offsetLeft)) / 493 / 1000;
    this.playerRef.current!.play();
  };

  //渲染播放列表
  rowRenderer = ({ index, key, style }: { index: number; key: string; style: any }) => {
    const current = this.props.playlist[index];
    const { currentIndex } = this.props;
    return (
      <div
        key={key}
        className={Classnames(styles.lItem, {
          [styles.lActive]:
            currentIndex !== -1 && current.id === this.props.playlist[currentIndex].id,
        })}
        style={style}
        onClick={this.props.playSong.bind(this, current.id)}
      >
        <div className={styles.lItemName}>
          <div className={styles.lItemNameIcon} />
          <div className={styles.lItemNameTxt}>{current.name}</div>
        </div>
        <div className={styles.lItemInfo}>
          <span className={styles.lItemInfoBtns}>
            <i
              className={Classnames(styles.lItemInfoBtnsIcon, styles.lItemInfoBtnsDel)}
              onClick={this.handleDelSong.bind(this, current.id)}
            />
            <i className={Classnames(styles.lItemInfoBtnsIcon, styles.lItemInfoBtnsDownload)} />
            <i className={Classnames(styles.lItemInfoBtnsIcon, styles.lItemInfoBtnsShare)} />
            <i className={Classnames(styles.lItemInfoBtnsIcon, styles.lItemInfoBtnsFavour)} />
          </span>
          <span className={styles.lItemInfoArt}>
            <ArtistsLink artists={current.ar} className={styles.lItemInfoArtTxt} />
          </span>
          <span className={styles.lItemInfoTime}>{formatTime(current.dt)}</span>
          <span className={styles.lItemInfoShare} />
        </div>
      </div>
    );
  };

  //渲染歌词
  lrcRowRender = ({
    index,
    key,
    parent,
    style,
  }: {
    index: number;
    key: string;
    parent: any;
    style: any;
  }) => {
    const { scrollToIndex } = this.state;
    const { currentIndex, playlist } = this.props;
    const current = playlist[currentIndex].lrc[index];
    return (
      <CellMeasurer
        cache={this.measureCache}
        columnIndex={0}
        key={key}
        parent={parent}
        rowIndex={index}
      >
        <div
          key={key}
          className={Classnames(styles.lrcItem, {
            [styles.lrcActived]: scrollToIndex === index,
          })}
          style={style}
        >
          {current.lrc && <p>{current.lrc}</p>}
          {current.tlrc && <p>{current.tlrc}</p>}
        </div>
      </CellMeasurer>
    );
  };

  // 渲染列表
  listWrapRenderer = (
    show: boolean,
    list: PlayerModel['playlist'],
    index: number,
    scrollToIndex: number,
    clearList: Props['clearList'],
  ) => {
    return (
      <div
        className={Classnames(styles.panel, {
          [styles.panelShow]: show,
        })}
      >
        <div className={styles.panelHeader}>
          <div className={styles.panelHeaderList}>
            <h4 className={styles.name}>播放列表({list.length})</h4>
            <div className={styles.btns}>
              <a href="javascript:;" className={styles.btnsLink}>
                <i className={Classnames(styles.btnsLinkIcon, styles.btnsLinkFavour)} />
                收藏全部
              </a>
              <span className={styles.btnsLine} />
              <a href="javascript:;" className={styles.btnsLink} onClick={clearList}>
                <i className={Classnames(styles.btnsLinkIcon, styles.btnsLinkClean)} />
                清除
              </a>
            </div>
          </div>
          <div className={styles.panelHeaderLrc}>{index !== -1 ? list[index].name : '-'}</div>
        </div>
        <div className={styles.panelContainer}>
          <div className={styles.panelContainerList}>
            <List
              width={558}
              height={260}
              rowCount={list.length}
              rowHeight={28}
              rowRenderer={this.rowRenderer}
              current={index}
            />
          </div>
          <div className={styles.panelContainerLrc}>
            {index !== -1 && list[index].lrc && list[index].lrc.length > 0 && (
              <AutoSizer>
                {({ width, height }) => (
                  <List
                    width={width}
                    height={height}
                    rowCount={list[index].lrc.length}
                    rowRenderer={this.lrcRowRender}
                    deferredMeasurementCache={this.measureCache}
                    rowHeight={this.measureCache.rowHeight}
                    scrollToIndex={scrollToIndex}
                  />
                )}
              </AutoSizer>
            )}
          </div>
        </div>
      </div>
    );
  };

  //渲染播放器相关
  wrapPlayerRenderer = (
    list: PlayerModel['playlist'],
    index: number,
    percent: number,
    ct: number,
    dt: number,
  ) => {
    return (
      <div className={styles.play}>
        <div className={styles.playInfo}>
          {index !== -1 && (
            <>
              <Link className={styles.playInfoName} to={`/song?id=${list[index].id}`}>
                {list[index].name}
              </Link>
              <ArtistsLink artists={list[index].ar} className={styles.playInfoArtist} />
            </>
          )}
        </div>
        <div className={styles.playBar}>
          <div className={styles.playBarPro} onClick={this.changePrecent} ref={this.barRef}>
            <div className={styles.rdy} style={{ width: `${percent}%` }} />
            <div
              className={styles.done}
              style={{
                width: index !== -1 ? `${(ct / dt) * 100}%` : '0%',
              }}
            >
              <span className={styles.doneIcon} onMouseDown={this.handleTimeMouseDonw}>
                <i />
              </span>
            </div>
          </div>
          <span className={styles.playBarTime}>
            <em className={styles.cur}>{formatTime(index !== -1 ? ct : 0)}</em>/
            {formatTime(index !== -1 && dt ? dt : 0)}
          </span>
        </div>
      </div>
    );
  };

  //渲染播放器ctrl
  wrapCtrlRenderer = (show: boolean, list: PlayerModel['playlist'], vol: number, mode: string) => {
    return (
      <div className={styles.ctrl}>
        <div
          className={Classnames(styles.ctrlVolWrap, {
            [styles.ctrlVolShow]: show,
          })}
        >
          <div className={styles.vwBg} />
          <div className={styles.vwBar}>
            <span className={styles.vwBarLine} style={{ height: `${83 * vol}px` }} />
            <span
              onMouseDown={this.handleVolMouseDonw}
              className={styles.vwBarPoint}
              style={{ top: `${73 - 73 * vol}px` }}
            />
          </div>
        </div>
        <i className={Classnames(styles.ctrlIcon, styles.ctrlVol)} onClick={this.triggerShowVol} />
        <i
          className={Classnames(styles.ctrlIcon, {
            [styles.ctrlNormal]: mode === 'normal',
            [styles.ctrlRandom]: mode === 'random',
            [styles.ctrlSingle]: mode === 'single',
          })}
          onClick={this.triggerPlayMode}
        />
        <span className={styles.ctrlList} onClick={this.triggerShowList}>
          {list.length}
        </span>
      </div>
    );
  };

  render() {
    const { playlist, currentIndex, clearList } = this.props;
    const {
      loadPercent,
      vol,
      ct,
      dt,
      isPaused,
      mode,
      showList,
      showVol,
      scrollToIndex,
      lock,
    } = this.state;
    return (
      <div className={styles.player}>
        <audio
          style={{ flexShrink: 0 }}
          src={currentIndex !== -1 ? playlist[currentIndex].url : ''}
          controls={true}
          loop={mode === 'single'}
          ref={this.playerRef}
          onPlay={this.triggerPlayStatus.bind(this, false)}
          onPause={this.triggerPlayStatus.bind(this, true)}
          onTimeUpdate={this.handleDTChange}
          onDurationChange={this.handleDTChange}
          onProgress={this.handleProgress}
          onLoadStart={this.handleAudioLoad}
          onEnded={this.handleEnded}
        />
        <div
          className={Classnames(styles.playerContainer, {
            [styles.playerShow]: lock,
          })}
        >
          <div className={styles.playerContainerLock}>
            <i
              onClick={this.triggerLock}
              className={Classnames(styles.playerContainerLockIcon, {
                [styles.playerContainerLockOn]: lock,
                [styles.playerContainerLockOff]: !lock,
              })}
            />
          </div>
          <div className={styles.playerContainerWrap}>
            <div className={styles.btns}>
              <i className={Classnames(styles.btnsIcon, styles.btnsPrev)} onClick={this.playPrev} />
              <i
                className={Classnames(styles.btnsIcon, styles.btnsPlay, {
                  [styles.btnsPause]: !isPaused,
                })}
                onClick={this.handelPlayStaus}
              />
              <i className={Classnames(styles.btnsIcon, styles.btnsNext)} onClick={this.playNext} />
            </div>
            <div className={styles.pic}>
              <img src={currentIndex !== -1 ? playlist[currentIndex].al.picUrl : DefaultPic} />
              {currentIndex !== -1 && (
                <Link className={styles.picMask} to={`/song?id=${playlist[currentIndex].id}`} />
              )}
              {currentIndex === -1 && <span className={styles.picMask} />}
            </div>
            {this.wrapPlayerRenderer(playlist, currentIndex, loadPercent, ct, dt)}
            <div className={styles.open}>
              <i className={Classnames(styles.openIcon, styles.openAdd)} />
              <i className={Classnames(styles.openIcon, styles.openShare)} />
            </div>
            {this.wrapCtrlRenderer(showVol, playlist, vol, mode)}
          </div>
        </div>
        {this.listWrapRenderer(showList, playlist, currentIndex, scrollToIndex, clearList)}
      </div>
    );
  }
}

export default Player;
