/**
 * Created by JackieWu on 2018/7/20.
 */
import React, {Component} from 'react';
import '../less/layout-footer.less';

class Footer extends Component {
  constructor(props){
    super(props);
    const { domainDetail } = props;
    this.state = {
      firendsLinkJson: [
        {"name": "上海", "link": 'sh', "target": "_blank"},
        {"name": "无锡", "link": "wx", "target": "_blank"},
        {"name": "常州", "link": "cz", "target": "_blank"},
        {"name": "苏州", "link": "su", "target": "_blank"},
        {"name": "南通", "link": "nt", "target": "_blank"},
        {"name": "扬州", "link": "yz", "target": "_blank"},
        {"name": "镇江", "link": "zj", "target": "_blank"},
        {"name": "泰州", "link": "tz", "target": "_blank"},
        {"name": "张家港", "link": "zjg", "target": "_blank"},
        {"name": "常熟", "link": "cs", "target": "_blank"},
        {"name": "太仓", "link": "tc", "target": "_blank"},
        {"name": "昆山", "link": "ks", "target": "_blank"},
        {"name": "江阴", "link": "jy", "target": "_blank"},
        {"name": "宜兴", "link": "yx", "target": "_blank"},
        {"name": "杭州", "link": "hz", "target": "_blank"},
        {"name": "宁波", "link": "nb", "target": "_blank"},
        {"name": "温州", "link": "wz", "target": "_blank"},
        {"name": "嘉兴", "link": "jx", "target": "_blank"},
        {"name": "湖州", "link": "hu", "target": "_blank"},
        {"name": "绍兴", "link": "sx", "target": "_blank"},
        {"name": "金华", "link": "jh", "target": "_blank"},
        {"name": "衢州", "link": "qz", "target": "_blank"},
        {"name": "舟山", "link": "zs", "target": "_blank"},
        {"name": "台州", "link": "tai", "target": "_blank"},
        {"name": "丽水", "link": "ls", "target": "_blank"},
        {"name": "昆明", "link": "km", "target": "_blank"},
        {"name": "海南", "link": "hn", "target": "_blank"}
      ],
      footerJson: [
        {
          "link": "/about/events",
          "name": `${domainDetail.companyName}大事记`,
          "target": "_blank"
        },
        {
          "link": "/about",
          "name": `关于${domainDetail.companyName}`,
          "target": "_blank"
        },
        {
          "link": "/about/contactus",
          "name": "联系我们",
          "target": "_blank"
        },
        {
          "link": "/zhaopin",
          "name": "加入我们",
          "target": "_blank"
        },
        {
          "link": "/about/privacy",
          "name": "隐私声明",
          "target": "_blank"
        },
        {
          "link": "/sitemap",
          "name": "网站地图",
          "target": "_blank"
        }
      ]
    };
  }

  componentDidMount () {
  }

  render () {
    const { domainDetail } = this.props;
    const {firendsLinkJson, footerJson} = this.state;
    return (
      <div className="layout-footer">
        <div className="layout-footer__main clearfix">
          {
            footerJson.map(
              (item) =>
                <div className="layout-footer__main__list float-left" key={item.link}>
                  <a rel="" href={item.link} target={item.target}>{item.name}</a>
                </div>
            )
          }
          <div className="float-right layout-footer__main__list phone">官方客服 { domainDetail.switchboardPhone }</div>
        </div>

        <div className="layout-footer__friend">
          <div className="layout-footer__friend__title">
                  合作与友情链接
          </div>
          <div className="layout-footer__friend__list">
            {
              firendsLinkJson.map(
                (item) =>
                  <div className="float-left layout-footer__friend__list__item" key={item.link}>
                    <a href={`http://${item.link}.${domainDetail.domainUrl}`} target={item.target}>{item.name}</a>
                  </div>
              )
            }
          </div>
          <div className="layout-footer__friend__list__img">
            <img src="https://sitemap-qa.oss-cn-hangzhou.aliyuncs.com/tocPc/static/images/erweima.jpg"/>
          </div>
        </div>

        <div className="layout-footer__copyright">
          <p>苏州市{domainDetail.domainName} | 网络经营许可证 {domainDetail.ipc} </p>
        </div>
      </div>
    )
  }
}

export default Footer;
