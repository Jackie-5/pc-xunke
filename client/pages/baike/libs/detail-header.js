/**
 * Created by Jackie.Wu on 2018/7/25.
 */
import React, { Component } from 'react';
import './detail-header.less';
import axios from 'axios';
import fetch from '../../../libs/fetch';
import { Spin, Icon } from 'antd';

const antIcon = <Icon type="loading" style={{ fontSize: 16 }} spin />;

const CancelToken = axios.CancelToken;

let searchTime = '';
let cancelTokenSave = '';
let blurTime = '';

export default class DetailHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      visible: false,
      searchText: '',
      loading: true,
    };
  }

  searchList = (value) => {
    const { currentCity, pageName, domainDetail } = this.props;
    const val = value.target.value;

    this.setState({
      searchText: val,
      loading: true,
    });

    if (cancelTokenSave) {
      cancelTokenSave();
    }

    if (val) {
      if (searchTime) {
        clearTimeout(searchTime);
      }

      searchTime = setTimeout(() => {
        fetch(`/apis/baike/search/${pageName.key}`, {
          cityCode: currentCity.id,
          title: val,
          rows: 10,
          start: 0,
          domain: domainDetail.domain,
        }, {
          cancelToken: new CancelToken(function (cancel) {
            cancelTokenSave = cancel;
          })
        }).then((res) => {
          this.setState({
            data: res.data,
            visible: true,
            loading: false,
          });
        });
      }, 500);
    } else {
      this.setState({
        data: [],
        visible: true,
        loading: false,
      });
    }
  };


  render() {

    const { domainDetail, localPath, pageName } = this.props;
    const { data, visible, searchText, loading } = this.state;

    return (
      <div className="detail-header-box">
        <div className="detail-header-box__cont clearfix">
          <div className="detail-header-box__cont__img float-left">
            <a href="/" target="_blank">
              <img src={domainDetail.logo}/>
            </a>
          </div>

          <div className="detail-header-box__header float-left">
            {/*<div className="detail-header-box__header__menu">*/}
              {/*<a href="/baike" className={ pageName.key === 'baike' ? 'active' : '' }>百科</a>*/}
              {/*<a href="/zixun" className={ pageName.key === 'zixun' ? 'active' : '' }>资讯</a>*/}
            {/*</div>*/}
          </div>

          <div className="detail-header-box__search float-right">
            <div className="search-box">
              <input
                onKeyPress={(e) => {
                  if (e.charCode === 13) {
                    window.open(searchText ? `/${pageName.key}/rs${searchText}` : localPath);
                  }
                }}
                onChange={(value) => this.searchList(value)}
                onFocus={() => {
                  this.setState({
                    visible: true,
                  });
                }}
                onBlur={() => {
                  if (blurTime) {
                    clearTimeout(blurTime);
                  }
                  blurTime = setTimeout(() => {
                    this.setState({
                      visible: false,
                    });
                  }, 200);
                }}
              />
              <a
                href={
                  searchText ?
                    `/${pageName.key}/rs${searchText}`
                    :
                    localPath
                }
                target="_blank"
              >
                <i className="iconfont icon-xiazai5"/>
              </a>
            </div>
            {
              visible && data.length > 0 && !loading ?
                <div className="search-list">
                  <div className="search-list__tips">您可能在找</div>
                  {
                    data.map((item) => (
                      <a
                        key={item.id}
                        href={`/${pageName.key}/${item.id}.html`}
                        target="_blank"
                        className="search-list__item"
                        dangerouslySetInnerHTML={{ __html: item.title }}
                      />
                    ))
                  }
                </div>
                :
                null
            }
            {
              visible && searchText && loading ?
                <div className="search-list">
                  <div className="search-list__tips">
                    <Spin indicator={antIcon} />
                    <span style={{ marginLeft: 10 }}>为您搜索中</span>
                  </div>
                </div>
                :
                null
            }

            {
              visible && searchText && !loading && data.length === 0 ?
                <div className="search-list">
                  <div className="search-list__tips">暂无数据</div>
                </div>
                :
                null
            }
          </div>

        </div>
      </div>
    )
  }
}

