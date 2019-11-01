/**
 * Created by Jackie.Wu on 2018/7/25.
 */

import React, { Component } from 'react';
import BaikeList from '../libs/baike-nav-list';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Layout from "../../../layout/layout-box";
import DetailHeader from "../libs/detail-header";
import { Breadcrumb } from 'antd';
import dayjs from 'dayjs';
import './baike-less.less';


class Index extends Component {

  render() {
    const { domainDetail, detailBaike = {}, pageName, currentCity } = this.props;
    const { detail = {}, recommands = [] } = detailBaike;
    return (
      <Layout {...this.props}>
        <div className="container-detail-box">
          <DetailHeader {...this.props} />
          <div className="main-content baike-content">

            <div className="baike-content__bread">
              <Breadcrumb>
                <Breadcrumb.Item>
                  <a href="/">{currentCity.name + domainDetail.companyName}</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <a href={`/${pageName.key}`}>{currentCity.name}房产{pageName.name}</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <a href={`/${pageName.key}/0${detail.parentCode}`}>{currentCity.name + detail.parentName}</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>正文</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            
            <div className="container-detail-content clearfix">
              <div className="container-detail-content__l float-left">
                <h1 className="title">{detail.title || ''}</h1>
                <div className="meta clearfix">
                  <div className="float-left"><span
                    className="time">发布时间：{ detail.publishTime?  dayjs(detail.publishTime).format('YYYY-MM-DD HH:mm:ss') : '暂无时间'}</span><span
                    className="author">作者：{detail.author}</span></div>
                  <div className="float-right"><span
                    className="source">来源：<span>{detail.source}</span></span></div>
                </div>
                {
                  detail.summary ?
                    <p className="summary">
                      <span>文章摘要：</span>
                      <span>{detail.summary}</span>
                    </p>
                    :
                    null
                }

                <div dangerouslySetInnerHTML={{ __html: detail.content ? detail.content.replace('/\/g', '') : '' }}/>
              </div>
              <div className="container-detail-content__r float-right">
                <BaikeList newBaikeList={this.props.newBaikeList} moreCode={detail.parentCode} { ...this.props } />
              </div>
            </div>

            <div className="suggest_question">
              <p className="title">看了又看</p>
              <Row gutter={16} className="list">
                {
                  recommands.map((item) => (
                    <Col key={item.id} className="item" span={6}>
                      <a href={`/${pageName.key}/${item.id}.html`} className="question_item"
                         target="_blank">
                        <img src={item.imagePath} alt={item.title} />
                        <span className="question_title">{item.title}</span>
                        <span className="bottom_info clear">
                          <em className="float-left">{dayjs(item.createTime).format('YYYY-MM-DD')}</em>
                          <em className="float-right">{item.voteUp}浏览</em>
                        </span>
                      </a>
                    </Col>
                  ))
                }
              </Row>
            </div>

            <div className="tips">
              {domainDetail.companyName}声明：此信息系转载自其他媒体，版权归属于原作者，{domainDetail.companyName}转载此文出于传递更多信息之目的，并不意味着赞同其观点或证实其描述。文章内容仅供参考。如本网站转载的作品涉及版权问题，请原作者持相应版权证明与本网站联系。
            </div>

          </div>
        </div>
      </Layout>
  )
  }
  }

  export default Index;
