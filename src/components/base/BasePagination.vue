<template>
  <div class="paging-bar">
    <div class="paging-contentleft">
      Hiển thị <span style="font-weight: 1000">01-18/100</span> Lao động
    </div>
    <div class="page-navigations">
      <div class="m-btn btn-firstpage" @click="onClickFirstPage"></div>
      <div class="m-btn btn-prev-page" @click="onClickPrePage"></div>
      <ul v-for="number in listPage" :key="number">
        <li>
          <a
            href="#"
            :class="{ active: number == currentPage }"
            @click="updateCurrentPage(number)"
            >{{ number }}</a
          >
        </li>
      </ul>
      <div class="m-btn btn-next-page" @click="onClickNextPage"></div>
      <div class="m-btn btn-lastpage" @click="onClickLastPage"></div>
    </div>
    <div class="paging-contentright">
      <span style="font-weight: 1000">18</span> nhân viên/trang
    </div>
  </div>
</template>
<script>
import { api } from "../../mixins/api";
export default {
  name: "BasePagination",
  mixins: [api],
  data() {
    return {
      currentPage: 1,
      listPage: [],
    };
  },
  async mounted() {
    await this.getAllEmployee();
    this.currentPage = this.$store.state.Pagination.currentPage;
    // console.log(this.$store.state.employeeList);
    this.renderList(0);
  },
  methods: {
    /**
     * render các ul li
     * Created By: NTTan (23/7/2021)
     */
    renderList(number) {
      this.listPage = [];
      for (let i = 1; i <= 6; i++) {
        if (number + i > this.$store.state.Pagination.totalPage) {
          break;
        }
        this.listPage.push(number + i);
      }
    },
    /**
     * Xử lý sự kiện nextPage
     * Created By: NTTan (23/7/2021)
     */
    onClickNextPage() {
      console.log(this.currentPage);
      if (this.currentPage == this.$store.state.Pagination.totalPage) {
        return;
      }
      if (this.currentPage == this.listPage[this.listPage.length - 1]) {
        this.renderList(this.currentPage);
      }
      if (this.currentPage == this.$store.state.Pagination.totalPage) {
        return;
      }
      this.currentPage = this.currentPage + 1;
      console.log(this.currentPage);
      this.$store.state.Pagination.currentPage = this.currentPage;
      this.getAllEmployee();
    },
    /**
     * Xử lý sự kiện Prepage
     * Created By: NTTan (23/7/2021)
     */
    onClickPrePage() {
      if (this.currentPage == 1) {
        return;
      }
      if (this.currentPage == this.listPage[0]) {
        this.renderList(this.currentPage - 7);
      }
      this.currentPage = this.currentPage - 1;
      this.$store.state.Pagination.currentPage = this.currentPage;
      this.getAllEmployee();
      // this.listPage = [];
    },
    /**
     * Xử lý sự kiện khi tới Page cuối cùng
     * Created By: NTTan (23/7/2021)
     */
    onClickLastPage() {
      let a = Math.floor(this.$store.state.Pagination.totalPage / 6);
      a = a * 6;
      this.currentPage = this.$store.state.Pagination.totalPage;
      this.renderList(a);
      this.$store.state.Pagination.currentPage = this.currentPage;
      this.getAllEmployee();
    },
    /**
     * Xử lý sự kiện khi tới Page đầu tiên
     * Created By: NTTan (23/7/2021)
     */
    onClickFirstPage() {
      this.currentPage = 1;
      this.renderList(0);
      this.$store.state.Pagination.currentPage = this.currentPage;
      this.getAllEmployee();
    },
    updateCurrentPage(number) {
      this.currentPage = number;
      this.$store.state.Pagination.currentPage = this.currentPage;
      this.getAllEmployee();
    },
  },
};
</script>
<style scoped>
@import "../../css/common/colab.css";
</style>