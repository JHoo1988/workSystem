var vue = new Vue({
    el: '#caseMonitor',
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
            caseStatuSelected: '',//搜索条件输入框-选择的case状态
            caseStatuArray: [{ //搜索条件输入框-case级别状态
                value: 'SS_1100',
                label: '受理中'
            }, {
                value: 'SS_1400',
                label: '待处理'
            }, {
                value: 'SS_1600',
                label: '待回拨'
            }, {
                value: 'SS_4100',
                label: '待派工'
            }, {
                value: 'SS_4400',
                label: '待抢单'
            }, {
                value: 'SS_4700',
                label: '待回单'
            }, {
                value: 'SS_6100',
                label: '待回访'
            }, {
                value: 'SS_6400',
                label: '回访中'
            }, {
                value: 'SS_9100',
                label: '结束'
            }, {
                value: 'SS_CLOSEVISIT',
                label: '结束回访任务'
            }, {
                value: 'SS_REMIND',
                label: '提醒'
            }, {
                value: 'SS_1100,SS_1400,SS_1600,SS_4100,SS_4400,SS_4700,SS_REMIND',
                label: '未关闭'
            }],
            superviseSelected: '',//搜索条件输入框-选择的是否督办
            superviseArray: [{ //搜索条件输入框-是否督办选项
                value: '0',
                label: '否'
            }, {
                value: '1',
                label: '是'
            }],
            importantSelected: '',//搜索条件输入框-选择的是否重点
            importantArray: [{ //搜索条件输入框-是否重点选项
                value: '0',
                label: '否'
            }, {
                value: '1',
                label: '是'
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
            sourceTypeSelected: '',//搜索条件输入框-选择的来源类型
            sourceTypeArray: [{ //搜索条件输入框-来源类型选项
                value: '0',
                label: '受理'
            }, {
                value: '1',
                label: '自接单'
            }, {
                value: '2',
                label: '导入'
            }, {
                value: '3',
                label: '接口'
            }],
            caseNoSearch: '',//搜索条件输入框-case单号
            originalNoSearch: '',//搜索条件输入框-原始单号
            customerNameSearch: '',//搜索条件输入框-客户姓名
            customerPhoneNoSearch: '',//搜索条件输入框-客户电话
            shopSearch: '',//搜索条件输入框-所属门店
            orderSourceSearch: '',//搜索条件输入框-订单来源
            selfReceiptDialog: false,// 是否显示“自接单”dialog
            formLabelWidth: '100px',
            selfReceiptForm: {
                businessCategoryOptions: [
                    {name: '空调', value: '0'},
                    {name: '冰洗', value: '1'},
                ],
                shopOptions: [
                    {name: '乐华', value: '0'},
                    {name: '雷鸟', value: '1'},
                ],
                selfReceiptbusinessCategorySelected: '',//自接单-选择的业务类型
                selfReceiptShopSelected: '',//自接单-选择的厂商
            },
            selfReceiptRules: {
                selfReceiptbusinessCategorySelected: [
                    {required: true, message: '请选择业务类型', trigger: 'change'}
                ],
                selfReceiptShopSelected: [
                    {required: true, message: '请选择厂商', trigger: 'change'}
                ],

            },
            selfReceiptTooltipShow: false,// 自接单页面选择厂商的tips提示
            selfReceiptSelectShow: true,// 自接单页面选择厂商的选择框是否可用
            selectMoreCase: false,// 搜索条件-是否选择了多个case单
            selectOneCase: false,// 搜索条件-是否选择了一个case单
        }

    },
    methods: {
        // 分页点击执行
        handleCurrentChange(val) {
            // 页数改变，需要改变查询
            // console.log(`当前页: ${val}`);
            this.tableData = [];//先清空表格数据
            // 请求参数
            var params = {
                pageSize: val// 改变页码
            };
            this.request('/verify/code', params, '查询失败', function (callback) {
            });
        },
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
        // 搜索栏上的“自接单”按钮的出发事件
        selfReceipt: function () {
            // 请求参数
            var params = {};
            this.request('/verify/code', params, '业务类型加载失败', function (callback) {
                // 把请求的结果给业务类型选项
                this.selfReceiptForm.businessCategoryOptions = callback;
                this.selfReceiptDialog = true;
            });
        },
        // 自接单-业务类型 选择框改变请求参数列表选项
        selfReceiptChange: function (val) {
            var param = {};
            this.request('/verify/code', param, '获取厂商列表失败', function (callback) {
                // 厂商列表获取成功;
                this.selfReceiptForm.shopOptions = callback;
                this.selfReceiptTooltipShow = true;// 自接单页面选择厂商的tips提示
                this.selfReceiptSelectShow = false;// 自接单页面选择厂商的选择框是否可用
            });
        },
        // 操作-审核-确定 按钮点击事件
        examine(formName, value) {
            console.log(value);
            var $this = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    var param = {}
                    this.request('/verify/code', param, '自接单失败', function (callback) {
                        // 审核操作成功;
                        $this.selfReceiptDialog = false;
                    });
                } else {
                    return false;
                }
            });
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