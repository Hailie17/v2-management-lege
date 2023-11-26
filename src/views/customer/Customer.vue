<template>
  <div>
    <template>
      <el-button type="primary" icon="el-icon-download" @click="exportClick">导出</el-button>
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
        <el-table-column label="操作" width="200">
          <template slot-scope="{ row }">
            <el-button icon="el-icon-edit" type="text" @click="edit([tableData[1], tableData[2]])">修改</el-button>
            <el-button @click="toggleSelection()">取消选择</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="display: flex; justify-content: flex-end; padding: 20px 20px 0 0">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </template>
  </div>
</template>

<script>
import { GetCustomerListApi, GetCustomerExportApi } from '@/request/api'
import { saveAs } from 'file-saver'
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
    async exportClick () {
      const res = await GetCustomerExportApi({ pageNum: this.page, pageSize: this.size }, {
        responseType: 'blob',
        // 导出文件的请求需要额外传请求配置
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
      // 将返回的数据处理成表格文件，用到插件 file-saver
      saveAs(
        // Blob 对象表示一个不可变、原始数据的类文件对象。
        // Blob 表示的不一定是JavaScript原生格式的数据。
        // File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
        // 返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
        new Blob([res]),
        // 设置导出文件名称
        `客户档案_${new Date().getTime()}.xlsx`
      )
    },
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
    },
    // 分页
    handleSizeChange (val) {
      this.size = val
      this.getTableData()
    },
    handleCurrentChange (val) {
      this.page = val
      this.getTableData()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
