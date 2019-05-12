import React, { FC } from 'react';
import { TabType } from '../TabsItem';
import { Link } from 'umi';
import TabsItem from '../TabsItem';
import styles from './index.module.less';

type Props = {
  tabs: TabType[];
};

const Tabs: FC<Props> = ({ tabs }) => {
  return (
    <div className={styles.wrap}>
      <div className={styles.wrapHeader}>
        <Link to="/discover/playlist" className={styles.wrapHeaderBtn}>
          <em>全部风格</em>
        </Link>
      </div>
      <div className={styles.wrapTabs}>
        <div className={styles.wrapTabsArrow} />
        {tabs.map(tab => {
          return <TabsItem tab={tab} key={tab.label} />;
        })}
      </div>
    </div>
  );
};

export default Tabs;
