import React, { FC, RefObject } from 'react';
import Classnames from 'classnames';
import AlbumPanel from '@/components/albumPanel';
import { Skeleton, Carousel } from 'antd';
import { DiscoverModel } from '@/pages/discover/index/model';
import styles from './index.module.less';

type Props = {
  list: DiscoverModel['albumList'];
  loading: boolean;
  onPlay: (id: number) => void;
};

const Album: FC<Props> = ({ list, loading, onPlay }) => {
  let carousel: any;
  const handleNext = () => {
    (carousel as Carousel).next();
  };
  const handlePrev = () => {
    (carousel as Carousel).next();
  };
  return (
    <Skeleton loading={loading}>
      <div className={styles.album}>
        <Carousel
          dots={false}
          slidesToScroll={5}
          slidesToShow={5}
          className={styles.albumContainer}
          ref={el => {
            carousel = el;
          }}
        >
          {list.map(item => {
            return (
              <AlbumPanel
                key={item.id}
                id={item.id}
                name={item.name}
                path={`/album?id=${item.id}`}
                picUrl={item.picUrl}
                size="small"
                artists={item.artists}
                className={styles.albumItem}
                onPlay={onPlay}
              />
            );
          })}
        </Carousel>
        <i className={Classnames(styles.albumIcon, styles.albumLeft)} onClick={handlePrev} />
        <i className={Classnames(styles.albumIcon, styles.albumRight)} onClick={handleNext} />
      </div>
    </Skeleton>
  );
};

export default Album;
