import React, { FC } from 'react';
import SiderPanel from '@/components/siderPanel';
import { Link } from 'umi';
import { PlaylistModel } from '../../model';

import styles from './index.module.less';

type Props = {
  list: PlaylistModel['subscribers'];
};

const LikerWrap: FC<Props> = ({ list }) => {
  return (
    <SiderPanel title="喜欢这个歌单的人">
      <div className={styles.list}>
        {list.map(item => {
          return (
            <Link to={`/user/home?id=${item.userId}`} className={styles.listItem} key={item.userId}>
              <img src={item.avatarUrl} alt={item.nickname} className={styles.listItemAva} />
            </Link>
          );
        })}
      </div>
    </SiderPanel>
  );
};

export default LikerWrap;
