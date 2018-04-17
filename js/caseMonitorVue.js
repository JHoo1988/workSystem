var vue = new Vue({
    el: '#caseMonitor',
    data: function () {
        return {
            paginationTotal: 500,//总条数
            paginationPageSize: 20,//每一页显示的数量
            loading: false,// 加载框
            putIn: false,//“放入操作台”的按钮是否显示
            businessCategorySelected: '',//选择的业务类型
            businessCategoryArray: [{ //业务类型选项
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
            caseLevelSelected: '',//选择的case级别
            caseLevelArray: [{ //case级别选项
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
            caseStatuSelected: '',//选择的case状态
            caseStatuArray: [{ //case级别状态
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
            superviseSelected: '',//选择的是否督办
            superviseArray: [{ //是否督办选项
                value: '0',
                label: '否'
            }, {
                value: '1',
                label: '是'
            }],
            importantSelected: '',//选择的是否重点
            importantArray: [{ //是否重点选项
                value: '0',
                label: '否'
            }, {
                value: '1',
                label: '是'
            }],
            processeSourceSelected: '',//选择的处理来源
            processeSourceArray: [{ //处理来源选项
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
        request(url,params,errorToast,callback){
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