import Vue from 'vue';
import {
    Button,
    Col,
    Row,
    Space,
    Empty,
    message,
    Modal,
    notification,
    Popconfirm,
    Skeleton,
    Spin,
    Popover,
    Icon,
    Input,
    Checkbox,
    BackTop,
    Tag,
    DatePicker
} from 'ant-design-vue';

Vue.use(Button);
Vue.use(Col);
Vue.use(Row);
Vue.use(Space);
Vue.use(Empty);
Vue.use(Modal);
Vue.use(Popconfirm);
Vue.use(Skeleton);
Vue.use(Spin);
Vue.use(Popover);
Vue.use(Icon);
Vue.use(Input);
Vue.use(Checkbox);
Vue.use(BackTop);
Vue.use(Tag);
Vue.use(DatePicker);
Vue.prototype.$confirm = Modal.confirm;
Vue.prototype.$message = message;
Vue.prototype.$notification = notification;
