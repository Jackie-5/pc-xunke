/**
 * Created by Xieww on 2019/01/12.
 */
import React, { Component } from 'react';
import Carousel from 'antd/lib/carousel';
import PropTypes from 'prop-types';
import Layout from '../../../layout/index/index';
import './index.less';

class Index extends Component {

  static defaultProps = {
    bannerJson: [],
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


  render(){
    const { bannerJson, domainDetail, currentCity, menus } = this.props;
    const { scrollTop, headerFixed, scrollTopPercent } = this.state;
    const scrollHeight = (headerFixed === 'absolute') ? 80 : scrollTop > 50 ? scrollTop : 50;

    return (
      <Layout
        { ...this.props }
      >
        <div className="index">
          <div style={{ height: 80 }} />
          <Carousel>
            {
              bannerJson.map((item) => (
                <div className="index__banner">
                  <div className="item" style={{ backgroundImage: `url(${item.url})` }} />
                </div>
              ))
            }
          </Carousel>,
        </div>
      </Layout>
    )
  }
}

Index.propTypes = {
  bannerJson: PropTypes.array,
  menus: PropTypes.array,
  domainDetail: PropTypes.object,
  currentCity: PropTypes.object,
};

export default Index;