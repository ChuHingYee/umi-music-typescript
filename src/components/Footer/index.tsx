import React, { SFC } from 'react';
import { Link } from 'umi';
import Classnames from 'classnames';
import styles from './index.module.less';
const Footer: SFC<object> = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.info}>
          <p className={styles.infoLink}>
            <a className={styles.infoLinkTxt} href="javascript:;" target="_blank">
              客户服务
            </a>
            <span className={styles.infoLinkLine}>|</span>
            <a className={styles.infoLinkTxt} href="javascript:;" target="_blank">
              服务条款
            </a>
            <span className={styles.infoLinkLine}>|</span>
            <a className={styles.infoLinkTxt} href="javascript:;" target="_blank">
              隐私政策
            </a>
            <span className={styles.infoLinkLine}>|</span>
            <a className={styles.infoLinkTxt} href="javascript:;" target="_blank">
              版权投诉指引
            </a>
            <span className={styles.infoLinkLine}>|</span>
            <a className={styles.infoLinkTxt} href="javascript:;" target="_blank">
              意见反馈
            </a>
          </p>
          <p>
            <span>仅供学习，不作任何商业活动</span>
          </p>
        </div>
        <div className={styles.nav}>
          <div className={styles.navItem}>
            <Link to="/" className={Classnames(styles.navItemIcon, styles.navIconUser)} />
            <span className={Classnames(styles.navItemLabel, styles.navLabelUser)}>用户认证</span>
          </div>
          <div className={styles.navItem}>
            <Link to="/" className={Classnames(styles.navItemIcon, styles.navIconMusic)} />
            <span className={Classnames(styles.navItemLabel, styles.navLabelMusic)}>
              独立音乐人
            </span>
          </div>
          <div className={styles.navItem}>
            <Link to="/" className={Classnames(styles.navItemIcon, styles.navIconay)} />
            <span className={Classnames(styles.navItemLabel, styles.navLabelPay)}>赞赏</span>
          </div>
          <div className={styles.navItem}>
            <Link to="/" className={Classnames(styles.navItemIcon, styles.navIconVideo)} />
            <span className={Classnames(styles.navItemLabel, styles.navLabelVideo)}>视频奖励</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
