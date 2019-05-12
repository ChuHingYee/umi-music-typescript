import React from 'react';
import { withSheetPanel, SheetPanelProps } from '../withSheetPanel';
import styles from './index.module.less';
import Link from 'umi/link';

type Props = {
  label: string;
  path: string;
  nickname: string;
  userPath: string;
};

const SheetPanel: React.SFC<Props & SheetPanelProps> = ({ label, path, userPath, nickname }) => (
  <>
    <p className={styles.label}>
      <Link to={path} className={styles.labelTxt}>
        {label}
      </Link>
    </p>
    <p className={styles.user}>
      <span>by </span>
      <Link to={userPath} className={styles.userLink}>
        {nickname}
      </Link>
    </p>
  </>
);

export default withSheetPanel(SheetPanel);
