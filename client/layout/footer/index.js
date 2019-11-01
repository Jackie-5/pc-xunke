/**
 * Created by JackieWu on 2018/7/20.
 */
import React, { Component } from 'react';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import PropTypes from 'prop-types';


class Layout extends Component {
  static defaultProps = {
    isHeader: true,
    children: {},
  };

  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    // const {  } = this.props;
    return (
      <div className="layout-footer">
        <div className="box">
          <Row>
            <Col>
111
            </Col>
            <Col>1</Col>
            <Col>1</Col>
          </Row>
          <div className="">ipc</div>
        </div>
      </div>
    )
  }
}

Layout.propTypes = {
};


export default Layout;
