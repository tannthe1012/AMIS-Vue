<template>
  <div class="cbx">
    <div class="cbx-show" :class="{ 'error-combobox': error == true }">
      <input
        type="text"
        @blur="validateCombobox(inputValue)"
        @input="onChange"
        @keydown.down="onArrowDown"
        @keydown.up="onArrowUp"
        @keydown.enter="onEnter"
        v-model="inputValue"
        ref="refinput"
      />
      <!-- <i class="fas fa-chevron-down cbx-icon-dropdown" @click="iconOnClick"></i> -->
      <div class="combo-action" @click="iconOnClick">
            <div class="mi-icon-16 icon-combo"></div>
      </div>
    </div>
    <div class="cbx-hide" v-show="isShowOption">
      <div
        class="cbx-select"
        v-for="(item, index) in results"
        :key="index"
        :class="{
          active: item.name == valueSelect,
          'cbx-select-focus': index == arrowCounter,
        }"
        @click="select(item)"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "BaseComboBox",
  props: {
    required: {
      type: Boolean,
      default: false,
    },
    item: Array,
    valueInput: { type: String },
    optionAll: { type: Object },
    label: String,
  },

  data() {
    return {
      error: false,
      isShowOption: false,
      valueSelect: this.valueInput,
      inputValue: this.valueInput,
      results: [],
      arrowCounter: -1,
      items: [...this.item, { ...this.optionAll }],
    };
  },

  watch: {
    item: function () {
      this.items = [...this.item, { ...this.optionAll }];
    },
    valueSelect: function () {
      this.$emit("result", this.valueSelect);
    },
  },
  /**
   * xử lí sự kiện click ra ngoài sẽ ẩn combobox
   * created By: NTTan (19/7/2021)
   */
  mounted() {
    document.addEventListener("click", this.handleClickOutside);
    // this.selectedIndex = -1;
  },
  destroyed() {
    document.removeEventListener("click", this.handleClickOutside);
  },
  methods: {
    /**
     * xử lí sự kiện click vào icon sẽ show ra các option
     * created By: NTTan (19/7/2021)
     */
    iconOnClick() {
      this.filterResult();
      this.arrowCounter = -1;
      this.isShowOption = !this.isShowOption;
      if (this.isShowOption == true) this.$refs.refinput.focus();
    },
    /**
     * xử lí sự kiện click vào các option
     * created By: NTTan (19/7/2021)
     */
    select: function (item) {
      this.isShowOption = false;
      this.inputValue = `${item.name}`;
      this.valueSelect = this.inputValue;
      this.$refs.refinput.focus()
    },
    /**
     * Gán class active vào option được chọn
     * created By: NTTan (19/7/2021)
     */
    checkClassActive(index) {
      if (index == this.selectedIndex) {
        return "active";
      }
    },
    /**
     * xử lí chọn các option có thể được hiện ra
     * created By: NTTan (19/7/2021)
     */
    filterResult() {
      if (this.optionAll === undefined) {
        this.items = [...this.item];
      }
      this.results = this.items.filter((item) =>
        item.name.toLowerCase().includes(this.inputValue.toLowerCase())
      );
    },
    /**
     * lắng nghê sự thay đổi của input
     * created By: NTTan (19/7/2021)
     */
    onChange() {
      // this.isShowOption = false;
      this.filterResult();
      this.isShowOption = true;
    },
    /**
     * Hàm lí sự kiện click ra ngoài sẽ ẩn combobox
     * created By: NTTan (19/7/2021)
     */
    handleClickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.arrowCounter = -1;
        this.isShowOption = false;
      }
    },
    /**
     * Hàm lí sự kiện sử dụng keyboard ArrowDown (phím xuống)
     * created By: NTTan (19/7/2021)
     */

    onArrowDown() {
      if (this.arrowCounter < this.results.length - 1) {
        this.arrowCounter = this.arrowCounter + 1;
      } else if (this.arrowCounter == this.results.length - 1) {
        this.arrowCounter = 0;
      }
    },
    /**
     * Hàm lí sự kiện sử dụng keyboard ArrowUp (phím lên)
     * created By: NTTan (19/7/2021)
     */
    onArrowUp() {
      if (this.arrowCounter > 0) {
        this.arrowCounter = this.arrowCounter - 1;
      } else if (this.arrowCounter == 0) {
        this.arrowCounter = this.results.length - 1;
      } else {
        this.arrowCounter = this.results.length - 1;
      }
    },
    /**
     * Hàm lí sự kiện sử dụng keyboard Enter
     * created By: NTTan (19/7/2021)
     */
    onEnter() {
      this.inputValue = this.results[this.arrowCounter].name;
      this.valueSelect = this.inputValue;
      this.arrowCounter = -1;
      this.isShowOption = false;
    },
    /**
     * Hàm xử lí validate của combobox
     * Created By: NTtan (21/7/2021)
     */
    validateCombobox(value) {
      if (this.required == false) {
        return;
      }
      if (this.optionAll === undefined) {
        this.items = [...this.item];
      }
      if (!value) {
        this.error = true;
        this.$refs.refinput.title = `${this.label} không được phép bỏ trống`;
      } else {
        var obj = this.items.filter((item) => item.name == value);
        if (obj.length == 0) {
          this.error = true;
          this.$refs.refinput.title = "Vui lòng chọn đúng các Option ở trên";
        } else {
          this.error = false;
          this.$refs.refinput.title = "";
        }
      }
    },
  },
};
</script>
<style scoped>
@import "../../css/common/combobox.css";
</style>