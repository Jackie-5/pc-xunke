/**
 * Created by JackieWu on 2018/7/15.
 */
import React from 'react';
import { Carousel, Row, Col, Tabs } from 'antd';
import BaikeCategory from '../libs/baike-category';
import BaikeList from '../libs/baike-nav-list';
import DetailHeader from '../libs/detail-header.js'
import './baike-less.less';
import Layout from '../../../layout/layout-box';

const TabPane = Tabs.TabPane;

class Index extends React.Component {
  constructor(props) {
    super(props);
    const { baikeCategory, mainList } = props;
    const baikeTabs = [];
    baikeCategory.forEach((item) => {
      if (item.name.includes('房') && item.childs && item.childs.length > 0) {
        item.childs.forEach((it) => {
          it.list = [];
          if (Number(it.id) && mainList[Number(it.id)]) {
            it.list = mainList[Number(it.id)];
          }
        });
        baikeTabs.push(item);
      }
    });

    this.state = {
      baikeTabs,
      baikeIndex: [
        'https://sitemap-qa.oss-cn-hangzhou.aliyuncs.com/common_image/neirong1507709019phpBtxBCq.jpeg',
        'https://sitemap-qa.oss-cn-hangzhou.aliyuncs.com/common_image/neirong1507710392phpthnpNH.jpeg',
        'https://sitemap-qa.oss-cn-hangzhou.aliyuncs.com/common_image/test1470637365phpG2SEwk.jpeg',
      ],
    };
  }

  render() {
    const { newBaikeList, pageName } = this.props;
    const { baikeTabs, baikeIndex } = this.state;

    return (
      <Layout { ...this.props }>
        <DetailHeader { ...this.props} />
        <div className="container-detail-box">
          <div className="baike-content main-content clearfix">
            <div className="baike-content__left float-left">
              <BaikeCategory { ...this.props } />
              <BaikeList { ...this.props } />
            </div>
            <div className="baike-content__right float-right">
              <Carousel autoplay>
                {
                  newBaikeList && newBaikeList.data.map((item, i) => {
                    if (i < 3) {
                      return (
                        <a
                          href={`/${pageName.key}/${item.id}.html`}
                          target="_blank"
                          className="baike-content__right__carousel"
                          key={item.id}
                        >
                          <div className="layer" />
                          <img
                            src={baikeIndex[i]} alt={item.title}/>
                          <div className="title">
                            <div className="tit">{item.title}</div>
                            <div className="subtit">{item.summary}</div>
                          </div>
                        </a>
                      )
                    }
                  })
                }
              </Carousel>

              <div className="baike-content__right__card">
                <Row gutter={16}>
                  {
                    newBaikeList && newBaikeList.data.map((item, i) => {
                      if (i > 3 && i < 7) {
                        return (
                          <Col
                            span={8}
                            key={item.id}
                          >
                            <a
                              className="baike-content__right__card__a"
                              href={`/${pageName.key}/${item.id}.html`}
                            >
                              <div className="layer" />
                              <div className="title">
                                <div className="tit">{item.title}</div>
                                <div className="subtit">{item.summary}</div>
                              </div>
                              <img src={item.imagePath} alt={item.title} />
                            </a>
                          </Col>
                        )
                      }
                    })
                  }
                </Row>
              </div>

              <div className="btn-lookmore">
                {/*<a target="_blank" href="/bj/baike/zhuanti/">浏览过往更多专题</a>*/}
              </div>

              <div className="baike-content__right__tabs">

                <Tabs
                  animated={false}
                >
                  {
                    baikeTabs.map((item) => (
                      <TabPane
                        tab={item.name}
                        key={item.id}
                      >
                        {
                          item.childs.map((it, index) => {
                            if (it.list.length > 0) {
                              return (
                                <div
                                  className="tab-cards"
                                  key={it.id}
                                >
                                  <a
                                    href={`/${pageName.key}/${it.id}`}
                                    target="_blank"
                                    className="btn-more"
                                  >
                                    更多
                                  </a>
                                  {/*<div className="tab-cards__icon">*/}
                                    {/*<div className="iconfont icon-iconfontjiantou1 float-left" />*/}
                                    {/*<div className="iconfont icon-iconfontjiantou1 float-right icon-right" />*/}
                                  {/*</div>*/}
                                  <div className="card-hd">
                                    <div className="index">{index.toString().length === 1 ? `0${index + 1}` : index + 1}</div>
                                    <div className="tit">{it.name}</div>
                                    <div className="subtit">有购房资质了吗，资金准备好了吗？开始寻找房源吧</div>
                                  </div>
                                  <div className="card-bd">
                                    <Row gutter={16}>
                                      {
                                        it.list.map((listItem) => (
                                          <Col
                                            span={12}
                                            key={listItem.id}
                                          >
                                            <div className="card-bd__item">
                                              <a className="card" href={`/${pageName.key}/${listItem.id}.html`} target="_blank">
                                                <div className="tit">{listItem.title}</div>
                                                <div className="subtit">{listItem.summary}</div>
                                              </a>
                                            </div>
                                          </Col>
                                        ))
                                      }
                                    </Row>
                                  </div>
                                </div>
                              )
                            }
                          })
                        }
                      </TabPane>
                    ))
                  }
                </Tabs>
              </div>


            </div>
          </div>
        </div>
      </Layout>
    )
}
}
export default Index;
