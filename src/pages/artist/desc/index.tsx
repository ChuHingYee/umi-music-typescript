import React from 'react';
import { Skeleton, Empty } from 'antd';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import { ArtistDescModel } from './model';
import { ArtistModel } from '../model';
import Classnames from 'classnames';
import styles from './index.module.less';

type Store = {
  artistDesc: ArtistDescModel;
  artist: ArtistModel;
  loading: DvaLoadingModel;
};

type State = {};

type PageStateProps = {
  artistInfo: ArtistModel['artistInfo'];
  briefDesc: ArtistDescModel['briefDesc'];
  introduction: ArtistDescModel['introduction'];
  isLoading: boolean;
  id: ArtistModel['id'];
};

type PageDispatchProps = {
  getArtistsDesc: () => void;
};

type Props = PageStateProps & PageDispatchProps;

@connect(
  ({ loading, artist, artistDesc }: Store) => {
    return {
      artistInfo: artist.artistInfo,
      briefDesc: artistDesc.briefDesc,
      introduction: artistDesc.introduction,
      id: artist.id,
      isLoading: loading.effects['artistDesc/getDesc'],
    };
  },
  (dispatch: Dispatch<any>) => {
    return {
      getArtistsDesc: () => dispatch({ type: 'artistDesc/getDesc' }),
    };
  },
)
class ArtistDesc extends React.Component<Props, State> {
  state = {};

  componentDidMount() {
    this.props.getArtistsDesc();
  }

  render() {
    const { artistInfo, briefDesc, introduction, isLoading } = this.props;
    return (
      <div>
        <Skeleton loading={isLoading} paragraph={{ rows: 10 }}>
          <div className={styles.item}>
            <h2 className={styles.itemLabel}>
              <i className={styles.itemLabelLine} />
              {artistInfo.name}的简介
            </h2>
            <p className={styles.itemValue}>{briefDesc}</p>
          </div>
          {introduction.map((item, index) => {
            return (
              <div className={styles.item} key={item.ti + index}>
                <h2 className={styles.itemLabel}>{item.ti}</h2>
                <p className={Classnames(styles.itemDetail, styles.itemNI)}>{item.txt}</p>
              </div>
            );
          })}
          {introduction.length === 0 && <Empty description="暂无数据" />}
        </Skeleton>
      </div>
    );
  }
}

export default ArtistDesc;
