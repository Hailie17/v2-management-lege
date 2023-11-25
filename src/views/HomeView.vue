<template>
  <div>
    <el-container>
      <!-- 头部 -->
      <el-header>
        <el-dropdown>
          <el-button type="primary">
            新建
            <i class="el-icon-caret-bottom"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown" class="custom-menu">
            <el-dropdown-item icon="el-icon-document-add" style="width: 110px; font-size: 14px">导图</el-dropdown-item>
            <el-dropdown-item icon="el-icon-document" style="width: 110px; font-size: 14px">文档</el-dropdown-item>
            <el-dropdown-item icon="el-icon-folder" style="width: 110px; font-size: 14px">文件夹</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button type="primary" plain>上传</el-button>
        <el-button type="primary" plain>删除</el-button>
        <el-button type="primary" plain>移动</el-button>
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
                  <template slot-scope="scope"><i class="el-icon-folder"></i><span>{{ scope.row.title }}</span></template>
                </el-table-column>
                <el-table-column prop="creator" label="创建人" width="250"></el-table-column>
                <el-table-column prop="editTime" label="最近修改时间" width="180"></el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="文件夹" name="file">文件夹</el-tab-pane>
            <el-tab-pane label="文档" name="word">文档</el-tab-pane>
            <el-tab-pane label="图片" name="img">图片</el-tab-pane>
            <el-tab-pane label="思维导图" name="mind">思维导图</el-tab-pane>
            <el-tab-pane label="其他" name="other">其他</el-tab-pane>
          </el-tabs>
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
      activeName: 'all',
      tableData: [
        { title: '招聘管理', creator: '杨小果', editTime: '2018-08-08' },
        { title: '个人文档', creator: '杨小果', editTime: '2018-08-08' },
        { title: '其他', creator: '杨小果', editTime: '2018-08-08' },
        { title: '产品文档', creator: '杨小果', editTime: '2018-08-08' },
        { title: '团队文档', creator: '杨小果', editTime: '2018-08-08' }
      ]
    }
  },
  methods: {
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
  padding: 0 0 70px 0;

  button {
    width: 150px;
    height: 50px;
    font-size: 16px;
    margin: 10px 0 10px 10px;
    i {
      margin-left: 2px;
    }
  }
  .fr-input {
    float: right;
    padding-top: 15px;
    padding-right: 20px;
    .el-input__inner {
      border-radius: 30px;
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
      font-size: 18px;
      font-weight: 600;
      color: #3f4a56;
    }
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
    font-size: 18px;
    color: #8091a5;
  }

  .el-tree {
    padding-top: 10px;
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
