<template>
  <div id="modal" class="modal">
    <div class="form-employee">
      <div class="ms-form-header">
        <div class="ms-header-title">
          <div class="header-form">Thông tin nhân viên</div>
          <label class="form-label-checkbox" for="">
            <BaseCheckBox />
            <span class="slot-label">Là khách hàng</span>
          </label>
          <label class="form-label-checkbox" for="">
            <BaseCheckBox />
            <span class="slot-label">Là nhà cung cấp</span>
          </label>
        </div>
        <div class="ms-form-close">
          <div class="mi-icon-24 icon-help"></div>
          <div class="mi-icon-24 icon-close" @click="btnCloseForm"></div>
        </div>
      </div>
      <div class="ms-form-content">
        <div class="form-content">
          <div class="flex pd-b-12">
            <div class="w-1/2">
              <div class="p-r-26">
                <div class="form-row">
                  <div class="w-2/5">
                    <div class="p-r-6">
                      <BaseInput
                        v-model="currentEmployee.EmployeeCode"
                        ref="input1"
                        label="Mã"
                        :required="true"
                      />
                    </div>
                  </div>
                  <div class="w-3/5">
                    <BaseInput
                      v-model="currentEmployee.EmployeeName"
                      ref="input2"
                      label="Tên"
                      :required="true"
                    />
                  </div>
                </div>
                <div class="form-row" style="flex-direction: column">
                  <!-- <BaseInput label="Đơn vị" :required="true" /> -->
                  <label class="flex" for="name">
                    <div class="ms-title-input">Đơn vị</div>
                    <div class="ms-input-title-require">&nbsp;*</div>
                  </label>
                  <BaseComboBox
                    label="Đơn vị"
                    :required="true"
                    ref="input3"
                    v-bind:item="department"
                    v-bind:valueInput="currentEmployee.DepartmentName"
                    @result="(result) => fotmatDataCbb(result, 'department')"
                  />
                </div>
                <div class="form-row">
                  <BaseInput
                    v-model="currentEmployee.EmployeePosition"
                    label="Chức danh"
                  />
                </div>
              </div>
            </div>
            <div class="w-1/2">
              <div class="form-row">
                <div class="w-2/5">
                  <div class="p-r-6">
                    <BaseInput
                      v-model="currentEmployee.DateOfBirth"
                      label="Ngày sinh"
                      type="date"
                    />
                  </div>
                </div>
                <div class="w-3/5">
                  <BaseRadio
                    v-model="currentEmployee.FullName"
                    label="Giới tính"
                  />
                </div>
              </div>
              <div class="form-row">
                <div class="w-3/5">
                  <div class="p-r-6">
                    <BaseInput
                      v-model="currentEmployee.IdentityNumber"
                      label="Số CMND"
                    />
                  </div>
                </div>
                <div class="w-2/5">
                  <BaseInput
                    v-model="currentEmployee.IdentityDate"
                    label="Ngày cấp"
                    type="date"
                  />
                </div>
              </div>
              <div class="form-row">
                <BaseInput
                  v-model="currentEmployee.IdentityPlace"
                  label="Nơi cấp"
                />
              </div>
            </div>
          </div>
          <div class="form-content-bottom">
            <div class="form-row">
              <BaseInput v-model="currentEmployee.Address" label="Địa chỉ" />
            </div>
            <div class="form-row" style="justify-content: end">
              <div class="w-1/4">
                <div class="p-r-6">
                  <BaseInput
                    v-model="currentEmployee.PhoneNumber"
                    label="ĐT di động"
                  />
                </div>
              </div>
              <div class="w-1/4">
                <div class="p-r-6">
                  <BaseInput
                    v-model="currentEmployee.TelephoneNumber"
                    label="ĐT cố định"
                  />
                </div>
              </div>
              <div class="w-1/4">
                <div class="p-r-6">
                  <BaseInput
                    v-model="currentEmployee.Email"
                    label="Email"
                    type="email"
                  />
                </div>
              </div>
            </div>
            <div class="form-row" style="justify-content: end">
              <div class="w-1/4">
                <div class="p-r-6">
                  <BaseInput
                    v-model="currentEmployee.BankAccountNumber"
                    label="Tài khoản ngân hàng"
                  />
                </div>
              </div>
              <div class="w-1/4">
                <div class="p-r-6">
                  <BaseInput
                    v-model="currentEmployee.BankName"
                    label="Tên ngân hàng"
                  />
                </div>
              </div>
              <div class="w-1/4">
                <div class="p-r-6">
                  <BaseInput
                    v-model="currentEmployee.BankBranchName"
                    label="Chi nhánh"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="footer-container">
          <div class="divide"></div>
          <div class="form-footer">
            <div class="form-footer-left">
              <button class="m-btn-default" @click="closeForm">Hủy</button>
            </div>
            <div class="form-footer-right">
              <button class="m-btn-default" @click="btnSaveOnClick">Cất</button>
              <button class="m-btn" @click="btnSaveAndShowForm">
                Cất và Thêm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import BaseCheckBox from "../../../components/base/BaseCheckBox.vue";
import BaseInput from "../../../components/base/BaseInput.vue";
import BaseRadio from "../../../components/base/BaseRadio.vue";
import BaseComboBox from "../../../components/base/BaseComboBox.vue";
import { api } from "../../../mixins/api";
export default {
  name: "EmployeeDetail",
  mixins: [api],
  components: {
    BaseCheckBox,
    BaseInput,
    BaseRadio,
    BaseComboBox,
  },
  props: {
    EmployeeDetail: { type: Object },
    department: { type: Array },
  },
  data() {
    return {
      employeeDetail: { ...this.EmployeeDetail },
    };
  },
  computed: {
    currentEmployee: function () {
      return {
        ...this.employeeDetail,
        DateOfBirth: this.formatDateToInput(this.employeeDetail?.DateOfBirth),
        IdentityDate: this.formatDateToInput(this.employeeDetail?.IdentityDate),
      };
    },
    employeeStart: function () {
      return {
        ...this.employeeDetail,
        DateOfBirth: this.formatDateToInput(this.employeeDetail?.DateOfBirth),
        IdentityDate: this.formatDateToInput(this.employeeDetail?.IdentityDate),
      };
    },
  },
  methods: {
    /**
     * Xử lý đầu ra của combobox
     * Created By: NTTan (22/7/2021)
     */
    fotmatDataCbb(result) {
      this.currentEmployee.DepartmentName = result;
      this.currentEmployee.DepartmentId = this.findId(result, this.department);
    },
    /**
     * Tìm id của combobox để gán vào obj để POST hoặc PUT
     * Created By: NTTan (22/7/2021)
     */
    findId(result, array) {
      const obj = array.find((item) => item.name == result);
      return obj.id;
    },
    /**
     * Hàm format date vào các tr tương ứng
     * Created By: NTTan (15/7/2021)
     */
    formatDateToInput(value) {
      if (value) {
        return moment(String(value)).format("YYYY-MM-DD");
      }
    },
    /**
     * Hàm kiểm tra xem obj có rỗng không
     * Created By: NTTan (18/8/2021)
     */
    isEmptyObject(obj) {
      return JSON.stringify(obj) === "{}";
    },
    /**
     * Hàm xử lí đóng form Gửi lên EmployeeDetail
     * Created By: NTTan(16/7/2021)
     */
    btnCloseForm() {
      var isShowPopup =
        Object.entries(this.employeeStart).toString() ===
        Object.entries(this.currentEmployee).toString();
      if (isShowPopup == true) {
        this.$emit("closeForm");
      } else {
        this.$emit("showPopupCloseForm");
      }
    },
    /**
     * Hàm thêm nhân viên
     * Created By: NTTan(16/7/2021)
     */
    async btnSaveOnClick() {
      this.$store.state.componentError = [];

      Object.entries(this.$refs).forEach((baseinput) => {
        baseinput[1].$refs.refinput.focus();
        baseinput[1].$refs.refinput.blur();
        if (baseinput[1].error) {
          this.$store.state.componentError.push(baseinput[1]);
        }
      });
      if (!this.employeeStart.EmployeeId &&
        this.currentEmployee.EmployeeCode != null &&
        this.currentEmployee.EmployeeCode != ""
      ) {
        var isExist = await this.checkEmployeeCodeExist(
          this.currentEmployee.EmployeeCode
        );
        if (isExist == false) {
          this.$store.state.componentError = [];
          this.$store.state.componentError.push(
            Object.entries(this.$refs)[0][1]
          );
          Object.entries(this.$refs)[0][1].$refs.refinput.title =
            "Mã nhân viên đã tồn tại";
        }
      }
      if (this.$store.state.componentError.length == 0) {
        this.$emit("saveOnClick", this.currentEmployee);
      } else {
        var errorContext =
          this.$store.state.componentError[0].$refs.refinput.title;
        this.$emit("showPopupError", errorContext);
      }
    },
    /**
     * Hàm thêm nhân viên
     * Created By: NTTan(16/7/2021)
     */
    async btnSaveAndShowForm() {
      this.$store.state.componentError = [];

      Object.entries(this.$refs).forEach((baseinput) => {
        baseinput[1].$refs.refinput.focus();
        baseinput[1].$refs.refinput.blur();
        if (baseinput[1].error) {
          this.$store.state.componentError.push(baseinput[1]);
        }
      });
      if (
        !this.employeeStart.EmployeeId &&
        this.currentEmployee.EmployeeCode != null &&
        this.currentEmployee.EmployeeCode != ""
      ) {
        var isExist = await this.checkEmployeeCodeExist(
          this.currentEmployee.EmployeeCode
        );
        if (isExist == false) {
          this.$store.state.componentError = [];
          this.$store.state.componentError.push(
            Object.entries(this.$refs)[0][1]
          );
          Object.entries(this.$refs)[0][1].$refs.refinput.title =
            "Mã nhân viên đã tồn tại";
        }
      }
      if (this.$store.state.componentError.length == 0) {
        this.$emit("saveAndShowForm", this.currentEmployee);
        // reset form
        this.employeeDetail = { DepartmentName: "" };
        Object.entries(this.$refs).forEach((baseinput) => {
          baseinput[1].$refs.refinput.value = "";
        });
      } else {
        var errorContext =
          this.$store.state.componentError[0].$refs.refinput.title;
        this.$emit("showPopupError", errorContext);
      }
    },
    /**
     * Hàm xử lí nút Hủy trong form chi tiết nhân viên
     * Created By: NTTan (18/8/2021)
     */
    closeForm() {
      this.$emit("closeForm");
    },
  },
};
</script>

<style scoped>
@import "../../../css/common/form.css";
.slot-label {
  white-space: nowrap;
  padding-left: 10px;
  font-size: 13px;
}
.ms-input-title-require {
  color: red;
}
.ms-title-input {
  font-size: 12px;
  white-space: nowrap;
  font-family: notosans-bold;
  cursor: grab;
}
.ms-form-content label {
  max-height: 16px;
  box-sizing: border-box;
  margin-bottom: 4px;
}
</style>