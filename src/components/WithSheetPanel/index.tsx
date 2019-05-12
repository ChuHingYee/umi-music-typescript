import React, { Component, ComponentType } from 'react';
import { getHOCComponentName } from '@/utils/utils';
import Classnames from 'classnames';
import Link from 'umi/link';

import styles from './index.module.less';

interface SheetPanelProps {
  id: number;
  label: string;
  path: string;
  pic: string;
  count: string;
  className?: string;
  onPlay: (id: number) => void;
}

function withSheetPanel<OriginalProps extends SheetPanelProps>(
  WrappedComponent: ComponentType<OriginalProps>,
) {
  return class WithSheetPanel extends Component<OriginalProps> {
    static readonly displayName = getHOCComponentName('WithSheetPanel', WrappedComponent);
    static readonly WrappedComponent = WrappedComponent;

    render() {
      const { path, pic, count, label, onPlay, id, className } = this.props;
      return (
        <div className={Classnames(styles.container, className)}>
          <div className={styles.panel}>
            <Link to={path} className={styles.panelPic}>
              <img className={styles.panelPic} src={pic} alt={label} />
            </Link>
            <div className={styles.panelBottom}>
              <div className={styles.panelBottomInfo}>
                <i className={styles.icon} />
                <i className={styles.count}>{count}</i>
              </div>
              <i className={styles.panelBottomPlay} onClick={onPlay.bind(this, id)} />
            </div>
          </div>
          {<WrappedComponent {...this.props as OriginalProps} />}
        </div>
      );
    }
  };
}

export { withSheetPanel, SheetPanelProps };
