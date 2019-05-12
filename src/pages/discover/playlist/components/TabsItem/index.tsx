import React, { FC, Fragment } from 'react';
import Classnames from 'classnames';
import { Link } from 'umi';
import styles from './index.module.less';

export type TabType = {
  label: string;
  className: string;
  types: string[];
};

type Props = {
  tab: TabType;
};

const TabsItem: FC<Props> = ({ tab }) => {
  return (
    <div key={tab.label} className={styles.row}>
      <div className={styles.rowLabel}>
        <span className={Classnames(styles.lIcon, tab.className)} />
        {tab.label}
      </div>
      <div className={styles.rowTypes}>
        {tab.types.map(type => {
          return (
            <Fragment key={type}>
              <Link className={styles.typeName} to={`/discover/playlist?cat=${type}`}>
                {type}
              </Link>
              <span className={styles.typeLine}>|</span>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default TabsItem;
