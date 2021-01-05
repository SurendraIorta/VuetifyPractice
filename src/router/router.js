import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import FormFields from '../components/formfields.vue'
import ListView from '../components/listView.vue'
import TableView from '../components/tableView.vue'

export default new VueRouter({
    routes :  [
    {
        path: '/',
        name:   'ListView',
        component:  ListView
    },
    {
        path: '/formfield',
        name:   'FormFields',
        component:  FormFields
    },
    {
        path: '/tableview',
        name:   'TableView',
        component:  TableView
    }
]
});