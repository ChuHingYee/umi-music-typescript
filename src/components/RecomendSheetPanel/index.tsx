import React from 'react';
import { withSheetPanel, SheetPanelProps } from '../withSheetPanel';
import styles from './index.module.less';
import Link from 'umi/link';

type Props = {
  label: string;
  path: string;
};

const SheetPanel: React.SFC<Props & SheetPanelProps> = ({ label, path }) => (
  <p className={styles.label}>
    <Link to={path} className={styles.labelTxt}>
      {label}
    </Link>
  </p>
);

export default withSheetPanel(SheetPanel);
