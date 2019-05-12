import React from 'react';
import SiderPanel from '@/components/siderPanel';
import { Link } from 'umi';
import Classnames from 'classnames';
import styles from './index.module.less';
const SiderPanelDownload = () => {
  return (
    <SiderPanel title="网易云音乐多端下载">
      <div className={styles.download}>
        <div className={styles.downloadList}>
          <Link to="/" className={Classnames(styles.downloadListItem, styles.downloadListIOS)} />
          <Link to="/" className={Classnames(styles.downloadListItem, styles.downloadListPC)} />
          <Link
            to="/"
            className={Classnames(styles.downloadListItem, styles.downloadListAndroid)}
          />
        </div>
        <p className={styles.downloadTip}>同步歌单，随时畅听320k好音乐</p>
      </div>
    </SiderPanel>
  );
};
export default SiderPanelDownload;
