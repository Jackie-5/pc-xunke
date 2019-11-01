/**
 * Created by Jackie.Wu on 2018/7/25.
 */
import React, { Component } from 'react';
import './baike-category.less';

export default class Left extends Component{
  render() {
    const { baikeCategory = [], pageName } = this.props;

    return (
      <div className="baike-left-content">
        <div className="title">
          <span className="title__t">{pageName.name}</span>
          <span>分类</span>
        </div>
        <div className="content">
          {
            baikeCategory.map((item) => {
              return (
                <dl key={item.id}>
                  <dt>
                    <a
                      href={`/${pageName.key}/${item.id}`}
                      className={item.active ? 'content--active' : ''}
                      target="_blank"
                    >
                      {item.name}
                    </a>
                  </dt>
                  <dd className="clearfix">
                    {
                      item.childs && item.childs.map((it) => {
                        return (
                          <a
                            className={`float-left ${it.active ? 'content--active' : ''}`}
                            key={it.id}
                            href={`/${pageName.key}/${it.id}`}
                            target="_blank"
                          >
                            {it.name}
                          </a>
                        )
                      })
                    }
                  </dd>
                </dl>
              )
            })
          }
        </div>
      </div>
    )
  }
}
