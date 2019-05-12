import React, { FC } from 'react';
import Classnames from 'classnames';
import { Link } from 'umi';
import { Skeleton, Carousel } from 'antd';
import { DiscoverModel } from '@/pages/discover/index/model';
import styles from './index.module.less';

type Props = {
  list: DiscoverModel['bannerList'];
  loading: boolean;
};

const Banner: FC<Props> = ({ list, loading }) => {
  return (
    <div className={styles.banner}>
      <div className={styles.bannerDownload}>
        <div className={styles.bannerDownloadContainer}>
          <div className={styles.item}>
            <Link className={styles.itemBtn} to="/download">
              下载
            </Link>
            <p className={styles.itemTips}>PC 安卓 iPhone WP iPad Mac 六大客户端</p>
            <div className={Classnames(styles.itemShadow, styles.itemLeft)} />
            <div className={Classnames(styles.itemShadow, styles.itemRight)} />
          </div>
        </div>
      </div>
      <div className={styles.bannerContaner}>
        {loading && (
          <div className={styles.bannerItemInner}>
            <Skeleton paragraph={{ rows: 8 }} active={true} />
          </div>
        )}
        {!loading && list.length > 0 && (
          <Carousel effect="fade">
            {list.map(item => {
              return (
                <div key={item.targetId}>
                  <div
                    className={styles.bannerItem}
                    style={{ backgroundImage: `url(${item.backgroundUrl})` }}
                  >
                    <div className={styles.bannerItemInner}>
                      <img src={item.picUrl} alt="" className={styles.pic} />
                    </div>
                  </div>
                </div>
              );
            })}
          </Carousel>
        )}
      </div>
    </div>
  );
};

export default Banner;
