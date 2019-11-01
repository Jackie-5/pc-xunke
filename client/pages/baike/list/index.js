/**
 * Created by Jackie.Wu on 2018/7/25.
 */

import React from 'react';
import List from 'antd/lib/list';
import Pagination from 'antd/lib/pagination';
import { Breadcrumb, Empty } from 'antd';
import dayjs from 'dayjs';
import './baike-less.less';
import Layout from "../../../layout/layout-box";
import BaikeCategory from '../libs/baike-category';
import DetailHeader from "../libs/detail-header";

const format = 'YYYY-MM-DD HH:mm:ss';

class Index extends React.Component {
  constructor(props) {
    super(props);
    const { baikeCategory, code } = props;
    let categoryName = '';
    baikeCategory.forEach((item) => {
      if (item.id === code) {
        item.active = true;
        categoryName = item.name;
      }
      if (!item.active) {
        if (item.childs && item.childs.length > 0) {
          item.childs.forEach((it) => {
            if (it.id === code) {
              it.active = true;
              categoryName = it.name;
            }
          });
        }
      }
    });
    this.state = {
      baikeCategory,
      categoryName,
    };
  }

  render() {
    const { newBaikeList, localPath, currentCity, domainDetail, code, pageName } = this.props;
    const { baikeCategory, categoryName } = this.state;
    return (
      <Layout {...this.props}>
        <div className="container-detail-box">
          <DetailHeader {...this.props} />
          <div className="baike-content main-content clearfix">
            {
              categoryName ?
                <div className="baike-content__breadcrumb">
                  <Breadcrumb>
                    <Breadcrumb.Item>
                      <a href="/">{currentCity.name + domainDetail.companyName}</a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                      <a href={`/${pageName.key}`}>{currentCity.name}房产{pageName.name}</a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>{currentCity.name + categoryName}</Breadcrumb.Item>
                  </Breadcrumb>
                </div>
                :
                null
            }
            <div className="baike-content__left float-left">
              <BaikeCategory baikeCategory={baikeCategory} { ...this.props }/>
            </div>
            <div className="baike-content__right float-right">
              <div className="baike-content__right__list">
                {
                  categoryName ?
                    <div className="title">{categoryName}</div>
                    :
                    null
                }
                {
                  code.includes('rs') ?
                    <div className="title" style={{ fontWeight: 'normal' }}>为您找到
                      <span style={{ color: 'red' }}>{newBaikeList.totalNum}</span>篇 的 相关的文章</div>
                    :
                    null
                }

                <List size="large">
                  {
                    newBaikeList.data.map((item) => {
                      const title = Array.isArray(item.title) ? item.title[0] : item.title;
                      return (
                        <List.Item className="item" key={item.id}>
                          <div className="clearfix">
                            <a
                              className="float-left item__a"
                              href={`/${pageName.key}/${item.id}.html`}
                              target="_blank"
                            >
                              <img src={item.imagePath} alt={title}/>
                            </a>
                            <a
                              className="item__tit"
                              href={`/${pageName.key}/${item.id}.html`}
                              target="_blank"
                              dangerouslySetInnerHTML={{ __html: title }}
                            />
                            <div className="item__desc">{item.summary}</div>
                            <div className="item__time">{item.publishTime ? dayjs(item.publishTime).format(format) : '暂无'}</div>
                            {/*<div className="">*/}
                            {/*<a href="#" className="item__label">购房资质</a>*/}
                            {/*</div>*/}
                          </div>
                        </List.Item>
                      )
                    })
                  }
                </List>
              </div>

              {
                newBaikeList.data.length === 0 ?
                  <div style={{ marginTop: 160 }}>
                    <Empty />
                  </div>
                  :
                  <div className="float-right">
                    <Pagination
                      defaultPageSize={15}
                      defaultCurrent={newBaikeList.pageIndex + 1}
                      total={newBaikeList.totalNum}
                      itemRender={(page, type) => {
                        const path = localPath.split('/pg')[0].split('/');
                        path.push(`pg${page}`);
                        if (type === 'jump-prev' || type === 'jump-next') {
                          return (
                            <a style={{ display: 'block', margin: '0' }} href={path.join('/')}
                               className="ant-pagination-item-link">
                              <div className="ant-pagination-item-container">
                                <i aria-label="icon: double-left"
                                   className="anticon anticon-double-left ant-pagination-item-link-icon">
                                  <svg viewBox="64 64 896 896" className="" data-icon="double-left" width="1em" height="1em"
                                       fill="currentColor" aria-hidden="true" focusable="false">
                                    <path
                                      d="M272.9 512l265.4-339.1c4.1-5.2.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L186.8 492.3a31.99 31.99 0 0 0 0 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H532c6.7 0 10.4-7.7 6.3-12.9L272.9 512zm304 0l265.4-339.1c4.1-5.2.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L490.8 492.3a31.99 31.99 0 0 0 0 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H836c6.7 0 10.4-7.7 6.3-12.9L576.9 512z"></path>
                                  </svg>
                                </i><span className="ant-pagination-item-ellipsis">•••</span></div>
                            </a>
                          )
                        }

                        if (type === 'prev') {
                          return (
                            <a style={{ display: 'block', margin: '0' }} href={path.join('/')}
                               className="ant-pagination-item-link">
                              <i aria-label="icon: left" className="anticon anticon-left">
                                <svg viewBox="64 64 896 896" className="" data-icon="left" width="1em" height="1em"
                                     fill="currentColor" aria-hidden="true" focusable="false">
                                  <path
                                    d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 0 0 0 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"></path>
                                </svg>
                              </i></a>
                          )
                        }

                        if (type === 'next') {
                          return (
                            <a style={{ display: 'block', margin: '0' }} className="ant-pagination-item-link">
                              <i aria-label="图标: right" className="anticon anticon-right">
                                <svg viewBox="64 64 896 896" className="" data-icon="right" width="1em" height="1em"
                                     fill="currentColor" aria-hidden="true" focusable="false">
                                  <path
                                    d="M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z"></path>
                                </svg>
                              </i>
                            </a>
                          )
                        }

                        return (
                          <a style={{ display: 'block', margin: '0' }} href={path.join('/')}>
                            {page}
                          </a>
                        )

                      }}
                    />
                  </div>
              }


            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default Index;
