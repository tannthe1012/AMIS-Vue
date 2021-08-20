<template>
  <div class="form-input p-l-10">
    <label class="flex ms-title-input" for="name">{{ label }}</label>
    <div class="flex">
      <label class="container"
        >Nam
        <input type="radio" checked="checked" name="radio" />
        <span class="checkmark"></span>
      </label>
      <div class="space-20"></div>
      <label class="container"
        >Nữ
        <input type="radio" name="radio" />
        <span class="checkmark"></span>
      </label>
      <div class="space-20"></div>
      <label class="container"
        >Khác
        <input type="radio" name="radio" />
        <span class="checkmark"></span>
      </label>
    </div>
  </div>
</template>
<script>
export default {
  name: "BaseRadio",
  props: {
    value: String,
    label: String,
    type: {
      type: String,
      default: "text",
    },
  },
};
</script>
<style scoped>
@import url("../../css/common/radio.css");
@font-face {
  font-family: "notosans-bold";
  src: url("../../assets/fonts/notosans-bold.3ede5aff.woff2") format("opentype");
}
.ms-title-input {
  font-size: 12px;
  white-space: nowrap;
  font-family: notosans-bold;
  cursor: grab;
}
.space-20 {
    width: 20px;
    height: 20px;
    cursor: default;
}

</style>