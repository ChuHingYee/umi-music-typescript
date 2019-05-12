import React from 'react';
import { Link } from 'umi';
import { connect } from 'dva';
import { Carousel } from 'antd';
import { RadioState } from './model';
import Classnames from 'classnames';
import styles from './layout.module.less';

type PageStateProps = {
  cateList: RadioState['cateList'];
};

type PageDispatchProps = {
  getRadioCateList: () => void;
};

type Props = PageStateProps & PageDispatchProps;

type store = {
  djRadioLayout: RadioState;
};

@connect(
  ({ djRadioLayout }: store) => ({
    cateList: djRadioLayout.cateList,
  }),
  (dispatch: any) => ({
    getRadioCateList() {
      dispatch({
        type: 'djRadioLayout/getRadioCateList',
      });
    },
  }),
)
class DiscoverDJRadioLayout extends React.Component<Props, {}> {
  state = {};

  componentDidMount() {
    this.props.getRadioCateList();
  }

  renderCarousel = () => {
    const { cateList } = this.props;
    const firstPage = cateList.slice(0, 18);
    const secondPage = cateList.slice(18, cateList.length);
    return (
      <Carousel className={styles.carousel}>
        <div className={styles.carouselRow}>{this.renderCarouselRow(firstPage)}</div>
        <div className={styles.carouselRow}>{this.renderCarouselRow(secondPage)}</div>
      </Carousel>
    );
  };

  renderCarouselRow = (list: RadioState['cateList']) => {
    return list.map(tab => {
      return (
        <Link
          className={styles.carouselRowItem}
          to={`/discover/djradio/category?id=${tab.id}`}
          key={`${tab.name}${tab.id}`}
        >
          <div className={styles.iICon} style={{ backgroundImage: `url(${tab.pic})` }} />
          <h5 className={styles.iLabel}>{tab.name}</h5>
        </Link>
      );
    });
  };

  render() {
    const { children } = this.props;
    return (
      <div className={styles.radio}>
        {this.renderCarousel()}
        {children}
      </div>
    );
  }
}

export default DiscoverDJRadioLayout;
