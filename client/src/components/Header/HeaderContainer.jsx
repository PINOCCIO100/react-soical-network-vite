import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";

import { handleLogout } from '../../store_rtk/reducers/authReducer';

import Header from './Header';

class HeaderAPI extends React.Component {
  render() {
    return (
      <Header
        {...this.props}
      />
    )
  }
}

export default compose(
  connect((state) => ({ isAuth: state.Auth.isAuth }), { handleLogout }),
)(HeaderAPI);