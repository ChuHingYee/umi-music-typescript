import React, { FC } from 'react';
import { Link } from 'umi';
import Classnames from 'classnames';
import styles from './index.module.less';
type Props = {
  id: number;
  name: string;
  pic: string;
  desc: string;
  border?: boolean;
};

const radioPanel: FC<Props> = ({ id, name, pic, desc, border = true }) => {
  return (
    <div className={Classnames(styles.panel, { [styles.border]: border })}>
      <Link to={`/djradio?id=${id}`} className={styles.panelPic}>
        <img src={pic} alt={name} title={name} />
      </Link>
      <div className={styles.panelInfo}>
        <Link to={`/djradio?id=${id}`} className={styles.panelInfoName}>
          {name}
        </Link>
        <p className={styles.panelInfoDesc}>{desc}</p>
      </div>
    </div>
  );
};
export default radioPanel;
