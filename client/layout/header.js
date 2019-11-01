/**
 * Created by JackieWu on 2018/7/20.
 */
import React, { Component } from 'react';
import '../less/layout-header.less';
import LoginUp from './layout-login-up';
import PropTypes from 'prop-types';

class Header extends Component {
  state = {
    loginUpIsShow: false,
    headerJson: [
      {
        "link": "/",
        "name": "首页",
        "target": "_blank"
      },
      {
        "link": "/loupan/",
        "name": "新房",
        "target": "_blank"
      },
      {
        "link": "/ershoufang/",
        "name": "二手房",
        "target": "_blank"
      },
      {
        "link": "/xiaoqu/",
        "name": "小区",
        "target": "_blank"
      },
      {
        "link": "/client/",
        "name": "APP下载",
        "target": "_blank"
      },
      {
        "link": "/baike/",
        "name": "百科",
        "target": "_blank"
      },
      {
        "link": "/zixun/",
        "name": "资讯",
        "target": "_blank"
      },
      {
        "link": "/sellHouse/",
        "name": "卖房",
        "target": "_blank"
      },
      {
        "link": "/tool/",
        "name": "工具",
        "target": "_blank"
      }
    ],
  };

  showUpModal = () => {
    this.setState({
      loginUpIsShow: !this.state.loginUpIsShow,
    });
  };
  loginUp = () => {
    this.showUpModal();
  };
  loginUpCancel = () => {
    this.setState({
      loginUpIsShow: false,
    });
  };

  render() {
    const { loginUpIsShow, headerJson } = this.state;
    return (
      <div className="layout-header">
        <div className="layout-header__box clearfix">
          <div className="layout-header__ul float-left">
            {
              headerJson.map((item) =>
                <div className="layout-header__ul__li float-left" key={item.link}>
                  <a rel="" href={item.link} target={item.target}>{item.name}</a>
                </div>)
            }
          </div>

          {/*<div className="layout-header__login float-right clearfix">*/}
            {/*<div*/}
              {/*className="layout-header__login__sign float-left"*/}
            {/*>*/}
              {/*<span>注册</span>*/}
            {/*</div>*/}
            {/*<div*/}
              {/*className="layout-header__login__sign float-left"*/}
              {/*//onClick={() => this.loginUp()}*/}
            {/*>*/}
              {/*<span>登录</span>*/}
            {/*</div>*/}
          {/*</div>*/}

        </div>
        <LoginUp
          visible={loginUpIsShow}
          loginCancel={this.loginUpCancel}
          loginOk={this.loginUp}
        />
      </div>
    )
  }
}

export default Header;
