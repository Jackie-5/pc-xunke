/**
 * Created by Longe on 2018/7/20.
 */
import React, {Component} from 'react';
import '../../less/calculator.less';
import {Button, Select, Input, message} from 'antd';
import {base_cal_1, base_cal_2} from './base_cal';
import cal_tax from './base_cal_by_tax';
import '../../less/calculator.less'

const Option = Select.Option;

class Calculatorer extends Component {

  constructor() {
    super();
    this.state = {
      cssTax1: {
        "color": "#9c9e9f"
      },

      cssTax2: {
        "color": "black"
      },
      cssTax3: {
        "color": "black"
      },

      cssTax4: {
        "color": "#9c9e9f"
      },

      showFlagTaxType: true,
      showFlagResult: true,
      loanTime: Array(30).fill(1),
      saleCountList: [0.95, 0.9, 0.88, 0.85, 0.82, 1, 1.1, 1.2, 1.3],
      sellPrice: 1,
      loanLilvTypeString: "商业贷款",
      loanAllMoney: "",
      loanPercent: 50,  //100份 50就是 50%,
      init_shangye_daikuan_lilv: 4.9,
      init_gongjijin_lilv: 3.25,
      daikuan_lilv: 0,
      chosePageFlag: 1,
      zuhe_shangye_daikuan_lilv: 0,
      zuhe_gongjijin_daikuan_lilv: 0,
      shangyeloanAllMoney: "",
      gongjijinloanAllMoney: "",
      loanMonth: 25,
      calResult: {
        benxi: {
          subMonthMoney: "",
          month: "",
          allInterest: "",
          allMoney: ""

        },
        benjin: {
          subMonthMoney: "",
          step: "",
          month: "",
          allInterest: "",
          allMoney: ""

        }
      },
      jizhengfangshi: "总价",

      taxCalhouseType: "普通住宅",      // 住宅类型
      taxCalisUnique: "唯一住宅",       // 是否唯一
      taxCalregisterTime: "满五年",   // 距离上次交易
      taxCalisFirst: "首套",        // 买房家庭套餐
      taxCaltotalArea: "",      // 房屋面积
      taxCaltotalPrice: "",     // 房屋总价
      taxCaldiffPrice: "",      // 买卖差价

      taxTotalMoney: "",   //税费计算器总数
      taxQishui: "",       //契税
      taxzengzhishui: "",  //增值税
      taxgeshui: "",   //个税

    };
  }

  componentDidMount() {
    const sellPrice = this.props.sellPrice * this.state.loanPercent / 100;
    if (sellPrice !== 0) {
      this.setState({loanAllMoney: sellPrice});
    }
    this.setState({daikuan_lilv: this.state.init_shangye_daikuan_lilv})
  }

  typeChange = (val) => {


    if (val == 2) {

      this.setState({loanLilvTypeString: "公积金贷款"})
      this.state.daikuan_lilv = this.state.init_gongjijin_lilv
      this.state.chosePageFlag = 1


    }
    else if (val == 3) {
      this.setState({loanLilvTypeString: "组合贷款"})
      this.state.chosePageFlag = 1
      this.state.zuhe_shangye_daikuan_lilv = this.state.init_shangye_daikuan_lilv
      this.state.zuhe_gongjijin_daikuan_lilv = this.state.init_gongjijin_lilv
    }
    else {
      this.setState({loanLilvTypeString: "商业贷款"})
      this.state.daikuan_lilv = this.state.init_shangye_daikuan_lilv
      this.state.chosePageFlag = 1
    }

  };

  liLvChange = (val, loanType) => {
    let cur_lilv;
    if (loanType == "商业贷款") {
      cur_lilv = val * this.state.init_shangye_daikuan_lilv;
      this.setState({daikuan_lilv: Number(cur_lilv.toFixed(2))})
    }
    if (loanType == "公积金贷款") {
      cur_lilv = val * this.state.init_gongjijin_lilv;
      this.setState({daikuan_lilv: Number(cur_lilv.toFixed(2))})

    }
    this.state.chosePageFlag = val
  };

  ZuheliLvChange = (val, loanType) => {
    let cur_lilv;
    if (loanType == "商业贷款") {
      cur_lilv = val * this.state.init_shangye_daikuan_lilv;
      this.setState({zuhe_shangye_daikuan_lilv: Number(cur_lilv.toFixed(2))})
    }
    if (loanType == "公积金贷款") {
      cur_lilv = val * this.state.init_gongjijin_lilv;
      this.setState({zuhe_gongjijin_daikuan_lilv: Number(cur_lilv.toFixed(2))})

    }
    this.state.chosePageFlag = val
  };

  percentChange = (val) => {
    let real_money = this.props.sellPrice * val / 100;
    this.setState({loanAllMoney: real_money})
    this.setState({loanPercent: val})
  };

  zuhe_loan_all_money = (event) => {
    this.setState({
      shangyeloanAllMoney: event.target.value,
      gongjijinloanAllMoney: this.state.loanAllMoney - event.target.value
    })
  };

  loanMonthChange = (val) => {
    this.setState({loanMonth: val})
  };

  jizhengfangshi = (val) => {
    this.setState({jizhengfangshi: val})
  };

  taxTotalArea = (e) => {
    this.setState({taxCaltotalArea: e.target.value})
  };

  taxTotalPrice = (e) => {
    this.setState({taxCaltotalPrice: e.target.value});
  };

  taxDiffPrice = (e) => {
    this.setState({taxCaldiffPrice: e.target.value});
  };

  cal1 = () => {
    if (this.state.loanLilvTypeString == "组合贷款" && this.state.shangyeloanAllMoney == "") {
      message.info('请输入商业贷款金额');
      return
    }

    if (this.state.loanLilvTypeString == "商业贷款" || this.state.loanLilvTypeString == "公积金贷款") {
      let liLv = this.state.daikuan_lilv / 100;
      let allMoney = this.state.loanAllMoney * 10000;
      let month = this.state.loanMonth * 12;

      let result1_list = base_cal_1(liLv, allMoney, month);
      let result2_list = base_cal_2(liLv, allMoney, month);

      //等额本息
      this.setState(prevState => ({
        ...prevState,
        calResult: {
          ...prevState.calResult,
          benxi: {
            ...prevState.calResult.benxi,
            month: month
          }
        }
      }))

      this.setState(prevState => ({
        ...prevState,
        calResult: {
          ...prevState.calResult,
          benxi: {
            ...prevState.calResult.benxi,
            subMonthMoney: result1_list[0]
          }
        }
      }))

      this.setState(prevState => ({
        ...prevState,
        calResult: {
          ...prevState.calResult,
          benxi: {
            ...prevState.calResult.benxi,
            allInterest: result1_list[2]
          }
        }
      }))

      this.setState(prevState => ({
        ...prevState,
        calResult: {
          ...prevState.calResult,
          benxi: {
            ...prevState.calResult.benxi,
            allMoney: result1_list[1]
          }
        }
      }))

      // 等额本金
      this.setState(prevState => ({
        ...prevState,
        calResult: {
          ...prevState.calResult,
          benjin: {
            ...prevState.calResult.benjin,
            subMonthMoney: result2_list[0]
          }
        }
      }))

      this.setState(prevState => ({
        ...prevState,
        calResult: {
          ...prevState.calResult,
          benjin: {
            ...prevState.calResult.benjin,
            month: month
          }
        }
      }))

      this.setState(prevState => ({
        ...prevState,
        calResult: {
          ...prevState.calResult,
          benjin: {
            ...prevState.calResult.benjin,
            step: result2_list[1]
          }
        }
      }))

      this.setState(prevState => ({
        ...prevState,
        calResult: {
          ...prevState.calResult,
          benjin: {
            ...prevState.calResult.benjin,
            allInterest: result2_list[2]
          }
        }
      }))

      this.setState(prevState => ({
        ...prevState,
        calResult: {
          ...prevState.calResult,
          benjin: {
            ...prevState.calResult.benjin,
            allMoney: result2_list[3]
          }
        }
      }))

    }

    if (this.state.loanLilvTypeString == "组合贷款") {
      let month = this.state.loanMonth * 12;
      // 商业
      let SliLv = this.state.zuhe_shangye_daikuan_lilv / 100;
      let SallMoney = this.state.shangyeloanAllMoney * 10000;
      let Sresult1_list = base_cal_1(SliLv, SallMoney, month);
      let Sresult2_list = base_cal_2(SliLv, SallMoney, month);


      // 公积金
      let GliLv = this.state.zuhe_gongjijin_daikuan_lilv / 100;
      let GallMoney = this.state.gongjijinloanAllMoney * 10000;
      let Gresult1_list = base_cal_1(GliLv, GallMoney, month);
      let Gresult2_list = base_cal_2(GliLv, GallMoney, month);

      let totalMoneySubMonth1 = Number(Sresult1_list[0]) + Number(Gresult1_list[0]);
      let totalAllMoney1 = Number(Sresult1_list[1]) + Number(Gresult1_list[1]);
      let totalInterest1 = Number(Sresult1_list[2]) + Number(Gresult1_list[2]);

      let totalMoneySubMonth2 = Number(Sresult2_list[0]) + Number(Gresult2_list[0]);
      let totalStep2 = Number(Sresult2_list[1]) + Number(Gresult2_list[1]);
      let totalAllMoney2 = Number(Sresult2_list[3]) + Number(Gresult2_list[3]);
      let totalInterest2 = Number(Sresult2_list[2]) + Number(Gresult2_list[2]);


      //等额本息
      this.setState(prevState => ({
        ...prevState,
        calResult: {
          ...prevState.calResult,
          benxi: {
            ...prevState.calResult.benxi,
            month: month
          }
        }
      }));

      this.setState(prevState => ({
        ...prevState,
        calResult: {
          ...prevState.calResult,
          benxi: {
            ...prevState.calResult.benxi,
            subMonthMoney: totalMoneySubMonth1
          }
        }
      }))

      this.setState(prevState => ({
        ...prevState,
        calResult: {
          ...prevState.calResult,
          benxi: {
            ...prevState.calResult.benxi,
            allInterest: totalInterest1
          }
        }
      }))

      this.setState(prevState => ({
        ...prevState,
        calResult: {
          ...prevState.calResult,
          benxi: {
            ...prevState.calResult.benxi,
            allMoney: totalAllMoney1
          }
        }
      }))

      // 等额本金
      this.setState(prevState => ({
        ...prevState,
        calResult: {
          ...prevState.calResult,
          benjin: {
            ...prevState.calResult.benjin,
            subMonthMoney: totalMoneySubMonth2
          }
        }
      }))

      this.setState(prevState => ({
        ...prevState,
        calResult: {
          ...prevState.calResult,
          benjin: {
            ...prevState.calResult.benjin,
            month: month
          }
        }
      }))

      this.setState(prevState => ({
        ...prevState,
        calResult: {
          ...prevState.calResult,
          benjin: {
            ...prevState.calResult.benjin,
            step: totalStep2
          }
        }
      }))

      this.setState(prevState => ({
        ...prevState,
        calResult: {
          ...prevState.calResult,
          benjin: {
            ...prevState.calResult.benjin,
            allInterest: totalInterest2
          }
        }
      }))

      this.setState(prevState => ({
        ...prevState,
        calResult: {
          ...prevState.calResult,
          benjin: {
            ...prevState.calResult.benjin,
            allMoney: totalAllMoney2
          }
        }
      }))

    }


  };

  taxCalFunc = () => {

    if (this.state.taxCaltotalArea == "" || this.state.taxCaltotalPrice == "") {
      message.error("请输入 房屋面积 房屋总价");
      return
    }

    if (this.state.jizhengfangshi == "差价" && this.state.taxCaldiffPrice == "") {
      message.error("请输入差价");
      return
    }


    let taxItem = cal_tax(
            this.state.taxCalhouseType,
            this.state.taxCalisUnique,
            this.state.taxCalregisterTime,
            this.state.taxCalisFirst,
            this.state.jizhengfangshi,
            this.state.taxCaltotalArea,
            this.state.taxCaltotalPrice,
            this.state.taxCaldiffPrice,
    )

    this.setState({taxTotalMoney: taxItem[0]});
    this.setState({taxQishui: taxItem[1]});
    this.setState({taxzengzhishui: taxItem[2]});
    this.setState({taxgeshui: taxItem[3]});
  }


  switchTaxShowResult = flag => {
    this.setState({showFalgResult: flag});

    if (flag) {
      this.setState(prevState => ({
        ...prevState,
        cssTax1: {
          ...prevState.cssTax1,
          color: "black"
        }
      }))

      this.setState(prevState => ({
        ...prevState,
        cssTax2: {
          ...prevState.cssTax2,
          color: "#9c9e9f"
        }
      }))
    } else {
      this.setState(prevState => ({
        ...prevState,
        cssTax1: {
          ...prevState.cssTax1,
          color: "#9c9e9f"
        }
      }))

      this.setState(prevState => ({
        ...prevState,
        cssTax2: {
          ...prevState.cssTax2,
          color: "black"
        }
      }))
    }


    console.log(this.state.showFalgResult)
  }

  switchTaxCssShow = flag => {
    this.setState({showFlagTaxType: flag});

    if (flag) {
      this.setState(prevState => ({
        ...prevState,
        cssTax3: {
          ...prevState.cssTax3,
          color: "black"
        }
      }))

      this.setState(prevState => ({
        ...prevState,
        cssTax4: {
          ...prevState.cssTax4,
          color: "#9c9e9f"
        }
      }))
    } else {
      this.setState(prevState => ({
        ...prevState,
        cssTax3: {
          ...prevState.cssTax3,
          color: "#9c9e9f"
        }
      }))

      this.setState(prevState => ({
        ...prevState,
        cssTax4: {
          ...prevState.cssTax4,
          color: "black"
        }
      }))
    }


    console.log(this.state.showFalgResult)
  }

  render() {
    const OptionList = this.state.loanTime.map((item, index) => {
      let real_index = this.state.loanTime.length - index;
      return <Option key={index} value={real_index}>{real_index}年</Option>
    });
    const saleCountLister = this.state.saleCountList.map((item, index) => {
      let desc = "最新基准利率";
      if (Number(item) < 1) {
        desc = "最新基准利率" + item * 100 + "折"
      }
      if (item > 1) {
        desc = "最新基准利率" + item + "倍"
      }
      return <Option key={index} value={item}>{desc}</Option>
    });


    return (
            <div className="calculator">

              <div className="calculator__fangdai">
                <span className="calculator__fangdai__title">
                  <span onClick={() => this.switchTaxCssShow(true)}
                        style={this.state.cssTax3}>房贷计算器</span>&nbsp;&nbsp;&nbsp;&nbsp;
                  <span onClick={() => this.switchTaxCssShow(false)} style={this.state.cssTax4}>税费计算器</span>
                </span>

                {
                  this.state.showFlagTaxType == true ?
                          <div className="calculator__fangdai__left">

                            <div className="calculator__fangdai__top-down">
                              <span className="calculator__fangdai__sub-title">房贷类型</span>
                              <Select size="large" defaultValue="1" style={{width: 280}} onChange={this.typeChange}
                                      value={this.state.loanLilvTypeString}>
                                <Option value="1">商业贷款</Option>
                                <Option value="2">公积金贷款</Option>
                                <Option value="3">组合贷款</Option>
                              </Select>
                            </div>


                            <div className="calculator__fangdai__top-down">
                              <span className="calculator__fangdai__sub-title">贷款年限</span>
                              <Select size="large" defaultValue="25年" style={{width: 280}}
                                      onChange={this.loanMonthChange} value={this.state.loanMonth + "年"}>
                                {OptionList}
                              </Select>
                            </div>

                            <div className="calculator__fangdai__top-down">
                              <span className="calculator__fangdai__sub-title">贷款总金额</span>
                              <Select size="large" defaultValue="50" style={{width: 120}} onChange={this.percentChange}
                                      value={this.state.loanPercent + "%"}>
                                <Option value="65">65%</Option>
                                <Option value="50">50%</Option>
                                <Option value="45">45%</Option>
                              </Select>

                              <span className="calculator__fangdai__input">
                            <div>
                                <Input size="large" style={{width: 130}} defaultValue="" value={this.state.loanAllMoney}
                                       onChange={(e) => this.setState({loanAllMoney: e.target.value})}/>
                            </div>
                            <span className="calculator__fangdai__input-span">万</span>
                        </span>

                            </div>


                            {this.state.loanLilvTypeString == "公积金贷款" || this.state.loanLilvTypeString == "商业贷款"
                                    ?
                                    <div className="calculator__fangdai__top-down">
                                      <span className="calculator__fangdai__sub-title">{this.state.loanLilvTypeString}</span>
                                      <Select size="large" defaultValue="最新基准利率" value={this.state.chosePageFlag}
                                              style={{width: 180}}
                                              onChange={(val) => this.liLvChange(val, this.state.loanLilvTypeString)}>
                                        {saleCountLister}
                                      </Select>
                                      <span className="calculator__fangdai__input">
                            <div>
                                <Input size="large" style={{width: 70}} defaultValue="" value={this.state.daikuan_lilv}
                                       onChange={(e) => this.setState({daikuan_lilv: e.target.value})}/>
                            </div>
                            <span className="calculator__fangdai__input-span">%</span>
                        </span>
                                    </div>
                                    :
                                    <div>
                                      <div className="calculator__fangdai__top-down">
                                        <div>
                                          <span className="calculator__fangdai__sub-title">商业贷款金额</span>
                                          <span className="calculator__fangdai__long-input">
                                    <div>
                                        <Input style={{width: 250}} defaultValue=""
                                               value={this.state.shangyeloanAllMoney}
                                               onChange={(e) => this.zuhe_loan_all_money(e)}/>
                                        </div>
                                    <span className="calculator__fangdai__input-span">万</span>

                                </span>

                                        </div>
                                      </div>

                                      <div className="calculator__fangdai__top-down">
                                        <div>
                                          <span className="calculator__fangdai__sub-title">公积金贷款金额</span>
                                          <div className="calculator__fangdai__long-input">
                                            <div>
                                              <Input style={{width: 250}} disabled defaultValue=""
                                                     placeholder="请输入输入商业贷款金额,自动计算"
                                                     value={this.state.gongjijinloanAllMoney}/>
                                            </div>
                                            <span className="calculator__fangdai__input-span">万</span>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="calculator__fangdai__top-down">
                                        <div>

                                          <span className="calculator__fangdai__sub-title">商业贷款</span>
                                          <Select defaultValue="最新基准利率" style={{width: 160}}
                                                  onChange={(val) => this.ZuheliLvChange(val, "商业贷款")}>
                                            {saleCountLister}
                                          </Select>
                                          <div className="calculator__fangdai__input">
                                            <div>
                                              <Input style={{width: 90}} defaultValue=""
                                                     value={this.state.zuhe_shangye_daikuan_lilv}
                                                     onChange={(e) => this.setState({zuhe_shangye_daikuan_lilv: e.target.value})}/>
                                            </div>
                                            <span className="calculator__fangdai__input-span">%</span>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="calculator__fangdai__top-down">

                                        <div>
                                          <span className="calculator__fangdai__sub-title">公积金贷款</span>
                                          <Select defaultValue="最新基准利率" style={{width: 160}}
                                                  onChange={(val) => this.ZuheliLvChange(val, "公积金贷款")}>
                                            {saleCountLister}
                                          </Select>
                                          <div className="calculator__fangdai__input">
                                            <div>
                                              <Input style={{width: 90}} defaultValue=""
                                                     value={this.state.zuhe_gongjijin_daikuan_lilv}
                                                     onChange={(e) => this.setState({zuhe_gongjijin_daikuan_lilv: e.target.value})}/>
                                            </div>
                                            <span className="calculator__fangdai__input-span">%</span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>


                            }

                          </div>
                          :
                          <div className="calculator__fangdai__left">

                            <div className="calculator__fangdai__top-down">
                              <span className="calculator__fangdai__sub-title">住宅类型:</span>
                              <Select defaultValue="普通住宅" style={{width: 280}} value={this.state.taxCalhouseType}
                                      onChange={(val) => this.setState({taxCalhouseType: val})}>
                                <Option value="普通住宅">普通住宅</Option>
                                <Option value="非普通住宅">非普通住宅</Option>
                              </Select>
                            </div>

                            <div className="calculator__fangdai__top-down">
                              <span className="calculator__fangdai__sub-title">卖房家庭唯一:</span>
                              <Select defaultValue="唯一住宅" style={{width: 280}} value={this.state.taxCalisUnique}
                                      onChange={(val) => this.setState({taxCalisUnique: val})}>
                                <Option value="唯一住宅">唯一住宅</Option>
                                <Option value="不唯一">不唯一</Option>
                              </Select>
                            </div>


                            <div className="calculator__fangdai__top-down">
                              <span className="calculator__fangdai__sub-title">距上次交易:</span>
                              <Select defaultValue="满五年" style={{width: 280}} value={this.state.taxCalregisterTime}
                                      onChange={(val) => this.setState({taxCalregisterTime: val})}>
                                <Option value="满五年">满五年</Option>
                                <Option value="满两年">满两年</Option>
                                <Option value="不满两年">不满两年</Option>
                              </Select>
                            </div>


                            <div className="calculator__fangdai__top-down">
                              <span className="calculator__fangdai__sub-title">买房家庭首套:</span>
                              <Select defaultValue="首套" style={{width: 280}} value={this.state.taxCalisFirst}
                                      onChange={(val) => this.setState({taxCalisFirst: val})}>
                                <Option value="首套">首套</Option>
                                <Option value="二套">二套</Option>
                              </Select>
                            </div>

                            <div className="calculator__fangdai__top-down">
                              <span className="calculator__fangdai__sub-title">计征方式:</span>
                              <Select defaultValue="总价" style={{width: 280}} value={this.state.jizhengfangshi}
                                      onChange={this.jizhengfangshi}>
                                <Option value="总价">总价</Option>
                                <Option value="差价">差价</Option>
                              </Select>
                            </div>


                            <div className="calculator__fangdai__top-down">
                              <span className="calculator__fangdai__sub-title">房屋面积:</span>

                              <span className="calculator__fangdai__long-input">
                            <div>
                                <Input size="large" style={{width: 262}} defaultValue="" placeholder=""
                                       value={this.state.taxCaltotalArea}
                                       onChange={this.taxTotalArea}/>
                            </div>
                            <span className="calculator__fangdai__input-span">㎡</span>
                        </span>

                            </div>


                            <div className="calculator__fangdai__top-down">
                              <span className="calculator__fangdai__sub-title">房屋总价:</span>
                              <span className="calculator__fangdai__long-input">
                            <div>
                                <Input size="large" defaultValue="" placeholder="" style={{width: 262}}
                                       value={this.state.taxCaltotalPrice}
                                       onChange={this.taxTotalPrice}/>
                            </div>
                            <span className="calculator__fangdai__input-span">万</span>
                        </span>
                            </div>

                            {
                              this.state.jizhengfangshi == "差价"
                                      ?
                                      <div className="calculator__fangdai__top-down">
                                        <span className="calculator__fangdai__sub-title">买卖差价:</span>
                                        <span className="calculator__fangdai__long-input">
                                    <div>
                                        <Input size="large" defaultValue="" placeholder="" style={{width: 262}}
                                               value={this.state.taxCaldiffPrice}
                                               onChange={this.taxDiffPrice}/>
                                    </div>
                                    <span className="calculator__fangdai__input-span">万</span>
                                </span>
                                      </div>
                                      :
                                      null
                            }


                          </div>
                }


                {/*结果*/}

                {
                  this.state.showFlagTaxType == true ?
                          <div className="calculator__fangdai__right">
                            <div className="calculator__fangdai__right__title">
                    <span className="calculator__fangdai__sub-title color"
                          onClick={() => this.switchTaxShowResult(true)} style={this.state.cssTax1}>等额本息</span>
                              <span className="calculator__fangdai__sub-title color"
                                    onClick={() => this.switchTaxShowResult(false)}
                                    style={this.state.cssTax2}>等额本金</span>
                            </div>


                            <div className="calculator__fangdai__right">


                              {
                                this.state.showFalgResult == true ?
                                        <div style={{float: "left"}}>
                                          <div className="calculator__fangdai__right__sub-item">
                                            <span className="calculator__fangdai__sub-title">月供</span>
                                            <span className="float-right calculator__fangdai__sub-title__value">{this.state.calResult.benxi.subMonthMoney}<span>元</span></span>
                                          </div>

                                          <div className="calculator__fangdai__right__sub-item">
                                            <span className="calculator__fangdai__sub-title">还款月数</span>
                                            <span className="float-right calculator__fangdai__sub-title__value">{this.state.calResult.benxi.month}<span>月</span></span>
                                          </div>

                                          <div className="calculator__fangdai__right__sub-item">
                                            <span className="calculator__fangdai__sub-title">总利息</span>
                                            <span className="float-right calculator__fangdai__sub-title__value">{this.state.calResult.benxi.allInterest}<span>元</span></span>
                                          </div>

                                          <div className="calculator__fangdai__right__sub-item">
                                            <span className="calculator__fangdai__sub-title">本息合计</span>
                                            <span className="float-right calculator__fangdai__sub-title__value">{this.state.calResult.benxi.allMoney}<span>元</span></span>
                                          </div>

                                        </div>
                                        :
                                        <div style={{float: "left"}}>
                                          <div className="calculator__fangdai__right__sub-item">
                                            <span className="calculator__fangdai__sub-title">月供</span>
                                            <span className="float-right calculator__fangdai__sub-title__value">{this.state.calResult.benjin.subMonthMoney}<span>元</span></span>
                                          </div>
                                          <div className="calculator__fangdai__right__sub-item">
                                            <span className="calculator__fangdai__sub-title">首月后每月递减</span>
                                            <span className="float-right calculator__fangdai__sub-title__value">{this.state.calResult.benjin.step}<span>元</span></span>
                                          </div>

                                          <div className="calculator__fangdai__right__sub-item">
                                            <span className="calculator__fangdai__sub-title">还款月数</span>
                                            <span className="float-right calculator__fangdai__sub-title__value">{this.state.calResult.benjin.month}<span>月</span></span>
                                          </div>

                                          <div className="calculator__fangdai__right__sub-item">
                                            <span className="calculator__fangdai__sub-title">总利息</span>
                                            <span className="float-right calculator__fangdai__sub-title__value">{this.state.calResult.benjin.allInterest}<span>元</span></span>
                                          </div>

                                          <div className="calculator__fangdai__right__sub-item">
                                            <span className="calculator__fangdai__sub-title">本息合计</span>
                                            <span className="float-right calculator__fangdai__sub-title__value">{this.state.calResult.benjin.allMoney}<span>元</span></span>
                                          </div>

                                        </div>
                              }


                            </div>
                          </div>
                          :
                          <div className="calculator__fangdai__right">
                            <div className="calculator__fangdai__right__title">
                              <span className="calculator__fangdai__sub-title color">税费汇总</span>
                            </div>


                            <div className="calculator__fangdai__right">

                              <div style={{float: "left"}}>
                                <div className="calculator__fangdai__right__sub-item">
                                  <span className="calculator__fangdai__sub-title">合计</span>
                                  <span className="float-right calculator__fangdai__sub-title__value">{this.state.taxTotalMoney}<span>元</span></span>
                                </div>

                                <div className="calculator__fangdai__right__sub-item">
                                  <span className="calculator__fangdai__sub-title">契税:</span>
                                  <span className="float-right calculator__fangdai__sub-title__value">{this.state.taxQishui}<span>元</span></span>
                                </div>

                                <div className="calculator__fangdai__right__sub-item">
                                  <span className="calculator__fangdai__sub-title">增值税:</span>
                                  <span className="float-right calculator__fangdai__sub-title__value">{this.state.taxzengzhishui}<span>元</span></span>
                                </div>

                                <div className="calculator__fangdai__right__sub-item">
                                  <span className="calculator__fangdai__sub-title">个税:</span>
                                  <span className="float-right calculator__fangdai__sub-title__value">{this.state.taxgeshui}<span>元</span></span>
                                </div>

                              </div>


                            </div>
                          </div>
                }


                {
                  this.state.showFlagTaxType == false ?
                          <div style={{clear: "left"}}>
                            <Button style={{width:"700px",height:"50px"}} onClick={this.taxCalFunc}>
                              开始计算
                            </Button>
                          </div>

                          :
                          <div style={{clear: "left"}}>
                            <Button style={{width:"700px",height:"50px"}} onClick={this.cal1}>
                              开始计算
                            </Button>
                          </div>
                }


              </div>

            </div>
    );
  }
}

export default Calculatorer;
