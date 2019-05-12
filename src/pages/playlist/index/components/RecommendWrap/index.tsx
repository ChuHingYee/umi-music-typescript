import React, { FC } from 'react';
import SiderPanel from '@/components/siderPanel';
import { Link } from 'umi';
import { PlaylistModel } from '../../model';

import styles from './index.module.less';

type Props = {
  list: PlaylistModel['relatedPlaylist'];
};

const RecommendWrap: FC<Props> = ({ list }) => {
  return (
    <SiderPanel title="相关推荐">
      <div className={styles.list}>
        {list.map(item => {
          return (
            <div className={styles.listItem} key={item.id}>
              <Link to={`/playlist?id=${item.id}`} className={styles.listItemPic}>
                <img src={item.coverImgUrl} alt={item.name} />
              </Link>
              <div className={styles.listItemInfo}>
                <p className={styles.rName}>
                  <Link className={styles.rNameLink} to={`/playlist?id=${item.id}`}>
                    {item.name}
                  </Link>
                </p>
                <p className={styles.rUser}>
                  by{' '}
                  <Link to={`/user/home?id=${item.creator.userId}`} className={styles.rUserLink}>
                    {item.creator.nickname}
                  </Link>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </SiderPanel>
  );
};

export default RecommendWrap;
