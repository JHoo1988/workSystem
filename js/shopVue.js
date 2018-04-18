new Vue({
    el: '#shop',
    data: function () {
        //自定义校验规则
        var validateHetong = (rule, value, callback) => {
            if (value.length <= 0) {
                callback(new Error('请上传合同'));
            } else if (!value[0].name.endsWith('.jpg') || !value[0].name.endsWith('.jpeg') || !value[0].name.endsWith('.png')) {
                callback(new Error('请上传图片类型'));
            } else {
                callback();
            }
        };
        return {
            paginationTotal: 500,//总条数
            paginationPageSize: 20,//每一页显示的数量
            loading: false,// 加载框
            putIn: false,//“放入操作台”的按钮是否显示
            shop_no: '',// 厂商编码输入框的内容
            shop_name: '',// 厂商名称输入框的内容
            contacts: '',// 联系人输入框的内容
            shopStatusOptions: [{ //厂商状态选项
                value: '0',
                label: '停用'
            }, {
                value: '1',
                label: '启用'
            }],
            shopStatus: '',//用户选择的厂商状态
            checkStatusOptions: [{//审核状态选项
                value: '0',
                label: '未审核'
            }, {
                value: '1',
                label: '审核通过'
            }, {
                value: '2',
                label: '驳回'
            }],
            checkStatus: '',//用户选择的审核状态
            multipleSelection: [],//多选所选中的项
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
                col16: '编辑',
                col17: '审核',
                col18: '表单配置',
                col19: '下单',
            }],
            examineShopObject: null,// 选择的要审核的厂商对象
            editeShopObject: null,// 选择的要编辑的厂商对象
            dialogFormVisible: false,// “操作”-“审核”dialog是否显示
            form: {// 审核厂商 表单对象
                desc: ''// 驳回原因
            },
            examineShopDialogRules: {
                desc: [{
                    required: true, message: '请输入驳回原因', trigger: 'blur'
                }]
            },
            formLabelWidth: '100px',
            examineRadio: 0, //0:表示选择通过，1：表示选择驳回
            editeShopDialogVisible: false, // “操作”-“编辑”dialog是否显示
            editeShopForm: {// 编辑厂商 表单对象
                col1: '',// 厂商编码
                col3: '',// 厂商名称
                col4: '',// 厂商类别
                col5: '',// 厂商性质
                col6: '',// 联系人
                col7: '',// 联系电话
                col8: '',// 住址
                col9: '',// 备注
                // fileList: [{// 合同
                //     name: 'food.jpeg',
                //     url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                // }]
                fileList: [],
                contractValidityValue: '',//合同有效期
                col12: '',//合同状态
                col13:[],//已选品牌集合，根据服务端返回的结果填入即可
                col13Options:['TCL','乐华','志高','雷鸟','美国西屋','商户平台-保内'],//品牌选项集合
            },
            editeShopDialogRules: {// 编辑/新建 厂商 表单校验规则
                col1: [
                    {required: true, message: '请输入厂商编码', trigger: 'blur'}
                ],
                col3: [
                    {required: true, message: '请输入厂商名称', trigger: 'blur'}
                ],
                col4: [
                    {required: true, message: '请选择厂商类别', trigger: 'change'}
                ],
                col5: [
                    {required: true, message: '请选择厂商性质', trigger: 'change'}
                ],
                col6: [
                    {required: true, message: '请输入联系人', trigger: 'blur'}
                ],
                col7: [
                    {required: true, message: '请输入联系电话', trigger: 'blur'}
                ],
                fileList: [
                    {required: true, validator: validateHetong, trigger: 'blur'}
                ],
                contractValidityValue: [
                    {required: true, message: '请选择合同有效期', trigger: 'blur'}
                ],
                col12: [
                    {required: true, message: '请选择合同状态', trigger: 'change'}
                ],
                col14: [
                    {required: true, message: '请选择厂商状态', trigger: 'change'}
                ],
                col13: [
                    {required: true, message: '请选择品牌', trigger: 'blur'}
                ]
            },
            createShopDialogVisible: false, // “新建厂商”dialog是否显示
            createShopForm: {// 编辑厂商 表单对象
                col1: '',// 厂商编码
                col3: '',// 厂商名称
                col4: '',// 厂商类别
                col5: '',// 厂商性质
                col6: '',// 联系人
                col7: '',// 联系电话
                col8: '',// 住址
                col9: '',// 备注
                // fileList: [{// 合同
                //     name: 'food.jpeg',
                //     url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                // }]
                fileList: [],
                contractValidityValue: '',//合同有效期
                col12: '',//合同状态
                col13:[],//已选品牌集合，根据服务端返回的结果填入即可
                col13Options:['TCL','乐华','志高','雷鸟','美国西屋','商户平台-保内'],//品牌选项集合
            }
        }
    },
    methods: {
        // 搜索按钮点击执行
        search: function () {
            // 请求参数
            var params = {
                shop_no: this.shop_no,// 厂商编码输入框的内容
                shop_name: this.shop_name,// 厂商名称输入框的内容
                contacts: this.contacts,// 联系人输入框的内容
                shopStatus: this.shopStatus,// 用户选择的厂商状态
                checkStatus: this.checkStatus,// 联系人输入框的内容
            };
            this.request('/verify/code',params,'搜索失败',function (callback) {
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
        // 分页点击执行
        handleCurrentChange(val) {
            // 页数改变，需要改变查询
            // console.log(`当前页: ${val}`);
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
            } else {
                this.putIn = false;
            }
        },
        // 放入操作台 事件
        putInConsole(rows) {
            // 1.执行放入操作台的操作

            // 2.清空勾选
            if (rows) {
                rows.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
            } else {
                this.$refs.multipleTable.clearSelection();
            }
        },
        // 操作-审核按钮 点击事件
        shopExamineClick(row) {
            this.examineShopObject = row;
            this.examineRadio = 0;
            this.form.desc = '';
            this.dialogFormVisible = true;
        },
        // 操作-表单配置按钮 点击事件
        tableEdite(row) {
            this.examineShopObject = row;
            this.$message('该功能正在开发中...');
        },
        // 操作-下单按钮 点击事件
        placeAnOrder(row) {
            this.examineShopObject = row;
            this.$message('该功能正在开发中...');
        },
        // 操作-审核-确定 按钮点击事件
        examine(formName, id) {
            var $this = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    var url = null;
                    var param = null;
                    if ($this.examineRadio == 0) {
                        // 审核通过
                        url = '/verify/code';
                        param = {
                            id: id
                        }
                    } else {
                        // 驳回
                        url = '/verify/code';
                        param = {
                            id: id,
                            desc: $this.form.desc
                        }
                    }
                    this.request(url,param,'审核失败',function (callback) {
                        // 审核操作成功;
                        $this.dialogFormVisible = false
                    });
                } else {
                    return false;
                }
            });
        },
        // 操作-编辑按钮 点击事件
        shopEditeClick(row) {
            this.editeShopObject = row;
            this.editeShopDialogVisible = true;
            if (this.$refs['editeShopForm']) {
                this.$refs['editeShopForm'].resetFields();
            }
        },
        // 操作-编辑-更新 按钮点击事件
        editeShop(formName) {
            console.log("选择的日期是=" + this.editeShopForm.contractValidityValue);
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    var params={
                        // 编辑厂商要传的参数
                    };
                    this.request('',params,'编辑失败',function (callback) {
                        // 重置表单
                        if (this.$refs['editeShopForm']) {
                            this.$refs['editeShopForm'].resetFields();
                        }
                        // 关闭dialog
                        this.editeShopDialogVisible = false;
                    });
                } else {
                    return false;
                }
            });
        },
        uploadSuccess(response, file, fileList) {
            // 合同上传成功
            console.log(response);
            console.log(fileList);
        },
        uploadError(err, file, fileList) {
            //合同上传失败
            this.$message.warning(`合同上传失败，请重试`);
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制上传1个文件`);
        },
        beforeUpload(file) {// 合同上传之前的判断：判断大小和类型
            if (file.type != "image/jpeg" && file.type != "image/png") {
                this.$message.warning(`请上传jpg或png图片文件`);
                return false;
            } else if ((file.size / 1024) >= 2048) {
                this.$message.warning(`请上传2MB以内的图片文件`);
                return false;
            }
        },
        // 合同-下载 点击事件
        downLoadContractClick(row) {
            this.editeShopObject = row;
        },
        // 新建厂商dialog中 新建 按钮点击事件
        createShop(formName) {
            console.log("选择的日期是=" + this.createShopForm.contractValidityValue);
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    var params={
                        // 编辑厂商要传的参数
                    };
                    this.request('',params,'新建厂商失败',function (callback) {
                        // 重置表单
                        if (this.$refs['createShopForm']) {
                            this.$refs['createShopForm'].resetFields();
                        }
                        // 关闭dialog
                        this.createShopDialogVisible = false;
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