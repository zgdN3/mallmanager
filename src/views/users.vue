<template>
<!-- 文档中是指卡片  也就是一个小的div -->
<el-card class="box-card">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 搜索框 -->
    <el-row class="searchArea">
        <el-col :span="24">
            <el-input v-model="searchVal" class="searchInput" clearable placeholder="请输入内容">
                <el-button @click="searchUser()" slot="append" icon="el-icon-search"></el-button>
            </el-input>
            <el-button type="success" @click="showDiaAddUser()">添加用户</el-button>
        </el-col>
    </el-row>
    <!-- 分配角色框 -->
    <el-dialog title="分配角色" :visible.sync="dialogFormVisibleRoleuser">
  <el-form>
    <el-form-item label="用户名" :label-width="formLabelWidth">
      <!-- 需要一个用户名 -->
      {{currUserName}}
    </el-form-item>
    <el-form-item label="角色" :label-width="formLabelWidth">
      <el-select v-model="currRoleId" >
        <el-option disabled label="请选择" :value="-1"></el-option>
        <el-option v-for="(item,index) in roles" :key="index" 
        :label="item.roleName" :value="item.id"
        ></el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="setRole()">确 定</el-button>
  </div>
</el-dialog>
    <!-- 编辑用户的对话框 -->
    <el-dialog title="编辑用户" :visible.sync="dialogFormVisiblEdituser">
        <el-form :model="formData">
            <el-form-item label="用户名" :label-width="formLabelWidth">
                <el-input disabled v-model="formData.username" autocomplete="off"></el-input>
            </el-form-item>
           
            <el-form-item label="邮箱" :label-width="formLabelWidth">
                <el-input v-model="formData.email" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="电话" :label-width="formLabelWidth">
                <el-input v-model="formData.mobile" autocomplete="off"></el-input>
            </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisiblEdituser = false">取 消</el-button>
            <el-button type="primary" @click="editUser()">确 定</el-button>
        </div>
    </el-dialog>
    <!-- 添加用户对话框 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdduser">
        <el-form :model="formData">
            <el-form-item label="用户名" :label-width="formLabelWidth">
                <el-input v-model="formData.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" :label-width="formLabelWidth">
                <el-input v-model="formData.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" :label-width="formLabelWidth">
                <el-input v-model="formData.email" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="电话" :label-width="formLabelWidth">
                <el-input v-model="formData.mobile" autocomplete="off"></el-input>
            </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisibleAdduser = false">取 消</el-button>
            <el-button type="primary" @click="addUser()">确 定</el-button>
        </div>
    </el-dialog>
    <!-- 表格 -->
    <el-table v-loading="loading" :data="list" style="width: 100%">
        <!-- 序号 -->
        <el-table-column type="index" width="80" prop="date" label="#">
        </el-table-column>

        <el-table-column prop="username" label="姓名" width="120">
        </el-table-column>
        <el-table-column prop="email" label="邮箱">
        </el-table-column>
        <el-table-column prop="mobile" label="电话">
        </el-table-column>
        <el-table-column label="创建日期">
            <template slot-scope="scope">
                {{scope.row.create_time | fmtData}}
            </template>
        </el-table-column>
        <el-table-column label="用户状态">
            <!-- 这列中的内容并不是prop  而是一些组件  此时需要给这组件  加个容器 叫template -->
            <!-- template 容器  slot-scope属性作用就是传值 -->

            <!-- slot-scope的值现在就是list数组 -->
            <template slot-scope="scope">
                <el-switch @change="changeMgState(scope.row)" v-model="scope.row.mg_state" active-color="#12ce66" inactive-color="#ff4949"></el-switch>
            </template>
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <!-- 编辑按钮 -->
                <el-button type="primary" 
                icon="el-icon-edit" 
                circle 
                siza="mini"
                 plain @click="showEditdia(scope.row)"
                 ></el-button>
                 <!-- 权限弹框 -->
                <el-button type="success" 
                icon="el-icon-check" circle siza="mini" plain 
                @click="showRoledia(scope.row)"></el-button>
                <!-- 删除按钮 -->
                <el-button type="danger" icon="el-icon-delete" circle siza="mini" plain @click="showDelefirm(scope.row)"></el-button>
            </template>
        </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[2, 4, 6, 8]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
</el-card>
</template>

<script>
export default {
    mounted() {
        this.loadTableData()
    },
    methods: {
//分配角色 - 修改角色
async setRole(){
//关闭对话框
this.dialogFormVisibleRoleuser = false
//发送请求
const res  = await this.$http.put(`users/${this.getRoleByUserId}/role`,{
    rid:this.currRoleId
})
const {meta:{status,msg}} = res.data
if(status===200){
    this.$message.success(msg)
}
},
        //分配角色 - 显示对话框
        async showRoledia(user){
this.getRoleByUserId = user.id
            // 打开对话框
            this.dialogFormVisibleRoleuser = true
            // 传个值
            this.currUserName = user.username
            const res = await this.$http.get('roles')
            // console.log(res)
            this.roles = res.data.data
            // 显示当前用户的角色
            //通过users/:id请求  获取当前用户的role_id
            const resl = await this.$http.get(`users/${user.id}`)
            this.currRoleId = resl.data.data.rid
        },
// 编辑用户 -发送表单
async editUser(){
    this.dialogFormVisiblEdituser = false
    //发送请求
    const res = await this.$http.put(`user/${this.currUserId}`,this.formData)
    const{
        meta:{msg,status}
    }=res.data
    if(status === 200){
        this.$message.success(msg)
        // this.loadTableData()
    }
},
//编辑用户 - 显示对话框
showEditdia(user){
    this.dialogFormVisiblEdituser = true
    this.formData = user
    this.currUserId = user.id
},
        //添加用户-表单提交
        async addUser() {
            // 关闭对话框
            this.dialogFormVisibleAdduser = false
            // 发送post 传数据
            const res = await this.$http.post('users', this.formData)
            // console.log(res)
            const {
                meta: {
                    status,
                    msg
                }
            } = res.data
            if (status === 201) {
                // 清空表单数据
                this.formData = {}
                // for (const key in this.formData){
                //     if(this.formData.hasOwnProperty(key)){
                //         this.formData[key] = ''
                //     }
                // }
                //提示框
                this.$message.success(msg)
                this.loadTableData()
            }
        },
        // 添加用户-显示对话框
        showDiaAddUser() {
            this.dialogFormVisibleAdduser = true
        },
        //弹出删除提示框
        showDelefirm(user) {
            this.$confirm('Sure?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                //发送请求
                const res = await this.$http.delete(`users/${user.id}`)
                // console.log(res)
                //拿到删除后的数据
                const {
                    meta: {
                        msg,
                        status
                    }
                } = res.data
                //进行判断
                if (status === 200) {
                    this.pagenum = 1
                    this.currentPage = 1
                    this.loadTableData()
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }

            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },

        //修改用户状态
        async changeMgState(user) {
            //发送请求
            const res = await this.$http.put(`users/${user.id}/state/${user.mg_state}`)
            console.log(res)
            const {
                meta: {
                    msg,
                    status
                }
            } = res.data
            if (status === 200) {
                this.$message.success(msg)
            }
        },
        //搜索用户
        async searchUser() {
            this.loadTableData()
        },
        // 分页方法
        handleSizeChange(val) {
            // console.log(`每页 ${val} 条`);
            this.pagesize = val
            this.loadTableData()
        },
        handleCurrentChange(val) {
            // console.log(`当前页: ${val}`);
            this.pagenum = val
            this.loadTableData()
        },
        async loadTableData() {
            this.loading = true
            //需要设置请求头 Authorization = token

            //先获取到token
            const AUTH_TOKEN = sessionStorage.getItem('token')
            this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN
            // 发送请求 返回数据
            const res = await this.$http.get(`users?pagenum=${this.pagenum}&pagesize=${this.pagesize}
            &query=${this.searchVal}`)
            // console.log(res);
            // 渲染数据
            const {
                meta,
                data
            } = res.data
            if (meta.status === 200) {
                this.total = res.data.data.total
                this.loading = false
                this.list = data.users
            }
        }
    },
    data() {
        return {
            list: [],
            loading:false,
            // 分页相关的数据
            currentPage: 1,
            //初始页面的条数
            pagesize: 2,
            total: 10,
            pagenmun: 1,
            //搜索调用
            searchVal: '',
            // 添加用户的对话框
            dialogFormVisibleAdduser: false,
            // 添加用户的表单数据
            formData: {
                username: '',
                password: '',
                email: '',
                mobile: ''
            },
            formLabelWidth: '140px',
            // 编辑
            dialogFormVisiblEdituser:false,
            currUserId:-1,
            // 分配角色对话框
            dialogFormVisibleRoleuser:false,
            currUserName:'',
            // 当前角色id
            currRoleId:-1,
            // 角色选择
            roles:[],
            getRoleByUserId:-1
        }
    }
}
</script>

<style>
.box-card {
    height: 100%;
}

.searchArea {
    margin-top: 10px;
    margin-bottom: 10px;
}

.searchArea .searchInput {
    widows: 350px;
}
</style>
