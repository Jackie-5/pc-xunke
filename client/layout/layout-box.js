import React from 'react';
import FixedRight from './fixed-right';
import Header from './header';
import Footer from './footer';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
// import LoginIn from './layout-login-in';


export default class Layout extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <LocaleProvider locale={zh_CN}>
        <div>
          {/*<LoginIn />*/}
          <FixedRight />
          <Header { ...this.props } />
          {children}
          <Footer { ...this.props } />
        </div>
      </LocaleProvider>
    )
  }
}
