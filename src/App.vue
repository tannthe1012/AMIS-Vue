<template>
  <div id="app">
    <TheMenu/>
    <div id="main">
      <TheHeader/>
      <EmployeePage/>
    </div>
  </div>
</template>

<script>
import TheMenu from "./components/layout/TheMenu.vue";
import TheHeader from "./components/layout/TheHeader.vue";
import EmployeePage from "./view/dictionary/employee/EmployeePage.vue"
export default {
  name: "App",
  components: {
    TheMenu,
    TheHeader,
    EmployeePage,
  }
};
</script>

<style>
@import "./css/common/main.css";
@import "./css/common/common.css";
@import "./css/page/employee.css";
#app {
  display: flex;
}
#main {
  flex: 1;
  /* width: calc(100% - 178px); */
  flex: 1;
  min-height: 0;
  min-width: 0;
}

</style>

