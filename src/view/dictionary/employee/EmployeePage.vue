<template>
  <div class="content">
    <div class="header-content">
      <div class="title">Nhân viên</div>
      <button class="m-btn m-btn-default">
        <div class="btn-text">Thêm Mới Nhân Viên</div>
      </button>
    </div>
    <div class="content-menu">
      <div class="filter-bar">
        <div class="space"></div>
        <div class="mi-input">
          <input type="text" placeholder="Tìm theo mã, tên nhân viên" />
          <div class="mi-icon-16 icon-search"></div>
        </div>
        <div class="mi-icon-24 icon-refresh"></div>
      </div>
      <BaseGrid />
    </div>
  </div>
</template>
<script>
import BaseGrid from "../../../components/base/BaseGrid.vue";
import { api } from "../../../mixins/api";
export default {
  name: "EmployeePage",
  mixins: [api],
  components: {
    BaseGrid,
  },
  async created() {
    await this.getAllEmployee();
  },
};
</script>
<style scoped>
@import "../../../css/common/content.css";
/* @import "../../../css/common/loading.css"; */
/* @import "../../../css/common/toast.css"; */
</style>