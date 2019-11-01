/**
 * Created by JackieWu on 2019/5/10
 */

module.exports = {
  getListImage: (ctx, resultList) => {
    const { globalConfig } = ctx.state;
    const seoImages = [];

    if (resultList.length > 0) {
      seoImages.push(
        resultList[0] && resultList[0].imgUrl ? resultList[0].imgUrl : globalConfig.seoImg.defaultImg1,
        resultList[1] && resultList[1].imgUrl ? resultList[1].imgUrl : globalConfig.seoImg.defaultImg2,
        resultList[2] && resultList[2].imgUrl ? resultList[2].imgUrl : globalConfig.seoImg.defaultImg3,
      );
    } else {
      seoImages.push(
        globalConfig.seoImg.defaultImg1,
        globalConfig.seoImg.defaultImg2,
        globalConfig.seoImg.defaultImg3,
      );
    }
    
    return seoImages;
  },
  getDetailImage: (ctx, houseImg, houseKey, getKey) => {
    const { globalConfig } = ctx.state;
    const seoImages = [];
    seoImages.push(
      houseImg[houseKey[0]] ? (houseImg[houseKey[0]].split(',')[getKey[0] || 0] || globalConfig.seoImg.defaultImg1) : globalConfig.seoImg.defaultImg1,
      houseImg[houseKey[1]] ? (houseImg[houseKey[1]].split(',')[getKey[1] || 0] || globalConfig.seoImg.defaultImg2) : globalConfig.seoImg.defaultImg2,
      houseImg[houseKey[2]] ? (houseImg[houseKey[2]].split(',')[getKey[2] || 0] || globalConfig.seoImg.defaultImg3) : globalConfig.seoImg.defaultImg3,
    );
    return seoImages;
  },
  getBaikeListImage: (ctx, resultList) => {
    const { globalConfig } = ctx.state;
    const seoImages = [];


    if (resultList.length > 0) {
      seoImages.push(
        resultList[0] && resultList[0].imagePath ? resultList[0].imagePath : globalConfig.seoImg.defaultImg1,
        resultList[1] && resultList[1].imagePath ? resultList[1].imagePath : globalConfig.seoImg.defaultImg2,
        resultList[2] && resultList[2].imagePath ? resultList[2].imagePath : globalConfig.seoImg.defaultImg3,
      );
    } else {
      seoImages.push(
        globalConfig.seoImg.defaultImg1,
        globalConfig.seoImg.defaultImg2,
        globalConfig.seoImg.defaultImg3,
      );
    }

    return seoImages;
  },
};
