import React from 'react';
import { connect } from 'dva';
import ArtistHeader from '@/components/artistHeader';
import ArtistPanel from '@/components/artistPanel';
import debounce from 'lodash.debounce';
import Classnames from 'classnames';
import { Dispatch } from 'redux';
import { ArtistsState } from './model';
import styles from './index.module.less';

type Store = {
  artistsSigned: ArtistsState;
  loading: any;
};

type State = {};

type PageStateProps = {
  signArtists: ArtistsState['signArtists'];
  hasMore: ArtistsState['more'];
  isLoading: boolean;
};

type PageDispatchProps = {
  getSignArtists: () => void | Promise<any>;
};

type Props = PageStateProps & PageDispatchProps;

class DiscoverArtistSigned extends React.Component<Props, State> {
  state = {};

  componentDidMount() {
    this.props.getSignArtists();
    window.addEventListener('scroll', this.handlePageSrcoll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handlePageSrcoll);
  }

  handlePageSrcoll = debounce(() => {
    if (!this.props.isLoading) {
      const scrollHeight = document.body.scrollHeight;
      const scrollTop =
        document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
      const clientHeight = window.innerHeight || document.body.clientHeight;
      if (scrollHeight - scrollTop - clientHeight < 200) {
        if (this.props.hasMore) {
          this.props.getSignArtists();
        }
      }
    }
  }, 500);

  render() {
    const { signArtists } = this.props;
    return (
      <div className={styles.artist}>
        <ArtistHeader title="入驻歌手" />
        <div className={styles.artistPanel}>
          {signArtists.map(item => {
            return (
              <ArtistPanel
                pic={item.img1v1Url}
                {...item}
                key={item.id}
                className={styles.artistPanelItem}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default connect(
  (state: Store) => {
    return {
      signArtists: state.artistsSigned.signArtists,
      hasMore: state.artistsSigned.more,
      isLoading: state.loading.effects['artistsSigned/getSignArtists'],
    };
  },
  (dispatch: Dispatch<any>) => {
    return {
      getSignArtists: () => dispatch({ type: 'artistsSigned/getSignArtists' }),
    };
  },
)(DiscoverArtistSigned);
