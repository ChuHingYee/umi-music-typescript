import React, { FC } from 'react';
import { Link } from 'umi';
import Classnames from 'classnames';
import styles from './index.module.less';

type Props = {
  pic: string;
  id: number;
  name: string;
  className?: string;
};

const ArtistPanel: FC<Props> = ({ pic, id, name, className }) => {
  return (
    <div className={Classnames(styles.panel, className)}>
      <Link className={styles.panelPic} to={`/artist?id=${id}`} title={`${name}的音乐`}>
        <img src={pic} alt={`${name}的音乐`} />
        <span className={styles.panelPicMask} />
      </Link>
      <div className={styles.panelLink}>
        <Link to={`/artist?id=${id}`} className={styles.panelLinkName} title={`${name}的音乐`}>
          {name}
        </Link>
        <Link to={`/user/home?id=${id}`} className={styles.panelLinkHome} title={`${name}的主页`} />
      </div>
    </div>
  );
};
export default ArtistPanel;
