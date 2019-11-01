/**
 * Created by JackieWu on 2018/7/20.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../header/index';
import Footer from '../footer/index';


class Layout extends Component {
  static defaultProps = {
    isHeader: true,
    isFooter: true,
    children: {},
  };

  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    const { isHeader, isFooter, children } = this.props;
    return (
      <React.Fragment>
        { isHeader &&  <Header { ...this.props } /> }

        { children }

        { isFooter &&  <Footer { ...this.props } /> }
      </React.Fragment>
    )
  }
}

Layout.propTypes = {
  isHeader: PropTypes.bool,
  isFooter: PropTypes.bool,
  children: PropTypes.object,
};


export default Layout;
