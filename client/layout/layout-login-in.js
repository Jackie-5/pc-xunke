/**
 * Created by Jackie.Wu on 2018/7/23.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';

export default class LoginUp extends Component {
  static state = {
    visible: false
  }
  static defaultProp = {
    loginOk: () => {},
    loginCancel: () => {},
  }
  static propTypes = {
    loginCancel: PropTypes.func.isRequired,
    loginOk: PropTypes.func.isRequired,
  }

  loginOk = () => {
    this.props.loginOk();
  }
  loginCancel = () => {
    this.props.loginCancel();
  }
  render () {

    const {
      visible,
    } = this.props;

    return (
      <Modal
        title="登录"
        visible={true}
        onOk={() => this.loginOk()}
        onCancel={() => this.loginCancel()}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    )
  }
}
