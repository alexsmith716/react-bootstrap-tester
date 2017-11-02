import React from 'react';
import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';

const IntlWrapper = props => (
  <IntlProvider {...props.intl}>{props.children}</IntlProvider>
);

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    intl: store.intl
  };
}

export default connect(mapStateToProps)(IntlWrapper);
