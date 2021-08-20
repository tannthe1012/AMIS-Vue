<template>
  <div class="content">
    <div class="header-content">
      <div class="title">Nhân viên</div>
      <button class="m-btn" v-on:click="btnAddOnClick">
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
        <div class="mi-icon-24 icon-refresh" @click="refreshData"></div>
      </div>
      <BaseGrid
       @showFormDetail="showFormDetail"
       @showContextMenu="showContextMenu"
       @showPopupDelete="showPopupDelete"
       @duplicateEmployee="duplicateEmployee" 
      />
      <BasePagination/>
      <EmployeeDetail 
        v-if="isShowFormDetail"
         v-bind:department="department"
         v-bind:EmployeeDetail="employeeDetail"
         @showPopupCloseForm="showPopupCloseForm"
         @saveOnClick="saveOnClick"
         @closeForm="closeForm"
         @showPopupError="showPopupError"
         @saveAndShowForm="saveAndShowForm"
         ref="formdetail"
      />
      <BasePopup
      v-if="isShowPopup"
      v-bind:dataPopup="dataPopup"
      @confirmPopup="confirmPopup"
      @closePopup="closePopup"
      @closePopupAndForm="closePopupAndForm"
    />
    <div id="toast">
      <BaseToast
        v-for="toast in this.$store.state.Toast"
        :key="toast.id"
        v-bind:toast="toast"
      />
    </div>
    </div>
  </div>
</template>
<script>
import BaseGrid from "../../../components/base/BaseGrid.vue";
import BasePagination from '../../../components/base/BasePagination.vue'
import EmployeeDetail from './EmployeeDetail.vue'
import BasePopup from '../../../components/base/BasePopup.vue'
import BaseToast from '../../../components/base/BaseToast.vue'
import { api } from "../../../mixins/api";
export default {
  name: "EmployeePage",
  mixins: [api],
  components: {
    BaseGrid,
    BasePagination,
    EmployeeDetail,
    BasePopup,
    BaseToast
  },
  data() {
    return {
      isShowFormDetail: false,
      employeeDetail: {},
      department: [],
      dataPopup: {
        classIcon: String,
        title: String,
        buttonConfirm: String,
      },
      isShowPopup: false,
    }
  },
  async created() {
    await this.getAllEmployee();
    await this.getDepartment();
    this.department = this.$store.state.department;
  },
  methods: {
    /**
     * Hàm để show Form Thông tin nhân viên trống
     * Created By: NTTan (15/7/2021)
     */
    btnAddOnClick() {
      this.isShowFormDetail = true;
      this.employeeDetail = {DepartmentName:""};
    },
    /**
     * Hàm để hiện cái context Menu
     * Created By: NTTan (16/7/2021)
     */
    showContextMenu(employee) {
      this.employeeDetail = { ...employee };
    },
    /**
     * Hàm xử lí confirm Delete
     * Created By: NTTan (19/7/2021)
     */
    confirmPopup() {
      this.isShowPopup = false;
      if (this.$store.state.statusPopup == "DELETE") {
        this.deleteEmployee(this.employeeDetail.EmployeeId);
        this.employeeDetail = {};
      } else if (this.$store.state.statusPopup == "CLOSE"){
        this.$refs.formdetail.btnSaveOnClick();
      } else if (this.$store.state.statusPopup == "ERROR") {
        this.$store.state.componentError[0].$refs.refinput.focus();
        return;
      }
    },
    /**
    Hàm xử lí sự kiện đóng popup
    Created By: NTTan (19/7/2021)
     */
    closePopup() {
      this.isShowPopup = false;
    },
    /**
     * Hàm xử lí nút Hủy trong form chi tiết nhân viên
     * Created By: NTTan (18/8/2021)
     */
    closeForm() {
      this.isShowFormDetail = false;
    },
    /**
     * Hàm xử lí sự kiện với nút X trong form
     * Created By: NTTan  (16/7/2021)
     */
    showPopupCloseForm() {
      this.$store.state.statusPopup = "CLOSE";
      this.dataPopup.classIcon = `icon-question`;
      this.dataPopup.title = `Dữ liệu đã bị thay đổi. Bạn có muốn cất không?`;
      this.dataPopup.buttonConfirm = `Có`;
      this.isShowPopup = true;
    },
    /**
     * Hiện popup delete
     * Created By: NTTan (19/7/2021)
     */
    showPopupDelete(employee) {
      this.$store.state.statusPopup = "DELETE";
      this.dataPopup.classIcon = `icon-warning`;
      this.dataPopup.title = `Bạn có thực sự muốn xóa Nhân viên <${employee.EmployeeCode}> không?`;
      this.dataPopup.buttonConfirm = `Có`;
      this.isShowPopup = true;
    },
    async duplicateEmployee(employee) {
      this.employeeDetail = {...employee};
      var newEmployeeCode = await this.getNewEmployeeCode();
      delete this.employeeDetail.EmployeeId;
      this.employeeDetail.EmployeeCode = newEmployeeCode;
      this.isShowFormDetail = true;
    },
    /**
     * Hiển thị form Detail với sự kiện chọn DBlCLICK
     * Created By: NTTan (15/7/2021)
     */
    showFormDetail(employee) {
      this.employeeDetail = { ...employee };
      this.isShowFormDetail = true;
    },
    /**
     * Hàm xử lí sự kiện khi nhấn nút Cất trong form
     * Created By: NTT(17/7/2021)
     */
    saveOnClick(employee) {
      if (employee.EmployeeId == undefined || employee.EmployeeId == null) {
        this.postEmployee(employee);
      } else {
        this.putEmployee(employee);
      }
      this.isShowFormDetail = false;
    },
    saveAndShowForm(employee) {
      if (employee.EmployeeId == undefined) {
        this.postEmployee(employee);
      } else {
        this.putEmployee(employee);
      }
    },
    /**
     *  Hàm xử lý refresh Data Api
     * Created By: NTTan (19/7/2021)
     */
    refreshData() {
      this.$store.state.employeeList = [];
      setTimeout(() => {
        this.getAllEmployee();
      }, 2000);
    },
    closePopupAndForm() {
      this.isShowPopup = false;
      this.isShowFormDetail = false;
    },
    showPopupError(errorMessage) {
      this.$store.state.statusPopup = "ERROR";
      this.dataPopup.classIcon = `icon-error`;
      this.dataPopup.title = errorMessage;
      this.dataPopup.buttonConfirm = `Đóng`;
      this.isShowPopup = true;
    }

    
  },
};
</script>
<style scoped>
@import "../../../css/common/content.css";
/* @import "../../../css/common/loading.css"; */
/* @import "../../../css/common/toast.css"; */
</style>