// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import styled, { ThemeProvider, injectGlobal } from 'styled-components';
import { shouldCheckAuth, SESSION_LOADED } from '../../auth/ducks/';
import { serverAuth } from '../../auth/server/';
import { serverGetUser } from '../../user/server/';
import Modal from '../../modal/containers/Modal';
import AppHead from '../../app/components/AppHead';
import AppFooter from '../../app/components/AppFooter';
import Header from '../../header/containers/Header';
import theme from '../theme';

@asyncConnect([
  {
    promise: ({ store: { dispatch, getState }, helpers: { req } }) => {
      const state: {} = getState();

      if (shouldCheckAuth(state)) {
        return dispatch(serverAuth(req)).then(res => {
          if (!res.payload.errors.length) {
            return dispatch(serverGetUser(res.payload.data._id, req));
          }
        });
      }
    }
  }
])
class Core extends Component {
  componentDidMount() {
    /**
     * Need to define our own internal session management flag within
     * redux as asyncConnect is causing a few issues with resetting
     */
    const { dispatch, isLoaded } = this.props;
    if (isLoaded) {
      dispatch({ type: SESSION_LOADED });
    }
  }

  shouldDisplayAppFooter(): boolean {
    const { pathname } = this.props;

    return (
      !pathname.includes('account') &&
      !pathname.includes('create') &&
      !pathname.includes('redirect')
    );
  }

  shouldDisplayHeader(): boolean {
    return !this.props.pathname.includes('create');
  }

  render() {
    const { children, isModalOpen, globalIsLoaded, pathname } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <div>
          {globalIsLoaded && <Modal />}
          <CoreContainer pathname={pathname} isModalOpen={isModalOpen}>
            <AppHead />
            {this.shouldDisplayHeader() && <Header />}
            {children}
            {this.shouldDisplayAppFooter() && <AppFooter />}
          </CoreContainer>
        </div>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = state => ({
  pathname:
    (state.routing.locationBeforeTransitions &&
      state.routing.locationBeforeTransitions.pathname) ||
    '',
  isLoaded: state.reduxAsyncConnect.loaded,
  isModalOpen: state.modal.modalType,
  globalIsLoaded: state.session.auth.globalIsLoaded
});

export default connect(mapStateToProps)(Core);

const CoreContainer = styled.div`
  background: ${props =>
    props.pathname.includes('jobs') && !props.pathname.includes('account')
      ? // ? '#F4F5F7'
        '#fff'
      : 'transparent'};
  min-height: 100vh;
  filter: blur(${props => (props.isModalOpen ? '3px' : '0px')});
`;

injectGlobal`
  * {
    box-sizing:border-box;
    margin: 0;
    padding: 0;
  }

  body {
    margin: 0;
  }
  
  textarea:focus, input:focus{
    outline: none;
  }


  ::-webkit-input-placeholder { /* Chrome/Opera/Safari */
    color: #d9dad9;
    font-weight: 200;
  }
  ::-moz-placeholder { /* Firefox 19+ */
    color: #d9dad9;
    font-weight: 200;
  }
  :-ms-input-placeholder { /* IE 10+ */
    color: #d9dad9;
    font-weight: 200;
  }
  :-moz-placeholder { /* Firefox 18- */
    color: #d9dad9;
    font-weight: 200;
  }

`;
