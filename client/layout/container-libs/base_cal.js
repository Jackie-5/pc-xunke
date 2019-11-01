//商业贷款 等额本息
//cal_1(lilv, total_loan_money, month);
//调用参数 (利率, 总还款, 总贷款月份)
//返回结果 (每个月还多少钱, 还的总钱数, 总利息)

//商业贷款 等额本金
//cal_2(lilv, total_loan_money, month);
//调用参数 (利率, 总还款, 总贷款月份)
//返回结果 (第一个月还多少钱, 每个月还款递减数, 总利息, 总还款)


export function base_cal_1(lilv, total_loan_money, month) {
    var sub_month_money = getMonthMoney1(lilv, total_loan_money, month);  //单月
    var all_total_money = sub_month_money * month; //总数
    var total_interests = all_total_money - total_loan_money; //总利息

    sub_month_money = sub_month_money.toFixed();
    all_total_money = all_total_money.toFixed();
    total_interests = total_interests.toFixed();

    var tmp = [];
    tmp.push(sub_month_money);
    tmp.push(all_total_money);
    tmp.push(total_interests);

    return tmp;


}

//商业贷款 等额本金
export function base_cal_2(lilv, total_loan_money, month) {
    var all_total_money = 0;
    var tmp = 0;
    var step = 0;
    var first_month = 0;

    for (var j = 0; j < month; j++) {
        //调用函数计算: 本金月还款额
        var sub_month_money = getMonthMoney2(lilv, total_loan_money, month, j);
        if (first_month == 0) {
            first_month = sub_month_money;
        }
        all_total_money += sub_month_money;
        sub_month_money = Math.round(sub_month_money * 100) / 100;
        step = tmp - sub_month_money;
        tmp = sub_month_money;

    }
    var total_interests = all_total_money - total_loan_money; //总利息


    // console.log(total_interests.toFixed()); //总利息
    // console.log(step.toFixed()); //每月递减
    // console.log(first_month.toFixed()); //第一个月
    // console.log(all_total_money.toFixed()); //总钱数

    first_month = first_month.toFixed();
    step = step.toFixed();
    total_interests = total_interests.toFixed();
    all_total_money = all_total_money.toFixed();

    var tmp = [];
    tmp.push(first_month);
    tmp.push(step);
    tmp.push(total_interests);
    tmp.push(all_total_money);

    return tmp;
}

//本息还款的月还款额(参数: 年利率/贷款总额/贷款总月份)
function getMonthMoney1(lilv, total, month) {
    var lilv_month = lilv / 12;//月利率
    return total * lilv_month * Math.pow(1 + lilv_month, month) / (Math.pow(1 + lilv_month, month) - 1);
}

//本金还款的月还款额(参数: 年利率 / 贷款总额 / 贷款总月份 / 贷款当前月0～length-1)
function getMonthMoney2(lilv, total, month, cur_month) {
    var lilv_month = lilv / 12;//月利率
    //return total * lilv_month * Math.pow(1 + lilv_month, month) / ( Math.pow(1 + lilv_month, month) -1 );
    var benjin_money = total / month;
    return (total - benjin_money * cur_month) * lilv_month + benjin_money;
}

