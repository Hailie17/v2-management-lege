<template>
  <div>
    <el-container>
      <!-- 头部 -->
      <el-header>
        <el-dropdown>
          <el-button size="small" type="primary">新建<i class="el-icon-caret-bottom"></i></el-button>
          <el-dropdown-menu slot="dropdown" class="custom-menu">
            <el-dropdown-item icon="el-icon-document-add" style="width: 110px; font-size: 14px">导图</el-dropdown-item>
            <el-dropdown-item icon="el-icon-document" style="width: 110px; font-size: 14px">文档</el-dropdown-item>
            <el-dropdown-item icon="el-icon-folder" style="width: 110px; font-size: 14px">文件夹</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button size="small" type="primary" plain>上传</el-button>
        <el-button size="small" type="primary" plain>删除</el-button>
        <el-button size="small" type="primary" plain>移动</el-button>
        <div class="fr-input">
          <el-input placeholder="标题 / 创建人" v-model="input"></el-input>
          <i class="el-icon-s-grid"></i>
          <i class="el-icon-menu"></i>
        </div>
      </el-header>
      <el-container>
        <!-- 左侧 -->
        <el-aside width="200px">
          <div class="aside-title">
            <i class="el-icon-folder-opened"></i>
            <span>所有文件</span>
            <i class="el-icon-more"></i>
          </div>
          <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick">
            <template #default="{ node, data }">
              <span>
                <i class="el-icon-folder"></i> {{ node.label }}
              </span>
            </template>
          </el-tree>
        </el-aside>
        <!-- 右侧 -->
        <el-main>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="全部文件" name="all">
              <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column type="selection"></el-table-column>
                <el-table-column label="名称">
                  <template slot-scope="scope"><i :class="scope.row.icon"></i><span>{{ scope.row.title }}</span></template>
                </el-table-column>
                <el-table-column width="50">
                  <template slot-scope="scope">
                    <el-dropdown trigger="click" @command="(command) => menuClick(command, scope.row)">
                      <i class="el-icon-more" style="transform: rotate(90deg); font-size: 14px;"></i>
                      <el-dropdown-menu slot="dropdown" class="custom-menu">
                        <el-dropdown-item icon="el-icon-edit-outline" command="rename">重命名</el-dropdown-item>
                        <el-dropdown-item icon="el-icon-delete" command="delete">刪除</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </template>
                </el-table-column>
                <el-table-column prop="creator" label="创建人" width="250"></el-table-column>
                <el-table-column prop="editTime" sortable label="最近修改时间" width="180"></el-table-column>
                <el-table-column label="操作" width="150">
                  <template slot-scope="scope">
                    <el-button type="text"
                               size="mini"
                               @click="showDetail(scope.$index, scope.row)">预览</el-button>
                    <el-button type="text"
                               size="mini"
                               @click="downloadFile(scope.$index, scope.row)">下载</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="文档" name="word">
              <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column type="selection"></el-table-column>
                <el-table-column label="名称">
                  <template slot-scope="scope"><i :class="scope.row.icon"></i><span>{{ scope.row.title }}</span></template>
                </el-table-column>
                <el-table-column width="50">
                  <template slot-scope="scope">
                    <el-dropdown trigger="click" @command="(command) => menuClick(command, scope.row)">
                      <i class="el-icon-more" style="transform: rotate(90deg); font-size: 14px;"></i>
                      <el-dropdown-menu slot="dropdown" class="custom-menu">
                        <el-dropdown-item icon="el-icon-edit-outline" command="rename">重命名</el-dropdown-item>
                        <el-dropdown-item icon="el-icon-delete" command="delete">刪除</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </template>
                </el-table-column>
                <el-table-column prop="creator" label="创建人" width="250"></el-table-column>
                <el-table-column prop="editTime" sortable label="最近修改时间" width="180"></el-table-column>
                <el-table-column label="操作" width="150">
                  <template slot-scope="scope">
                    <el-button type="text"
                               size="mini"
                               @click="handleEdit(scope.$index, scope.row)">预览</el-button>
                    <el-button type="text"
                               size="mini"
                               @click="handleDelete(scope.$index, scope.row)">下载</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="图片" name="img">
              <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column type="selection"></el-table-column>
                <el-table-column label="名称">
                  <template slot-scope="scope"><i :class="scope.row.icon"></i><span>{{ scope.row.title }}</span></template>
                </el-table-column>
                <el-table-column width="50">
                  <template slot-scope="scope">
                    <el-dropdown trigger="click" @command="(command) => menuClick(command, scope.row)">
                      <i class="el-icon-more" style="transform: rotate(90deg); font-size: 14px;"></i>
                      <el-dropdown-menu slot="dropdown" class="custom-menu">
                        <el-dropdown-item icon="el-icon-edit-outline" command="rename">重命名</el-dropdown-item>
                        <el-dropdown-item icon="el-icon-delete" command="delete">刪除</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </template>
                </el-table-column>
                <el-table-column prop="creator" label="创建人" width="250"></el-table-column>
                <el-table-column prop="editTime" sortable label="最近修改时间" width="180"></el-table-column>
                <el-table-column label="操作" width="150">
                  <template slot-scope="scope">
                    <el-button type="text"
                               size="mini"
                               @click="handleEdit(scope.$index, scope.row)">预览</el-button>
                    <el-button type="text"
                               size="mini"
                               @click="handleDelete(scope.$index, scope.row)">下载</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="思维导图" name="mind">
              <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column type="selection"></el-table-column>
                <el-table-column label="名称">
                  <template slot-scope="scope"><i :class="scope.row.icon"></i><span>{{ scope.row.title }}</span></template>
                </el-table-column>
                <el-table-column width="50">
                  <template slot-scope="scope">
                    <el-dropdown trigger="click" @command="(command) => menuClick(command, scope.row)">
                      <i class="el-icon-more" style="transform: rotate(90deg); font-size: 14px;"></i>
                      <el-dropdown-menu slot="dropdown" class="custom-menu">
                        <el-dropdown-item icon="el-icon-edit-outline" command="rename">重命名</el-dropdown-item>
                        <el-dropdown-item icon="el-icon-delete" command="delete">刪除</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </template>
                </el-table-column>
                <el-table-column prop="creator" label="创建人" width="250"></el-table-column>
                <el-table-column prop="editTime" sortable label="最近修改时间" width="180"></el-table-column>
                <el-table-column label="操作" width="150">
                  <template slot-scope="scope">
                    <el-button type="text"
                               size="mini"
                               @click="handleEdit(scope.$index, scope.row)">预览</el-button>
                    <el-button type="text"
                               size="mini"
                               @click="handleDelete(scope.$index, scope.row)">下载</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="其他" name="other">
              <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column type="selection"></el-table-column>
                <el-table-column label="名称">
                  <template slot-scope="scope"><i :class="scope.row.icon"></i><span>{{ scope.row.title }}</span></template>
                </el-table-column>
                <el-table-column width="50">
                  <template slot-scope="scope">
                    <el-dropdown trigger="click" @command="(command) => menuClick(command, scope.row)">
                      <i class="el-icon-more" style="transform: rotate(90deg); font-size: 14px;"></i>
                      <el-dropdown-menu slot="dropdown" class="custom-menu">
                        <el-dropdown-item icon="el-icon-edit-outline" command="rename">重命名</el-dropdown-item>
                        <el-dropdown-item icon="el-icon-delete" command="delete">刪除</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </template>
                </el-table-column>
                <el-table-column prop="creator" label="创建人" width="250"></el-table-column>
                <el-table-column prop="editTime" sortable label="最近修改时间" width="180"></el-table-column>
                <el-table-column label="操作" width="150">
                  <template slot-scope="scope">
                    <el-button type="text"
                               size="mini"
                               @click="handleEdit(scope.$index, scope.row)">预览</el-button>
                    <el-button type="text"
                               size="mini"
                               @click="handleDelete(scope.$index, scope.row)">下载</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
          <!-- 弹框 -->
          <el-dialog title="收货地址" :visible.sync="dialogTableVisible">
            <el-table :data="gridData">
              <el-table-column property="date" label="日期" width="150"></el-table-column>
              <el-table-column property="name" label="姓名" width="200"></el-table-column>
              <el-table-column property="address" label="地址"></el-table-column>
            </el-table>
          </el-dialog>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      data: [
        {
          label: '招聘管理',
          children: [{
            label: '二级 1-1',
            children: [{
              label: '三级 1-1-1'
            }]
          }]
        },
        {
          label: '个人文档'
        },
        {
          label: '其他'
        },
        {
          label: '产品文档',
          children: [{
            label: '二级 1-1',
            children: [{
              label: '三级 1-1-1'
            }]
          }]
        },
        {
          label: '团队文档',
          children: [{
            label: '二级 1-1',
            children: [{
              label: '三级 1-1-1'
            }]
          }]
        },
        {
          label: '运营文档',
          children: [{
            label: '二级 1-1',
            children: [{
              label: '三级 1-1-1'
            }]
          }]
        }],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      input: '',
      activeName: 'all',
      tableData: [
        { title: '个人文档.word', creator: '杨小果', editTime: '2018-08-08', icon: 'el-icon-document-remove' },
        { title: '其他.xmind', creator: '杨小果', editTime: '2018-08-07', icon: 'el-icon-document-add' },
        { title: '产品文档.pdf', creator: '杨小果', editTime: '2018-08-06', icon: 'el-icon-document' },
        { title: '需求文档.xls', creator: '杨小果', editTime: '2018-08-06', icon: 'el-icon-document-copy' },
        { title: '设计文档.md', creator: '杨小果', editTime: '2018-08-06', icon: 'el-icon-document-checked' },
        { title: '团队文档.ppt', creator: '杨小果', editTime: '2018-08-05', icon: 'el-icon-tickets' }
      ],
      dialogTableVisible: false,
      gridData: ['']
    }
  },
  methods: {
    showDetail (i, row) {
      console.log(i, 22)
      console.log(row, 12)
    },
    downloadFile () {},
    handleClick (tab, event) {
      console.log(tab, event)
    },
    menuClick (command, row) {
      if (command === 'rename') {
        this.$prompt('请输入文件名', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({ value }) => {
          this.$message({
            type: 'success',
            message: '新文件名是: ' + value
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          })
        })
      } else if (command === 'delete') {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    },
    handleNodeClick (data) {
      console.log(data)
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
    handleSelectionChange (val) {
      this.multipleSelection = val
    }
  }
}
</script>

<style lang="less" scoped>
.el-header {
  border-bottom: 1px solid #ececec;
  padding: 0 0 55px 0;

  button {
    width: 100px;
    font-size: 14px;
    margin: 10px 0 10px 10px;
    i {
      margin-left: 2px;
    }
  }
  .fr-input {
    float: right;
    padding-top: 15px;
    padding-right: 20px;
    ::v-deep .el-input__inner {
      border-radius: 50px !important;
      height: 32px;
    }
    i {
      padding-left: 10px;
    }
  }
  .el-input {
    width: 200px;
  }

}

.el-aside {
  border-right: 1px solid #ececec;
  padding-left: 10px;

  .aside-title {
    padding-top: 15px;

    span {
      font-size: 14px;
      font-weight: 600;
      color: #3f4a56;
    }
  }
  .el-tree {
    font-size: 14px;
  }

  .el-icon-folder-opened {
    padding-right: 15px;
    font-size: 18px;
    font-weight: 600;
    color: #8091a5;
  }

  .el-icon-more {
    transform: rotate(90deg);
    float: right;
    margin-right: 5px;
    font-size: 14px;
    padding-top: 10px;
    color: #8091a5;
  }

  .el-tree {
    padding-top: 10px;
    ::v-deep .el-tree-node__content {
      padding-top: 8px;
    }
  }
}

.el-main {
  .el-table__row i {
    font-size: 18px;
    padding-right: 5px;
    color: #4f8ef5;
    padding-top: 2px;
  }
  .el-table__row span {
    padding-bottom: 5px;
  }
  ::v-deep .el-tabs__nav-wrap::after {
    background-color: unset;
  }
}
</style>
