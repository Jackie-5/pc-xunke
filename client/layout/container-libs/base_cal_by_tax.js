let ttt = {
        COMMON: "普通住宅",
        NOTCOMMON: "非普通住宅"
    },
    nnn = {
        ONLY: "唯一住宅",
        NOTONLY: "不唯一"
    },
    aaa = {
        FULLFIVE: "满五年",
        FULLTWO: "满两年",
        NOTFULLTWO: "不满两年"
    },
    iii = {
        FIRST: "首套",
        SECOND: "二套"
    },
    ooo = {
        TOTAL: "总价",
        DIFF: "差价"
    };

// houseType 住宅类型
// isUnique  是否唯一
// registerTime  距离上次交易
// isFirst  买房家庭套餐
// calType  计征方式
// totalArea  房屋面积
// totalPrice  房屋总价
// diffPrice  买卖差价

export default function cal_tax(houseType, isUnique, registerTime, isFirst, calType, totalArea, totalPrice, diffPrice) {
    totalPrice = Number(totalPrice) * 10000;
    diffPrice = Number(diffPrice) * 10000;
    var e = p(isFirst, totalArea, houseType, totalPrice); //这个是契税
    var t = g(registerTime, houseType, totalPrice, calType, diffPrice); //增值税：
    var n = h(registerTime, isUnique, calType, totalPrice, diffPrice); //个税：
    var all = e + t + n;

    let tmp = [];

    tmp.push(all);
    tmp.push(e);
    tmp.push(t);
    tmp.push(n);

    return tmp

}

function p(isFirst, totalArea, houseType, totalPrice) {
    if (totalPrice != "") {
        var e = isFirst,
            n = totalArea,
            a = houseType,
            o = totalPrice;
        return e === iii.FIRST ? n <= 90 && a === ttt.COMMON ? .01 * o : n > 90 && n <= 140 && a === ttt.COMMON ? .015 * o : .03 * o : .03 * o
    }

};

function g(registerTime, houseType, totalPrice, calType, diffPrice) {
    var e = registerTime,
        n = houseType,
        i = totalPrice,
        o = (calType, diffPrice);
    return n === ttt.COMMON ? e === aaa.FULLFIVE || e === aaa.FULLTWO ? 0 : .056 * i : e === aaa.FULLFIVE || e === aaa.FULLTWO ? .056 * o : .056 * i
}

function h(registerTime, isUnique, calType, totalPrice, diffPrice) {
    var e = registerTime,
        t = isUnique,
        i = calType,
        r = totalPrice,
        s = diffPrice;
    return e === aaa.FULLFIVE && t === nnn.ONLY ? 0 : i === ooo.TOTAL ? .01 * r : .2 * s
}



