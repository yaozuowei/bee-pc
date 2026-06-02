import common from './modules/common';
import user from './modules/user';
import product from './modules/product';
import story from './modules/story';
import news from './modules/news';
import scene from './modules/scene';
import member from './modules/member';
import cart from './modules/cart';
import order from './modules/order';
import quotationPrice from './modules/quotationPrice';
export default ($axios) => {
    return {
        common: common($axios),
        user: user($axios),
        product: product($axios),
        story: story($axios),
        news: news($axios),
        scene: scene($axios),
        member: member($axios),
        cart: cart($axios),
        order: order($axios),
        quotationPrice: quotationPrice($axios)
    };
};
