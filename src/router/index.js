import Vue from 'vue'
import VueRouter from 'vue-router'

import EmployeePage from '../view/dictionary/employee/EmployeePage.vue'
// import CustomerPage from '../views/dictionary/customer/CustomerPage.vue'
import DashboardPage from '../view/dictionary/DashboardPage.vue'
// import ReportPage from '../views/dictionary/ReportPage.vue'
// import PurchasePage from '../views/dictionary/PurchasePage.vue'
// import SettingPage from '../views/dictionary/SettingPage.vue'


Vue.use(VueRouter);

const routes = [
  {path:"/", component: EmployeePage},

  {path:"/employee", component: EmployeePage},
  {path:"/customer", component: EmployeePage},
  {path:"/dashboard", component: DashboardPage},
  {path:"/report", component: DashboardPage},
  {path:"/purchase", component: DashboardPage},
  {path:"/setting", component: DashboardPage},
];

export const router = new VueRouter({
  mode:'history',
  routes
})