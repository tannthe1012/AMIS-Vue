<template>
  <div class="grid gird-employee">
    <!-- <table style="width: 100%; table-layout: fixed" cellspacing="0"> -->
    <table style="width: calc(100vw - 100px; table-layout: fixed" cellspacing="0">
    <!-- <table style="width: 100%"> -->
      <colgroup>
        <col style="width: 180px" />
        <col style="width: 200px" />
        <col style="width: 150px" />
        <col style="width: 180px" />
        <col style="width: 180px" />
        <col style="width: 250px" />
        <col style="width: 150px" />
        <col style="width: 250px" />
        <col style="width: 180px" />
        <col style="width: 150px" />
      </colgroup>
      <thead>
        <tr>
          <th>MÃ NHÂN VIÊN</th>
          <th>TÊN NHÂN VIÊN</th>
          <th>NƠI CẤP</th>
          <th>CHỨC DANH</th>
          <th>SỐ TÀI KHOẢN</th>
          <th>TÊN NGÂN HÀNG</th>
          <th>LÀ KHÁCH HÀNG</th>
          <th>LÀ NHÀ CUNG CẤP</th>
          <th>TRẠNG THÁI</th>
          <th>CHỨC NĂNG</th>
        </tr>
      </thead>

      <tbody v-if="this.$store.state.employeeList.length != 0 ">
        <tr
          v-for="employee in this.$store.state.employeeList"
          :key="employee.EmployeeId"
        >
          <td>{{ employee.EmployeeCode }}</td>
          <td>{{ employee.EmployeeName }}</td>
          <td>{{ employee.IdentityPlace }}</td>
          <td>{{ employee.EmployeePosition }}</td>
          <td>{{ employee.BankAccountNumber }}</td>
          <td>{{ employee.BankName }}</td>
          <td>1</td>
          <td>2</td>
          <td>Đang sử dụng</td>
          <td>Sửa</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: "BaseGrid",
  components: {
  },
};
</script>
<style scoped>
@import "../../css/common/grid.css";
@import "../../css/common/loading.css";
</style>