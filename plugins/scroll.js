export default function ({ $winstonLog }, inject) {
    const scroll = (top = 0, dom) => {
        let el = dom;
        if (!el) {
            el = document.documentElement;
        }
        if (typeof top !== 'number') {
            top = top.offsetTop;
        }
        el.scrollTop = top;
    };
    inject('scroll', scroll);
}
