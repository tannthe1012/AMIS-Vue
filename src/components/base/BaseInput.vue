<template>
  <div class="form-input">
    <label class="flex" for="name">
      <div class="ms-title-input">{{ label }}</div>
      <div v-show="required" class="ms-input-title-require">&nbsp;*</div>
    </label>
    <!-- <br /> -->
    <input
      :type="type"
      :class="[
        { 'error-input': error == true },
      ]"
      :value="valueInput"
      @blur="validate(valueInput)"
      @input="updateValue($event.target.value)"
      ref="refinput"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      error: false,
      valueInput: this.value,
      regexEmail:
        /^([a-zA-Z0-9_.+-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/,
    };
  },
  name: "BaseInput",
  props: {
    required: {
      type: Boolean,
      default: false,
    },
    value: String,
    label: String,
    type: {
      type: String,
      default: "text",
    },
  },
  methods: {
    /**
     * update với input lương cơ bản
     * Created By: NTTan (20/7/2021)
     */
    updateValue(value) {
      if (this.label === "Mức lương cơ bản") {
        value = value.replaceAll(".", "");
        value = value.replaceAll(",", "");
        value = Number(value).toLocaleString("it-IT");
      }
      this.valueInput = value;
       if (this.label === "Mức lương cơ bản") {
        value = value.replaceAll(".", "");
        value = value.replaceAll(",", "");
      }
      this.$emit("input", value);
    },
    /**
     * Hàm dể validate bắt buộc nhập và Email
     * Created By: NTTan (20/7/2021)
     */
    validate(value) {
      if (this.required == false) {
        return;
      }
      if (!value || value == null) {
        this.error = true;
        this.$refs.refinput.title = `${this.label} không được phép bỏ trống`;
      } else {
        this.$refs.refinput.title = "";
        this.error = false;
      }
      
      if (this.label == "Email" && value != "") {
        if (!this.regexEmail.test(value)) {
          this.error = true;
          this.$refs.refinput.title = "Email không đúng định dạng";
        } else {
          this.$refs.refinput.title = "";
          this.error = false;
        }
      }
    },
  },
};
</script>
<style scoped>
@import "../../css/common/form.css";
@font-face {
  font-family: "notosans-bold";
  src: url("../../assets/fonts/notosans-bold.3ede5aff.woff2") format("opentype");
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
}
input:hover {
  outline: 1px solid #e2e2e2;
}
</style>