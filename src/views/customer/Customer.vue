<template>
  <div>
    <template>
      <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="客户姓名" width="200">
          <template slot-scope="{ row }">{{ row.name }}</template>
        </el-table-column>
        <el-table-column prop="phone" label="电话" align="center" width="150"></el-table-column>
        <el-table-column prop="sex" label="性别" width="120" align="center">
          <template slot-scope="{ row }">{{ row.sex === '0' ? '男' : (row.sex === '1' ? '女' : '保密') }}</template>
        </el-table-column>
        <el-table-column prop="inputUserName" label="录入人"></el-table-column>
        <el-table-column label="录入时间">
          <template slot-scope="{ row }">{{ row.entryTime | formatDate }}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="{ row }">
            <el-button icon="el-icon-edit" type="text" @click="edit([tableData[1], tableData[2]])">修改</el-button>
            <el-button @click="toggleSelection()">取消选择</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
import { GetCustomerListApi } from '@/request/api'
export default {
  data () {
    return {
      page: 1,
      size: 10,
      total: 0,
      tableData: []
    }
  },
  mounted () {
    this.getTableData()
  },
  methods: {
    async getTableData () {
      const customerListRes = await GetCustomerListApi({ pageNum: this.page, pageSize: this.size })
      this.tableData = customerListRes.rows
      this.total = customerListRes.total
    },
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    edit (val) {
      this.multipleSelection = val
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
