/**
 * Created by JackieWu on 2018/7/20.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from "antd/lib/icon";
import Divider from "antd/lib/divider";
import './index.less';

class Header extends Component {
  static defaultProps = {
    menus: [],
    domainDetail: {},
    currentCity: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      scrollTop: 80,
      scrollTopPercent: 0,
      headerFixed: 'absolute',
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', (e) => {
      const num = 80 - (window.scrollY / 3);
      this.setState({
        headerFixed: window.scrollY > 1 ? 'fixed' : 'absolute',
        scrollTop: num,
        scrollTopPercent: window.scrollY / 100,
      });

    });
  }

  render() {
    const { domainDetail, currentCity, menus } = this.props;
    const { scrollTop, headerFixed, scrollTopPercent } = this.state;
    const scrollHeight = (headerFixed === 'absolute') ? 80 : scrollTop > 50 ? scrollTop : 50;
    return (
      <React.Fragment>
        <div
          className="layout-header"
          style={{
            height: scrollHeight,
            position: headerFixed,
            lineHeight: `${scrollHeight}px`,
          }}
        >
          <div
            className="bg"
            style={{
              opacity: scrollTopPercent,
            }}
          />
          <div
            className="box"
            style={{ height: scrollHeight }}
          >
            <a
              href="/"
              className="box__logo"
              style={{ height: scrollHeight + 10,}}
            >
              <img
                src="https://sitemap-qa.oss-cn-hangzhou.aliyuncs.com/common_image/yuanhaowang_Logo_03.png"
                alt={domainDetail.companyName}
              />
            </a>
            <a className="box__city">
              <h3>
                <span>{currentCity.name}</span>
                <Icon type="caret-down" />
              </h3>
            </a>

            <div className="box__menus">
              {
                menus.map((item) => (
                  <a
                    className={item.active ? 'active' : ''}
                    href={item.url}
                    key={item.url}
                  >
                    { item.name }
                  </a>
                ))
              }
            </div>

            <div className="box__login float-right">
              <React.Fragment>
                <a href="javascript:;">登录</a>
                <Divider type="vertical" style={{ background: '#8f8e98' }} />
                <span>注册</span>
              </React.Fragment>
              {/*<React.Fragment>*/}
              {/*<Avatar style={{ backgroundColor: '#fe7f35' }} icon="user" />*/}
              {/*<span style={{ marginLeft: 10 }}>185****1123</span>*/}
              {/*</React.Fragment>*/}
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

Header.propTypes = {
  menus: PropTypes.array,
  domainDetail: PropTypes.object,
  currentCity: PropTypes.object,
};

export default Header;
