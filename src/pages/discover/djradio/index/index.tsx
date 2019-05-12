import React from 'react';
import { connect } from 'dva';
import { Link } from 'umi';
import RadioPanel from '@/components/radioPanel';
import { DJRadioState } from '../index/model';
import styles from './index.module.less';

type State = {};

type PageStateProps = {
  recommendList: DJRadioState['recommendList'];
  row1List: DJRadioState['row1List'];
  row2List: DJRadioState['row2List'];
  row3List: DJRadioState['row3List'];
  row4List: DJRadioState['row4List'];
  row5List: DJRadioState['row5List'];
  row6List: DJRadioState['row6List'];
};

type PageDispatchProps = {
  getProgramRecommend: () => void;
  getRadioRow1List: () => void;
  getRadioRow2List: () => void;
  getRadioRow3List: () => void;
  getRadioRow4List: () => void;
  getRadioRow5List: () => void;
  getRadioRow6List: () => void;
};

type Props = PageStateProps & PageDispatchProps;

type store = {
  djRadio: DJRadioState;
};

@connect(
  ({ djRadio }: store) => ({
    recommendList: djRadio.recommendList,
    row1List: djRadio.row1List,
    row2List: djRadio.row2List,
    row3List: djRadio.row3List,
    row4List: djRadio.row4List,
    row5List: djRadio.row5List,
    row6List: djRadio.row6List,
  }),
  (dispatch: any) => ({
    getProgramRecommend() {
      dispatch({
        type: 'djRadio/getProgramRecommend',
      });
    },
    getRadioRow1List() {
      dispatch({
        type: 'djRadio/getRadioRow1List',
      });
    },
    getRadioRow2List() {
      dispatch({
        type: 'djRadio/getRadioRow2List',
      });
    },
    getRadioRow3List() {
      dispatch({
        type: 'djRadio/getRadioRow3List',
      });
    },
    getRadioRow4List() {
      dispatch({
        type: 'djRadio/getRadioRow4List',
      });
    },
    getRadioRow5List() {
      dispatch({
        type: 'djRadio/getRadioRow5List',
      });
    },
    getRadioRow6List() {
      dispatch({
        type: 'djRadio/getRadioRow6List',
      });
    },
  }),
)
class DiscoverDJRadioIndex extends React.Component<Props, State> {
  state = {};

  componentDidMount() {
    const {
      getRadioRow1List,
      getRadioRow2List,
      getRadioRow3List,
      getRadioRow4List,
      getRadioRow5List,
      getRadioRow6List,
      getProgramRecommend,
    } = this.props;
    getProgramRecommend();
    getRadioRow1List();
    getRadioRow2List();
    getRadioRow3List();
    getRadioRow4List();
    getRadioRow5List();
    getRadioRow6List();
  }

  renderRow = (title: string, id: number, list: DJRadioState['row1List']) => {
    return (
      <div className={styles.radioRow}>
        <div className={styles.radioRowHeader}>
          <h3 className={styles.rHLabel}>
            <Link to={`/discover/djradio/category?id=${id}`} className={styles.rHLabelLink}>
              {title}
            </Link>
            <span className={styles.rHLabelDot}>·</span>
            电台
          </h3>
          <Link to={`/discover/djradio/category?id=${id}`} className={styles.rHMore}>
            更多>
          </Link>
        </div>
        <div className={styles.radioRowContainer}>
          {list.map((item, index) => {
            return <RadioPanel {...item} desc={item.rcmdtext} key={item.id} border={index < 2} />;
          })}
        </div>
      </div>
    );
  };

  render() {
    const {
      recommendList,
      row1List,
      row2List,
      row3List,
      row4List,
      row5List,
      row6List,
    } = this.props;
    return (
      <div className={styles.radio}>
        <div className={styles.radioWall}>
          <div className={styles.radioWallItem}>
            <div className={styles.wallHeader}>
              <Link className={styles.wallHeaderLable} to="/">
                推荐节目
              </Link>
              <Link to="/" className={styles.wallHeaderMore}>
                更多>
              </Link>
            </div>
            <div className={styles.wallList}>
              {recommendList.map(item => {
                return (
                  <div className={styles.wallListItem} key={item.id}>
                    <div className={styles.wItemInfo}>
                      <img src={item.blurCoverUrl} className={styles.wItemInfoPic} />
                      <div className={styles.wItemInfoTxt}>
                        <Link to="/" className={styles.wItemInfoTxtName}>
                          {item.name}
                        </Link>
                        <Link to="/" className={styles.wItemInfoTxtUser}>
                          {item.dj.nickname}
                        </Link>
                      </div>
                    </div>
                    <Link to="/" className={styles.wItemCate}>
                      {item.category}
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
          <div className={styles.radioWallItem}>2</div>
        </div>
        <div />
        {this.renderRow('音乐故事', 2, row1List)}
        {this.renderRow('美文读物', 6, row2List)}
        {this.renderRow('脱口秀', 5, row3List)}
        {this.renderRow('情感调频', 3, row4List)}
        {this.renderRow('创作|翻唱', 2001, row5List)}
        {this.renderRow('人文历史', 11, row6List)}
      </div>
    );
  }
}

export default DiscoverDJRadioIndex;
