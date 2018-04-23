var vue = new Vue({
    el: '#workMonitor',
    data: function () {
        return {
            paginationTotal: 500,//总条数
            paginationPageSize: 20,//每一页显示的数量
            loading: false,// 加载框
            putIn: false,//“放入操作台”的按钮是否显示
            businessCategorySelected: '',//搜索条件输入框-选择的业务类型
            businessCategoryArray: [{ //搜索条件输入框-业务类型选项
                value: '1294',
                label: '空调'
            }, {
                value: '1562',
                label: '冰洗'
            }, {
                value: '2226',
                label: '彩电'
            }, {
                value: '4209',
                label: 'C端业务'
            }, {
                value: '12281',
                label: 'TCL小家电'
            }, {
                value: '12566',
                label: '销售服务'
            }, {
                value: '12572',
                label: '物流服务'
            }, {
                value: '12579',
                label: '订单服务'
            }, {
                value: '2956',
                label: '其他业务'
            }],
            caseLevelSelected: '',//搜索条件输入框-选择的case级别
            caseLevelArray: [{ //搜索条件输入框-case级别选项
                value: '403',
                label: '普通单'
            }, {
                value: '404',
                label: '1级CASE单'
            }, {
                value: '405',
                label: '2级CASE单'
            }, {
                value: '406',
                label: '3级CASE单'
            }, {
                value: '407',
                label: '4级CASE单'
            }, {
                value: '408',
                label: '5级CASE单'
            }],
            workStatuSelected: '',//搜索条件输入框-选择的case状态
            workStatuArray: [{ //搜索条件输入框-工单状态
                value: 'OS_100',
                label: '待接单'
            }, {
                value: 'OS_400',
                label: '待回单'
            }, {
                value: 'OS_700',
                label: '已回过程单'
            }, {
                value: 'OS_900',
                label: '已关闭'
            }, {
                value: 'OS_100,OS_400,OS_700,SS_W_REMIND',
                label: '未关闭'
            }],
            processeSourceSelected: '',//搜索条件输入框-选择的处理来源
            processeSourceArray: [{ //搜索条件输入框-处理来源选项
                value: 'SS_1101',
                label: '入库失败'
            }, {
                value: 'SS_1102',
                label: '工作流启动失败'
            }, {
                value: 'SS_1103',
                label: '自动流转失败'
            }, {
                value: 'SS_1401',
                label: '重新处理'
            }],
            caseNoSearch: '',//搜索条件输入框-case单号
            originalNoSearch: '',//搜索条件输入框-原始单号
            officeSearch: '',//搜索条件输入框-办事处
            customerPhoneNoSearch: '',//搜索条件输入框-客户电话
            newWorkNoSearch: '',//搜索条件输入框-新工单号
            shopSearch: '',//搜索条件输入框-所属门店
            orderSourceSearch: '',//搜索条件输入框-订单来源
            formLabelWidth: '100px',
            selectMoreCase: false,// 搜索条件-是否选择了多个case单
            tableData: [{
                col1: 'SFDJJSONG',
                col2: '10000032',
                col3: '深圳十分到家服务科技有限公司',
                col4: '经销商类',
                col5: '非TCL系',
                col6: '测试测',
                col7: '027-12345678',
                col8: '广东省深圳市南山区西丽街道中山园路1001号Tcl国际E城F5栋3楼',
                col9: '备注：广东省深圳市南山区西丽街道中山园路1001号Tcl国际E城F5栋3楼',
                col10: '2018-04-16 10:35:55',
                col11: '2018-04-17 10:35:55',
                col12: '已生效',
                col13: '十分到家品牌',
                col14: '启用',
                col15: '已审核',
            },{
                col1: 'SFDJJSONG',
                col2: '10000032',
                col3: '深圳十分到家服务科技有限公司',
                col4: '经销商类',
                col5: '非TCL系',
                col6: '测试测',
                col7: '027-12345678',
                col8: '广东省深圳市南山区西丽街道中山园路1001号Tcl国际E城F5栋3楼',
                col9: '备注：广东省深圳市南山区西丽街道中山园路1001号Tcl国际E城F5栋3楼',
                col10: '2018-04-16 10:35:55',
                col11: '2018-04-17 10:35:55',
                col12: '已生效',
                col13: '十分到家品牌',
                col14: '启用',
                col15: '已审核',
            }],
            currentPage:1,
            multipleSelection: [],//多选所选中的项
        }

    },
    methods: {
        // 搜索按钮点击执行
        search: function () {
            // 请求参数
            var params = {
                caseNoSearch: this.caseNoSearch,// case单号输入框的内容
            };
            this.request('/verify/code', params, '搜索失败', function (callback) {
                // 搜索有结果-把搜索到的结果赋值给tableData3;
                // $this.tableData=response.data.code;

                // 如果没有搜索到结果，执行下面的一段提示
                // $this.$alert('根据你设置的查询条件，没有搜索到相关厂商。', '提示', {
                //     confirmButtonText: '确定',
                //     type: 'warning',
                //     center: true,
                //     callback: action => {
                //         //点击确定后的操作
                //     }
                // });
            });
        },
        // 每一页显示的条数变化
        handleSizeChange(val){
            console.log('每页 '+val+' 条');

        },
        // 分页点击执行
        handleCurrentChange(val) {
            // 页数改变，需要改变查询
            // console.log(`当前页: ${val}`);
            this.currentPage = val;
            this.tableData = [];//先清空表格数据
            // 请求参数
            var params = {
                pageSize: val// 改变页码
            };
            this.request('/verify/code',params,'查询失败',function (callback) {
            });
        },
        // 多选事件
        handleSelectionChange(val) {
            this.multipleSelection = val;
            if (this.multipleSelection.length > 0) {
                this.putIn = true;
                this.selectMoreCase = true;
            } else {
                this.putIn = false;
                this.selectMoreCase = false;
            }
        },
        getAxiosInstance: function () {
            var _self = this;
            var instance = axios.create({
                baseURL: "http://120.76.157.13:666/mapi",
                method: 'post'
            });
            instance.interceptors.request.use(function (config) {
                // 在发送请求之前做些什么
                _self.loading = true;
                return config;
            }, function (error) {
                // 对请求错误做些什么
                _self.loading = false;
                _self.$message.error('加载失败');
                return Promise.reject(error);
            });
            instance.interceptors.response.use(function (response) {
                //对响应数据做点什么
                // 关闭加载框
                _self.loading = false;
                return response;
            }, function (error) {
                // 对响应错误做点什么 error.response.status
                // 关闭加载框
                _self.loading = false;
                return Promise.reject(error);
            });
            return instance;
        },
        // 请求封装
        request(url, params, errorToast, callback) {
            var $this = this;
            $this.getAxiosInstance().post(url, params).then(function (response) {
                if (response.status == 200) {
                    if (response.data.code == '0000') {
                        callback(response.data.data);//请求结果回调
                    } else {
                        // 其他返回结果
                        $this.$message.warning(response.data.msg);
                    }
                } else {
                    $this.$message.error(errorToast);
                }
            }).catch(function (error) {
                if (error.response && error.response.status != 200) {
                    // 请求已发出，但服务器响应的状态码不在 2xx 范围内
                    $this.$message.error(errorToast);
                } else {
                    $this.$message.error('网络异常');
                }
            });
        }
    }
})