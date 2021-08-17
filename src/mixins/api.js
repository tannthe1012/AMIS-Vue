import axios from "axios";
import { toast } from "../mixins/mixin.js";
export const api = {
    mixins: [toast],
    methods: {
        /**
        * Hàm lấy dữ liệu của table
        * Created By:  NTTan (15/7/2021)
        */
        // async getAllEmployee() {
        //     let pageNumber = (this.$store.state.Pagination.currentPage - 1) * 20;
        //     await axios
        //         .get(`https://localhost:44332/api/v1/Employees/filter?pageSize=${this.$store.state.Pagination.pageSize}&pageIndex=${pageNumber}&employeeFilter=NV&departmentId=${this.$store.state.Pagination.departmentId}&positionId=${this.$store.state.Pagination.positionId}`)
        //         .get(`https://localhost:44332/api/v1/Employees/filter?pageIndex=${this.$store.state.Pagination.currentPage}&pageSize=20`)

        //         .then((response) => {
        //             this.$store.state.employeeList= [];
        //             this.$store.state.employeeList = response.data.Data;
        //             this.$store.state.Pagination.totalPage = response.data.TotalPage;
        //             this.$store.state.Pagination.totalRecord = response.data.TotalRecord;

                    
        //         })
        //         .catch(function (error) {
        //             console.log(error);
        //         });
        //},
        async getAllEmployee() {
            await axios
                .get("https://localhost:44332/api/v1/Employees")
                .then((response) => {
                    console.log(response.data);
                    this.$store.state.employeeList= [];
                    this.$store.state.employeeList = response.data;
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        /**
        * Hàm lấy dữ liệu của table
        * Created By:  NTTan (15/7/2021)
        */
        async getPosition() {

            await axios
                .get("https://localhost:44332/api/v1/Positions")
                .then((response) => {
                    this.$store.state.position = [],
                    response.data.forEach((element) => {
                        this.$store.state.position.push({
                            id: element.PositionId,
                            name: element.PositionName,
                        });
                    });
                })
                .catch(function (error) {
                    console.log(error);
                });
        },


        /**
        * Hàm lấy dữ liệu của table
        * Created By:  NTTan (15/7/2021)
        */
        async getDepartment() {
            await axios
                .get("https://localhost:44332/api/v1/Departments")
                .then((response) => {
                    this.$store.state.department = [],
                    response.data.forEach((element) => {
                        this.$store.state.department.push({
                            id: element.DepartmentId,
                            name: element.DepartmentName,
                        });
                    });
                })
                .catch(function (error) {
                    console.log(error);
                });
        },

        /**
        * Hàm xóa dữ liệu của table
        * Created By:  NTTan (15/7/2021)
        */
        async deleteEmployee(id) {
            await axios
                .delete(`https://localhost:44332/api/v1/Employees/${id}`)
                .then(() => {
                    this.$store.state.employeeList = [];
                    this.getAllEmployee();
                    setTimeout(() => {
                        this.addToast("success", "Bạn đã xóa bản ghi thành công");
                    }, 500);
                }).catch(function (error) {
                    console.log(error);
                })
        },
        /**
        * Hàm update dữ liệu của table
        * Created By:  NTTan (15/7/2021)
        */
        async putEmployee(employee) {
            await axios

                .put(
                    `https://localhost:44332/api/v1/Employees/${employee.EmployeeId}`,
                    employee
                )
                .then(() => {
                    this.$store.state.employeeList = [];
                    this.getAllEmployee();
                    setTimeout(() => {
                        this.addToast("success", "Bạn đã sửa dữ liệu thành công");
                    }, 500);
                }).catch(function (error) {
                    console.log(error);
                })
        },
        /**
        * Hàm thêm mới dữ liệu của table
        * Created By:  NTTan (15/7/2021)
        */
        async postEmployee(employee) {
            await axios
                .post(`https://localhost:44332/api/v1/Employees`, employee)
                .then(() => {
                    this.$store.state.employeeList = [];
                    this.getAllEmployee();
                    setTimeout(() => {
                        this.addToast("success", "Bạn đã thêm mới bản ghi thành công");
                    }, 500);
                }).catch(function () {
                    this.addToast("error", "Bạn đã thêm mới bản ghi thất bại");
                })
        },
        
    },
}