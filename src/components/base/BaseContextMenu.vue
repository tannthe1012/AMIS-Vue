<template>
    <div id="contextmenu">
        <div id="contextmenu-update" @click="showDataFormDetail">Sửa</div>
        <div id="contextmenu-delete" @click="showPopupDetele">Xóa</div>
    </div>
</template>
<script>
export default {
    name: "BaseContextMenu",
    methods: {
        /**
         * Xử lí sự kiện khi nhấn nút Xóa
         * Created By: NTTan (20/7/2021)
         */
        showPopupDetele() {
            this.$emit("showPopupDelete");
        },
        /**
         * Xử lí sự kiện khi nhấn nút Sửa
         * Created By: NTTan (20/7/2021)
         */
        showDataFormDetail() {
            this.$emit("showDataFormDetail");
        }
    },
}
</script>
<style scoped>
    @import '../../css/common/contextmenu.css'
</style>