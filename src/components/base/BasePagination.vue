<template>
  <div class="ms-pagination">
      <div class="left-pagination">
        <div class="total-record">Tổng số: <b>22</b> bản ghi</div>
      </div>
      <div class="right-pagination">
        <!-- <div class="record-in-page">
          <div class="selected-option">20 bản ghi trên 1 trang</div>
          <div class="combo-action">
            <div class="mi-icon-16 icon-combo"></div>
          </div>
        </div> -->
        <BaseDropdown />
        <div class="navigations">
          <div class="pre-page untext">Trước</div>
          <div class="list-page">
            <div class="page-index">1</div>
          </div>
          <div class="next-page untext">Sau</div>
        </div>
      </div>
  </div>
</template>
<script>
import BaseDropdown from './BaseDropdown.vue'
export default {
  name: "BasePagination",
  components: {
    BaseDropdown,
  }
  
};
</script>
<style scoped>
@import "../../css/common/colab.css";
</style>