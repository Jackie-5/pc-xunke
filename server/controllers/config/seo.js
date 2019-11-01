
import baike from './seo/baike';
import zixun from './seo/zixun';

module.exports = (ctx) => ({
  baike: baike(ctx),
  zixun: zixun(ctx),
});
