/**
 * Created by JackieWu on 2018/7/15.
 */
import React, {Component} from 'react';
import { Dropdown, Icon, Menu, Row, Col, Checkbox, Popconfirm, Spin, Select } from 'antd';
import './index.less';
import fetch from "../../../libs/fetch";
import _ from 'lodash';
import axios from 'axios';
const CancelToken = axios.CancelToken;

const Option = Select.Option;

const postionFirst = 11;
const postionSecond = 13;
const postionThird = 15;
let cancelTokenSave = undefined;
const offsetHeight = 80;

class App extends Component {
  constructor (props) {
    super(props);
    this.nowPosiotn = postionFirst;
    this.state = {
      page: [
        {
          name: '二手房',
          key: 'ershoufang',
          ajax: {
            list: '/api/map/mapEsf',
            detail: '/api/map/getMapDetailInfo'
          }
        },
        {
          name: '新房',
          key: 'loupan',
        },
      ],
      containerHeight: 0,
      condition: [
        {
          name: '售价',
          key: '1',
          input: true,
          data: [
            {
              label: '200万以下',
              key: 'sss',
            },
            {
              label: '200万以下',
              key: 'sss1',
            },
            {
              label: '200万以下',
              key: 'sss2',
            },
          ],
        },
        {
          name: '房型',
          key: '2',
          input: true,
          data: [
            {
              label: '200万以下',
              key: 'sss',
            },
            {
              label: '200万以下',
              key: 'sss1',
            },
            {
              label: '200万以下',
              key: 'sss2',
            },
          ],
        }
      ],
      nowSelectSave: {},
      conditionParam: {},
      nowMapPosition: {
        type: 'first',
        customType: 'firstCustomRound'
      },
      mapData: [],

      searchList: [],
      searchSelectValue: '',
      fetching: false,
      isFocus: false,
    };
  }


  componentWillMount() {
    console.log(this.props);
    const { code } = this.props;
    this.state.page.forEach((item) => {
      if (item.key === code) {
        this.setState({
          nowSelectSave: this.state.page[0],
          getCondition: this.props.getCondition
        })
      }
    });
  }

  componentDidMount () {
    this.marker = require('../libs/marker');

    this.getInitData();
    this.setState({
      containerHeight: document.body.offsetHeight - offsetHeight
    });
    window.onresize = () => {
      this.setState({
        containerHeight: document.body.offsetHeight - offsetHeight
      });
    };

  }

  getInitData = () => {
    let {  nowSelectSave } = this.state;
    const { currentCity } = this.props;
    const { nowMapPosition, conditionParam } = this.state;
    this.nowPosiotn = postionFirst;

    fetch(nowSelectSave.ajax.list, {
      type: nowMapPosition.type,
      cityId: currentCity.id,
      ...conditionParam,
    }).then((data) => {
      this.initMap(data.data);
    });

  };

  initMap = (data) => {
    const { currentCity } = this.props;
    const self = this;
    // 清空 map 重新加载map
    this.map = null;
    this.map = new window.BMap.Map("mapContainer",  {
      enableMapClick:false,  // 关闭默认提示
    });

    this.map.centerAndZoom(new BMap.Point(currentCity.longitude, currentCity.latitude), this.nowPosiotn);
    // 支持滚滚轮
    this.map.enablePinchToZoom();
    this.map.enableScrollWheelZoom(true);

    // this.map.addControl(new BMap.NavigationControl({
    //   enableGeolocation: true
    // }));

    data.forEach((item) => {
      this.map.addOverlay(
        new this.marker.firstCustomRound(
          this.map,
          new BMap.Point(item.xaxis, item.yaxis),
          item
        )
      );
    });
    // 给页面第一层添加事件
    this.mapRoundClick();
    // document.addEventListener('click', this.mapRoundClick, false);

    this.map.addEventListener("zoomend", function (e) {
      self.nowPosiotn = self.map.getZoom();
      self.mapData();
    });

    // document.querySelector('.anchorBL').className = 'hidden';

    // this.map.addControl(new BMap.GeolocationControl());

  };

  mapRoundClick = () => {
    [].forEach.call(document.querySelectorAll('.J_map-round'), (item) => {
      item.removeEventListener('click', this.mapRoundClickFunction.bind(this), false);
      item.addEventListener('click', this.mapRoundClickFunction.bind(this), false);
    });
  };

  thirdRoundClick = () => {
    [].forEach.call(document.querySelectorAll('.J_map-info'), (item) => {
      item.removeEventListener('click', this.thirdInfoClickFuntion.bind(this), false);
      item.addEventListener('click', this.thirdInfoClickFuntion.bind(this), false);
    });
  };

  thirdInfoClickFuntion (event) {
    this.openThirdFunction(event.target.getAttribute('data-id'));
    this.map.panTo(new BMap.Point(event.target.getAttribute('data-x'), event.target.getAttribute('data-y')));
  }

  openThirdFunction = (id) => {
    const { nowSelectKey } = this.state;

    this.marker.addActive(id);

    // this.drawerChange(nowSelectKey, id);
  };

  mapRoundClickFunction (event) {
    // 清理地图上的点
    if (this.map.getZoom() <= postionFirst) {
      this.nowPosiotn = postionSecond;
    } else if (this.map.getZoom() > postionFirst && this.map.getZoom() <= postionSecond) {
      this.nowPosiotn = postionThird;
    }
    if (event) {
      this.mapData(event.target.getAttribute('data-x'), event.target.getAttribute('data-y'));
    } else {
      this.mapData();
    }
  };

  // 获取每一层的信息
  mapData = (x, y) => {
    const { nowMapPosition } = this.state;
    let isGet = false;
    if (this.nowPosiotn === postionFirst) {
      nowMapPosition.type = 'first';
      nowMapPosition.customType = 'firstCustomRound';
      isGet = true;
    } else if (this.nowPosiotn === postionSecond) {
      nowMapPosition.type = 'second';
      nowMapPosition.customType = 'secondCustomRound';
      isGet = true;
    } else if (this.nowPosiotn === postionThird) {
      nowMapPosition.type = 'third';
      nowMapPosition.customType = 'thirdCustomRound';
      isGet = true;
    }

    if (isGet) {
      this.setState({
        nowMapPosition,
      }, () => {
        this.getMapInfoSend(x, y);
      });
    }
  };

  getMapInfoSend = (x, y) => {
    const { currentCity } = this.props;
    let { mapData, nowSelectSave, conditionParam, nowMapPosition } = this.state;

    // Toast.loading('数据加载中', 100000);

    fetch(nowSelectSave.ajax.list, {
      type: nowMapPosition.type,
      cityId: currentCity.id,
      ...conditionParam,
    }).then((data) => {
      mapData = data.data;
      this.setState({
        mapData,
      }, () => {
        // Toast.hide();
        this.overlayDraw({
          x,
          y,
          type: nowMapPosition.customType
        });
      });
    });
  };

  overlayDraw = (options) => {
    const { mapData } = this.state;
    const { x, y, type } = options;
    this.map.clearOverlays();
    if (x && y) {
      this.map.centerAndZoom(new BMap.Point(x, y), this.nowPosiotn);
    }

    mapData.forEach((item) => {
      this.map.addOverlay(
        new this.marker[type](
          this.map,
          new BMap.Point(item.xaxis, item.yaxis),
          item
        )
      );
    });
    // 如果大于等于第三层 那么去做第三层的点击事件
    if (this.nowPosiotn >= postionThird) {
      this.thirdRoundClick();
    } else {
      this.mapRoundClick();
    }
  };



  condCheckChange = () => {
    console.log('123123');
  };
  confirm = () => {
    console.log('123123');
  };

  fetchHouse = _.debounce((value) => {
    const { nowSelectSave } = this.state;
    const { currentCity } = this.props;

    if (cancelTokenSave) {
      cancelTokenSave();
    }

    this.setState({
      fetching: true,
    });

    fetch('/api/map/search', {
      type: nowSelectSave.key,
      cityId: currentCity.id,
      t: value
    }, {
      cancelToken: new CancelToken(function (cancel) {
        cancelTokenSave = cancel;
      })
    }).then((data) => {
      data.data.unshift({
        buildingName: '查看全部',
        no: 'none'
      });
      this.setState({
        searchList: data.data,
        fetching: false,
      })
    });
  }, 500);

  searchChange = (value, options) => {
    this.setState({
      searchSelectValue: value,
      data: [],
      fetching: false,
    });
  };

  searchEnter = () => {
    const { searchSelectValue } = this.state;
    console.log(searchSelectValue);
  };

  selectFocusAndBlur = (type) => {
    this.setState({
      isFocus: type === 'focus',
    });
  };

  render () {
    const { page, containerHeight, condition, fetching, isFocus, searchList } = this.state;
    return (
      <div className="ditu-main">
        <div className="header clearfix">
          <Dropdown overlay={
            <Menu selectedKeys={[ page[0].key ]}>
              {
                page.map((item) => (
                  <Menu.Item
                    key={item.key}
                  >
                    <a href={`/ditu/${item.key}`}>
                      {item.name}
                    </a>
                  </Menu.Item>
                ))
              }
            </Menu>
          } trigger={['click']}>
            <div className="condition pages float-left">
              <span style={{ marginRight: 3 }}>{page[0].name}</span>
              <Icon type="down" />
            </div>
          </Dropdown>

          <div className="search condition float-left clearfix">
            <div className="search__box">
              <Select
                showSearch
                showArrow={false}
                placeholder="请输入小区或地跌开始找房"
                notFoundContent={fetching ? <Spin size="small" /> : null}
                filterOption={false}
                onSearch={(value) => this.fetchHouse(value)}
                onChange={(value, options) => this.searchChange(value, options)}
                style={{ width: '100%' }}
                onFocus={() => this.selectFocusAndBlur('focus')}
                onBlur={() => this.selectFocusAndBlur('blur')}
              >
                {
                  searchList.map((item) => (
                    <Option
                      key={item.no}
                    >
                      <div className="clearfix search-list">
                        <div className="float-left title">{item.buildingName}</div>
                        {
                          item.houseCount && <div className="float-right tips">约{ item.houseCount }套在售</div>
                        }
                      </div>
                    </Option>
                  ))
                }
              </Select>
              <i
                className="iconfont icon-xiazai5 float-right"
                onClick={() => this.searchEnter()}
              />
            </div>

          </div>

          {
            condition.map((it) => (
              <Popconfirm
                placement="bottom"
                onConfirm={() => confirm}
                okText="确定"
                cancelText="取消"
                icon={<div />}
                key={it.key}
                title={
                  <div>
                    <Checkbox.Group style={{ width: '100%' }} onChange={() => this.condCheckChange()}>
                      <Row>
                        {
                          it.data.map((item) => (
                            <Col span={12} key={item.key}><Checkbox value={item.key}>{item.label}</Checkbox></Col>
                          ))
                        }
                      </Row>
                    </Checkbox.Group>
                  </div>
                }
                trigger={['click']}
              >
                <div className="condition pages float-left">
                  <span style={{ marginRight: 3 }}>{it.name}</span>
                  <Icon type="down" />
                </div>
              </Popconfirm>
            ))
          }

        </div>
        {
          isFocus ?
            <div style={{
              height: containerHeight,
              width: '100%',
              background: 'transparent',
              position: 'absolute',
              top: 50,
              left:0,
              zIndex: 99,
            }} />
            : ''
        }

        <div
          style={{
            height: containerHeight,
            position: 'absolute',
          }}
          className="left-drawer"
        >

        </div>

        <div className="container" id="mapContainer" style={{ height: containerHeight }} />
      </div>
    )
  }
}

export default App;
