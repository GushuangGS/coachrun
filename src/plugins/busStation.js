import Vue from 'vue';
import {Field, Stepper, Popup, Search, List, Cell, Button, Toast} from 'vant';
Vue.use(Field).use(Stepper).use(Popup).use(Search).use(List).use(Cell).use(Button)
  .use(Toast)
import 'vant/lib/index.css';
// Vue.use(Vant);
import ivyCompanyBase from 'ivy-company-base'
Vue.use(ivyCompanyBase)
import * as VueGoogleMaps from 'vue2-google-maps'
Vue.use(VueGoogleMaps, {
  load: {
    // test:AIzaSyD08dDbUoxkc2oP-UDrAcVe_KwplfAveIs
    key: 'AIzaSyDtQRB-nYo06O-eb_c922r2xQJ2ZWksaao',
    libraries: 'places',
    language: 'US',
  },
  installComponents: true
})
import '@/plugins/flexiable.js'
import Calendar from "ivy_nutui/dist/packages/calendar/calendar.js";
import "@nutui/nutui/dist/nutui.css"
Vue.use(Calendar,)

import NutUI from '@nutui/nutui';
NutUI.install(Vue);
import enUS from '@/plugins/en-US';
Vue.use(NutUI, {
    locale: 'en-US',
    lang: enUS
  });