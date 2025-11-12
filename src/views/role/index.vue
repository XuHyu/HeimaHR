<template>
  <div class="container">
    <div class="app-container">
      <div class="role-operate">
        <el-button size="mini" type="primary" @click="showDialog = true">添加角色</el-button>
      </div>
    </div>
    <el-table :data="list">
      <el-table-column prop="name" align="center" width="200" label="角色" />
      <el-table-column prop="state" align="center" width="200" label="启用">
        <template v-slot="{ row }">
          <span> {{ row.state === 1 ? "已启用" : row.state === 0 ? "未启用" : "无" }} </span>
        </template>
      </el-table-column>
      <el-table-column prop="description" align="center" label="描述" />
      <el-table-column align="center" label="操作">
        <template>
          <el-button size="mini" type="text">分配权限</el-button>
          <el-button size="mini" type="text">编辑</el-button>
          <el-button size="mini" type="text">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" style="height:60px" align="middle" justify="end">
      <el-pagination :page-size="pageParams.pagesize" :current-page="pageParams.page" :total="pageParams.total" layout="prev, pager, next" @current-change="changePage" />
    </el-row>
    <el-dialog width="500px" title="新增角色" :visible.sync="showDialog" @close="btnCancel">
      <el-form ref="roleForm" :model="roleForm" :rules="rules" label-width="120px">
        <el-form-item prop="name" label="角色名称">
          <el-input v-model="roleForm.name" style="width:300px" size="mini" />
        </el-form-item>
        <el-form-item prop="state" label="启用">
          <el-switch v-model="roleForm.state" size="mini" />
        </el-form-item>
        <el-form-item prop="description" label="角色描述">
          <el-input v-model="roleForm.description" type="textarea" :rows="3" style="width:300px" size="mini" />
        </el-form-item>
        <el-form-item>
          <el-row type="flex" justify="center">
            <el-col :span="12">
              <el-button type="primary" size="mini" @click="btnOK">确定</el-button>
              <el-button size="mini" @click="btnCancel">取消</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>

import { addRole, getRoleList } from '@/api/role'

export default {
  name: 'Role',
  data() {
    return {
      showDialog: false,
      list: [],
      pageParams: {
        page: 1,
        pagesize: 5,
        total: 0
      },
      roleForm: {
        name: '',
        description: '',
        state: 0 // 默认未1启用 关闭 0 打开1
      },
      rules: {
        name: [{ required: true, message: '角色名称不能为空', trigger: 'blur' }],
        description: [{ required: true, message: '角色描述不能为空', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    async getRoleList() {
      const { rows, total } = await getRoleList(this.pageParams)
      this.list = rows
      this.pageParams.total = total
    },
    changePage(newPage) {
      this.pageParams.page = newPage
      this.getRoleList()
    },
    btnOK() {
      this.$refs.roleForm.validate(async isOK => {
        if (isOK) {
          await addRole(this.roleForm)
          this.$message.success('新增角色成功')
          this.getRoleList()
          this.btnCancel()
        }
      })
    },
    btnCancel() {
      this.$refs.roleForm.resetFields() // 重置表单数据
      this.showDialog = false // 关闭弹层
    }
  }
}
</script>

<style scoped>
.role-operate {
  padding: 10px;
}
</style>
