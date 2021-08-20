<template>
  <div>
    <div class="cbx">
      <div class="cbx-show" :class="{ 'error-combobox': error == true }">
        <input
          :title="errorMessage"
          type="text"
          @keydown.down="onArrowDown"
          @keydown.up="onArrowUp"
          @keydown.enter="onEnter"
          v-model="inputValue"
          ref="refinput"
          readonly
        />
        <!-- <i class="fas fa-chevron-down cbx-icon-dropdown" @click="iconOnClick"></i> -->
        <div class="combo-action" @click="iconOnClick">
          <div class="mi-icon-16 icon-combo"></div>
        </div>
      </div>
      <div class="cbx-hide" v-show="isShowOption">
        <div
          class="cbx-select"
          v-for="(item, index) in items"
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
  </div>
</template>
<script>
export default {
  name: "BaseDropdown",
  data() {
    return {
      error: false,
      errorMessage: "",
      isShowOption: false,
      valueSelect: "10 bản ghi trên 1 trang",
      inputValue: "10 bản ghi trên 1 trang",
      results: [],
      arrowCounter: -1,
      items: [
        { id: "5", name: "50 bản ghi trên 1 trang" },
        { id: "4", name: "40 bản ghi trên 1 trang" },
        { id: "3", name: "30 bản ghi trên 1 trang" },
        { id: "2", name: "20 bản ghi trên 1 trang" },
        { id: "1", name: "10 bản ghi trên 1 trang" },
      ],
    };
  },
//   watch: {
    
//     // valueSelect: function () {
//     //   this.$emit("result", this.valueSelect);
//     // },
//   },
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
      this.$refs.refinput.focus();
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

    onArrowDown(e) {
        e.preventDefault();
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
    onArrowUp(e) {
        e.preventDefault();
        
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
  },
};
</script>
<style scoped>
@import "../../css/common/combobox.css";
.cbx {
    margin-bottom: 0px;
}
.cbx-hide {
    z-index: 200;
    top: -166px;
}
/* .cbx-show input {
    font-family: ;
} */
</style>