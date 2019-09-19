import Vue from 'vue'
// import Element from 'element-ui'
import '../styles/element-variables.scss'


import {
    Button, Card, Row, Col, Form, FormItem, Input, Message, Menu, MenuItem,
    Carousel, CarouselItem, Loading, MessageBox, Tooltip, Breadcrumb, BreadcrumbItem,
    Pagination, Table, TableColumn, DatePicker, InputNumber, Dialog, Cascader,
    Tabs, TabPane,Submenu,MenuItemGroup,Switch
  } from 'element-ui';

Vue.use(Button);
Vue.use(Card);
Vue.use(Row);
Vue.use(Col);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Loading.directive);
Vue.use(Tooltip);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Pagination);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(DatePicker);
Vue.use(InputNumber);
Vue.use(Dialog);
Vue.use(Cascader);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Submenu);
Vue.use(MenuItemGroup);
Vue.use(Switch);

// Vue.use(Element)
Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$loading = Loading.service;
