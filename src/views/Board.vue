<template>
  <div class="bord-container">
    <el-tabs stretch type="card">
      <el-tab-pane>
        <span slot="label"><i class="el-icon-guide"></i> 分析</span>
        <div class="card-container" style="margin-top:10px;">
          <div class="card">
            <div class="card-title">
              <h6>待开始</h6>
              <el-dropdown size="mini">
                <span class="el-dropdown-link"><i class="el-icon-more"></i></span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item><span style="display: inline-block; width: 35px; height: 15px; vertical-align: middle; margin-bottom: 3px; background-color: #feda6a; margin-right: 5px"></span>Transfer: 团队间工作衔接</el-dropdown-item>
                  <el-dropdown-item><span style="display: inline-block; width: 35px; height: 15px; vertical-align: middle; margin-bottom: 3px; background-color: #8495af; margin-right: 5px"></span>Inventory: 并行任务</el-dropdown-item>
                  <el-dropdown-item><span style="display: inline-block; width: 35px; height: 15px; vertical-align: middle; margin-bottom: 3px; background-color: #c0570d; margin-right: 5px"></span>Motion: 任务间切换</el-dropdown-item>
                  <el-dropdown-item><span style="display: inline-block; width: 35px; height: 15px; vertical-align: middle; margin-bottom: 3px; background-color: #f2ae7e; margin-right: 5px"></span>Waiting: 等待</el-dropdown-item>
                  <el-dropdown-item><span style="display: inline-block; width: 35px; height: 15px; vertical-align: middle; margin-bottom: 3px; background-color: #9ac4e3; margin-right: 5px"></span>Over-Processing: 过度加工</el-dropdown-item>
                  <el-dropdown-item><span style="display: inline-block; width: 35px; height: 15px; vertical-align: middle; margin-bottom: 3px; background-color: #7a7b7f; margin-right: 5px"></span>Over-Production: 过度生产</el-dropdown-item>
                  <el-dropdown-item><span style="display: inline-block; width: 35px; height: 15px; vertical-align: middle; margin-bottom: 3px; background-color: #567f2e; margin-right: 5px"></span>Defact: 缺陷/返工</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <draggable v-model="todoArray" group="task" @start="drag=true" @end="drag=false" animation="500">
              <div v-for="(item, index) in todoArray" :key="index" class="dragItem">
                <el-checkbox v-model="item.checked" @change="(val) => handleCheckedChange(val, index)"></el-checkbox>
                <span class="item-title" @click="editItem(item)">{{item.title}}</span>
                <el-tag type="danger" size="mini" style="margin-top: 5px; margin-left: 25px" >低</el-tag>
                <el-tag type="danger" size="mini" style="margin-top: 5px; margin-left: 25px" > 1天</el-tag>
                <div class="avatar">
                  <el-avatar :src="item.avatar" size="small"></el-avatar>
                </div>
              </div>
              <el-button v-if="isAdd1" type="text" icon="el-icon-plus" @click="isAdd1 = !isAdd1"></el-button>
              <div v-else class="add-input">
                <el-input v-model="input" placeholder="请输入内容" />
                <div class="block" style="display: flex; padding-right: 10px">
                  <el-date-picker v-model="value1" type="date" placeholder="截止时间" size="mini" value-format="yyyy-MM-dd" format="yyyy/MM/dd"></el-date-picker>
                  <el-button icon="el-icon-user" type="text" style="color: #c0c4cc">负责人</el-button>
                </div>
                <div style="padding: 10px">
                  <el-button type="primary" size="mini" @click="comfirm">确定</el-button>
                  <el-button type="info" plain size="mini" @click="cancel">取消</el-button>
                </div>
              </div>
            </draggable>
          </div>
          <div class="card">
            <h6>实现中</h6>
            <draggable v-model="myArray" group="task" @start="drag=true" @end="drag=false" animation="500">
              <div v-for="(item, index) in myArray" :key="index" class="dragItem">
                <el-checkbox v-model="item.checked" @change="handleCheckedChange">{{item.title}}</el-checkbox>
                <el-tag type="info" size="mini" style="margin-top: 5px; margin-left: 25px" ><i class="el-icon-time"></i>{{ item.time }}</el-tag>
                <div class="avatar">
                  <el-avatar :src="item.avatar" size="small"></el-avatar>
                </div>
              </div>
              <el-button v-if="isAdd2" type="text" icon="el-icon-plus" @click="isAdd2 = !isAdd2"></el-button>
              <div v-else class="add-input">
                <el-input v-model="input" placeholder="请输入内容" />
                <div class="block" style="display: flex; padding-right: 10px">
                  <el-date-picker v-model="value1" type="date" placeholder="截止时间" size="mini"></el-date-picker>
                  <el-button icon="el-icon-user" type="text" style="color: #c0c4cc">负责人</el-button>
                </div>
                <div style="padding: 10px">
                  <el-button type="primary" size="mini">确定</el-button>
                  <el-button type="info" plain size="mini">取消</el-button>
                </div>
              </div>
            </draggable>
          </div>
          <div class="card">
            <h6>测试中</h6>
            <draggable v-model="testArray" group="task" @start="drag=true" @end="drag=false">
              <div v-for="(item, index) in testArray" :key="index" class="dragItem">
                <el-checkbox v-model="item.checked">{{item.title}}</el-checkbox>
                <el-tag type="info" size="mini" style="margin-top: 5px; margin-left: 25px" ><i class="el-icon-time"></i>{{ item.time }}</el-tag>
                <div class="avatar">
                  <el-avatar :src="item.avatar" size="small"></el-avatar>
                </div>
              </div>
              <el-button v-if="isAdd3" type="text" icon="el-icon-plus" @click="isAdd3 = !isAdd3"></el-button>
              <div v-else class="add-input">
                <el-input v-model="input" placeholder="请输入内容" />
                <div class="block" style="display: flex; padding-right: 10px">
                  <el-date-picker v-model="value1" type="date" placeholder="截止时间" size="mini"></el-date-picker>
                  <el-button icon="el-icon-user" type="text" style="color: #c0c4cc">负责人</el-button>
                </div>
                <div style="padding: 10px">
                  <el-button type="primary" size="mini">确定</el-button>
                  <el-button type="info" plain size="mini">取消</el-button>
                </div>
              </div>
            </draggable>
          </div>
          <div class="card">
            <h6>已完成</h6>
            <draggable v-model="finishedArray" group="task" @start="drag=true" @end="drag=false">
              <div v-for="(item, index) in finishedArray" :key="index" class="dragItem">
                <el-checkbox v-model="item.checked">{{item.title}}</el-checkbox>
                <el-tag type="info" size="mini" style="margin-top: 5px; margin-left: 25px" ><i class="el-icon-time"></i>{{ item.time }}</el-tag>
                <div class="avatar">
                  <el-avatar :src="item.avatar" size="small"></el-avatar>
                </div>
              </div>
              <el-button v-if="isAdd4" type="text" icon="el-icon-plus" @click="isAdd4 = !isAdd4"></el-button>
              <div v-else class="add-input">
                <el-input v-model="input" placeholder="请输入内容" />
                <div class="block" style="display: flex; padding-right: 10px">
                  <el-date-picker v-model="value1" type="date" placeholder="截止时间" size="mini"></el-date-picker>
                  <el-button icon="el-icon-user" type="text" style="color: #c0c4cc">负责人</el-button>
                </div>
                <div style="padding: 10px">
                  <el-button type="primary" size="mini">确定</el-button>
                  <el-button type="info" plain size="mini">取消</el-button>
                </div>
              </div>
            </draggable>
          </div>
          <div class="card">
            <h6>待开始</h6>
            <draggable v-model="newArray" group="task" @start="drag=true" @end="drag=false">
              <div v-for="(item, index) in newArray" :key="index" class="dragItem">
                <el-checkbox v-model="item.checked">{{item.title}}</el-checkbox>
                <el-tag type="info" size="mini" style="margin-top: 5px; margin-left: 25px" ><i class="el-icon-time"></i>{{ item.time }}</el-tag>
                <div class="avatar">
                  <el-avatar :src="item.avatar" size="small"></el-avatar>
                </div>
              </div>
              <el-button v-if="isAdd5" type="text" icon="el-icon-plus" @click="isAdd5 = !isAdd5"></el-button>
              <div v-else class="add-input">
                <el-input v-model="input" placeholder="请输入内容" />
                <div class="block" style="display: flex; padding-right: 10px">
                  <el-date-picker v-model="value1" type="date" placeholder="截止时间" size="mini"></el-date-picker>
                  <el-button icon="el-icon-user" type="text" style="color: #c0c4cc">负责人</el-button>
                </div>
                <div style="padding: 10px">
                  <el-button type="primary" size="mini">确定</el-button>
                  <el-button type="info" plain size="mini">取消</el-button>
                </div>
              </div>
            </draggable>
          </div>
          <div class="card">
            <h6>待开始</h6>
            <draggable v-model="newArray" group="task" @start="drag=true" @end="drag=false">
              <div v-for="(item, index) in newArray" :key="index" class="dragItem">
                <el-checkbox v-model="item.checked">{{item.title}}</el-checkbox>
                <el-tag type="info" size="mini" style="margin-top: 5px; margin-left: 25px" ><i class="el-icon-time"></i>{{ item.time }}</el-tag>
                <div class="avatar">
                  <el-avatar :src="item.avatar" size="small"></el-avatar>
                </div>
              </div>
              <el-button v-if="isAdd6" type="text" icon="el-icon-plus" @click="isAdd6 = !isAdd6"></el-button>
              <div v-else class="add-input">
                <el-input v-model="input" placeholder="请输入内容" />
                <div class="block" style="display: flex; padding-right: 10px">
                  <el-date-picker v-model="value1" type="date" placeholder="截止时间" size="mini"></el-date-picker>
                  <el-button icon="el-icon-user" type="text" style="color: #c0c4cc">负责人</el-button>
                </div>
                <div style="padding: 10px">
                  <el-button type="primary" size="mini">确定</el-button>
                  <el-button type="info" plain size="mini">取消</el-button>
                </div>
              </div>
            </draggable>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label"><i class="el-icon-c-scale-to-original"></i> 设计</span>
        <div class="card-container" style="margin-top:10px;">
          <div class="card">
            <h6>待开始</h6>
            <draggable v-model="todoArray" group="task" @start="drag=true" @end="drag=false" animation="500">
              <div v-for="(item, index) in todoArray" :key="index" class="dragItem">
                <el-checkbox v-model="item.checked" @change="(val) => handleCheckedChange(val, index)">{{item.title}}</el-checkbox>
                <el-tag type="danger" size="mini" style="margin-top: 5px; margin-left: 25px" >低</el-tag>
                <div class="avatar">
                  <el-avatar :src="item.avatar" size="small"></el-avatar>
                </div>
              </div>
              <el-button v-if="isAdd1" type="text" icon="el-icon-plus" @click="isAdd1 = !isAdd1"></el-button>
              <div v-else class="add-input">
                <el-input v-model="input" placeholder="请输入内容" />
                <div class="block" style="display: flex; padding-right: 10px">
                  <el-date-picker v-model="value1" type="date" placeholder="截止时间" size="mini" value-format="yyyy-MM-dd" format="yyyy/MM/dd"></el-date-picker>
                  <el-button icon="el-icon-user" type="text" style="color: #c0c4cc">负责人</el-button>
                </div>
                <div style="padding: 10px">
                  <el-button type="primary" size="mini" @click="comfirm">确定</el-button>
                  <el-button type="info" plain size="mini" @click="cancel">取消</el-button>
                </div>
              </div>
            </draggable>
          </div>
          <div class="card">
            <h6>实现中</h6>
            <draggable v-model="myArray" group="task" @start="drag=true" @end="drag=false" animation="500">
              <div v-for="(item, index) in myArray" :key="index" class="dragItem">
                <el-checkbox v-model="item.checked" @change="handleCheckedChange">{{item.title}}</el-checkbox>
                <el-tag type="info" size="mini" style="margin-top: 5px; margin-left: 25px" ><i class="el-icon-time"></i>{{ item.time }}</el-tag>
                <div class="avatar">
                  <el-avatar :src="item.avatar" size="small"></el-avatar>
                </div>
              </div>
              <el-button v-if="isAdd2" type="text" icon="el-icon-plus" @click="isAdd2 = !isAdd2"></el-button>
              <div v-else class="add-input">
                <el-input v-model="input" placeholder="请输入内容" />
                <div class="block" style="display: flex; padding-right: 10px">
                  <el-date-picker v-model="value1" type="date" placeholder="截止时间" size="mini"></el-date-picker>
                  <el-button icon="el-icon-user" type="text" style="color: #c0c4cc">负责人</el-button>
                </div>
                <div style="padding: 10px">
                  <el-button type="primary" size="mini">确定</el-button>
                  <el-button type="info" plain size="mini">取消</el-button>
                </div>
              </div>
            </draggable>
          </div>
          <div class="card">
            <h6>测试中</h6>
            <draggable v-model="testArray" group="task" @start="drag=true" @end="drag=false">
              <div v-for="(item, index) in testArray" :key="index" class="dragItem">
                <el-checkbox v-model="item.checked">{{item.title}}</el-checkbox>
                <el-tag type="info" size="mini" style="margin-top: 5px; margin-left: 25px" ><i class="el-icon-time"></i>{{ item.time }}</el-tag>
                <div class="avatar">
                  <el-avatar :src="item.avatar" size="small"></el-avatar>
                </div>
              </div>
              <el-button v-if="isAdd3" type="text" icon="el-icon-plus" @click="isAdd3 = !isAdd3"></el-button>
              <div v-else class="add-input">
                <el-input v-model="input" placeholder="请输入内容" />
                <div class="block" style="display: flex; padding-right: 10px">
                  <el-date-picker v-model="value1" type="date" placeholder="截止时间" size="mini"></el-date-picker>
                  <el-button icon="el-icon-user" type="text" style="color: #c0c4cc">负责人</el-button>
                </div>
                <div style="padding: 10px">
                  <el-button type="primary" size="mini">确定</el-button>
                  <el-button type="info" plain size="mini">取消</el-button>
                </div>
              </div>
            </draggable>
          </div>
          <div class="card">
            <h6>已完成</h6>
            <draggable v-model="finishedArray" group="task" @start="drag=true" @end="drag=false">
              <div v-for="(item, index) in finishedArray" :key="index" class="dragItem">
                <el-checkbox v-model="item.checked">{{item.title}}</el-checkbox>
                <el-tag type="info" size="mini" style="margin-top: 5px; margin-left: 25px" ><i class="el-icon-time"></i>{{ item.time }}</el-tag>
                <div class="avatar">
                  <el-avatar :src="item.avatar" size="small"></el-avatar>
                </div>
              </div>
              <el-button v-if="isAdd4" type="text" icon="el-icon-plus" @click="isAdd4 = !isAdd4"></el-button>
              <div v-else class="add-input">
                <el-input v-model="input" placeholder="请输入内容" />
                <div class="block" style="display: flex; padding-right: 10px">
                  <el-date-picker v-model="value1" type="date" placeholder="截止时间" size="mini"></el-date-picker>
                  <el-button icon="el-icon-user" type="text" style="color: #c0c4cc">负责人</el-button>
                </div>
                <div style="padding: 10px">
                  <el-button type="primary" size="mini">确定</el-button>
                  <el-button type="info" plain size="mini">取消</el-button>
                </div>
              </div>
            </draggable>
          </div>
          <div class="card">
            <h6>待开始</h6>
            <draggable v-model="newArray" group="task" @start="drag=true" @end="drag=false">
              <div v-for="(item, index) in newArray" :key="index" class="dragItem">
                <el-checkbox v-model="item.checked">{{item.title}}</el-checkbox>
                <el-tag type="info" size="mini" style="margin-top: 5px; margin-left: 25px" ><i class="el-icon-time"></i>{{ item.time }}</el-tag>
                <div class="avatar">
                  <el-avatar :src="item.avatar" size="small"></el-avatar>
                </div>
              </div>
              <el-button v-if="isAdd5" type="text" icon="el-icon-plus" @click="isAdd5 = !isAdd5"></el-button>
              <div v-else class="add-input">
                <el-input v-model="input" placeholder="请输入内容" />
                <div class="block" style="display: flex; padding-right: 10px">
                  <el-date-picker v-model="value1" type="date" placeholder="截止时间" size="mini"></el-date-picker>
                  <el-button icon="el-icon-user" type="text" style="color: #c0c4cc">负责人</el-button>
                </div>
                <div style="padding: 10px">
                  <el-button type="primary" size="mini">确定</el-button>
                  <el-button type="info" plain size="mini">取消</el-button>
                </div>
              </div>
            </draggable>
          </div>
          <div class="card">
            <h6>待开始</h6>
            <draggable v-model="newArray" group="task" @start="drag=true" @end="drag=false">
              <div v-for="(item, index) in newArray" :key="index" class="dragItem">
                <el-checkbox v-model="item.checked">{{item.title}}</el-checkbox>
                <el-tag type="info" size="mini" style="margin-top: 5px; margin-left: 25px" ><i class="el-icon-time"></i>{{ item.time }}</el-tag>
                <div class="avatar">
                  <el-avatar :src="item.avatar" size="small"></el-avatar>
                </div>
              </div>
              <el-button v-if="isAdd6" type="text" icon="el-icon-plus" @click="isAdd6 = !isAdd6"></el-button>
              <div v-else class="add-input">
                <el-input v-model="input" placeholder="请输入内容" />
                <div class="block" style="display: flex; padding-right: 10px">
                  <el-date-picker v-model="value1" type="date" placeholder="截止时间" size="mini"></el-date-picker>
                  <el-button icon="el-icon-user" type="text" style="color: #c0c4cc">负责人</el-button>
                </div>
                <div style="padding: 10px">
                  <el-button type="primary" size="mini">确定</el-button>
                  <el-button type="info" plain size="mini">取消</el-button>
                </div>
              </div>
            </draggable>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label"><i class="el-icon-monitor"></i> 开发</span>
        <div class="card-container" style="margin-top:10px;">
          <div class="card">
            <h6>待开始</h6>
            <draggable v-model="todoArray" group="task" @start="drag=true" @end="drag=false" animation="500">
              <div v-for="(item, index) in todoArray" :key="index" class="dragItem">
                <el-checkbox v-model="item.checked" @change="(val) => handleCheckedChange(val, index)">{{item.title}}</el-checkbox>
                <el-tag type="danger" size="mini" style="margin-top: 5px; margin-left: 25px" >低</el-tag>
                <div class="avatar">
                  <el-avatar :src="item.avatar" size="small"></el-avatar>
                </div>
              </div>
              <el-button v-if="isAdd1" type="text" icon="el-icon-plus" @click="isAdd1 = !isAdd1"></el-button>
              <div v-else class="add-input">
                <el-input v-model="input" placeholder="请输入内容" />
                <div class="block" style="display: flex; padding-right: 10px">
                  <el-date-picker v-model="value1" type="date" placeholder="截止时间" size="mini" value-format="yyyy-MM-dd" format="yyyy/MM/dd"></el-date-picker>
                  <el-button icon="el-icon-user" type="text" style="color: #c0c4cc">负责人</el-button>
                </div>
                <div style="padding: 10px">
                  <el-button type="primary" size="mini" @click="comfirm">确定</el-button>
                  <el-button type="info" plain size="mini" @click="cancel">取消</el-button>
                </div>
              </div>
            </draggable>
          </div>
          <div class="card">
            <h6>实现中</h6>
            <draggable v-model="myArray" group="task" @start="drag=true" @end="drag=false" animation="500">
              <div v-for="(item, index) in myArray" :key="index" class="dragItem">
                <el-checkbox v-model="item.checked" @change="handleCheckedChange">{{item.title}}</el-checkbox>
                <el-tag type="info" size="mini" style="margin-top: 5px; margin-left: 25px" ><i class="el-icon-time"></i>{{ item.time }}</el-tag>
                <div class="avatar">
                  <el-avatar :src="item.avatar" size="small"></el-avatar>
                </div>
              </div>
              <el-button v-if="isAdd2" type="text" icon="el-icon-plus" @click="isAdd2 = !isAdd2"></el-button>
              <div v-else class="add-input">
                <el-input v-model="input" placeholder="请输入内容" />
                <div class="block" style="display: flex; padding-right: 10px">
                  <el-date-picker v-model="value1" type="date" placeholder="截止时间" size="mini"></el-date-picker>
                  <el-button icon="el-icon-user" type="text" style="color: #c0c4cc">负责人</el-button>
                </div>
                <div style="padding: 10px">
                  <el-button type="primary" size="mini">确定</el-button>
                  <el-button type="info" plain size="mini">取消</el-button>
                </div>
              </div>
            </draggable>
          </div>
          <div class="card">
            <h6>测试中</h6>
            <draggable v-model="testArray" group="task" @start="drag=true" @end="drag=false">
              <div v-for="(item, index) in testArray" :key="index" class="dragItem">
                <el-checkbox v-model="item.checked">{{item.title}}</el-checkbox>
                <el-tag type="info" size="mini" style="margin-top: 5px; margin-left: 25px" ><i class="el-icon-time"></i>{{ item.time }}</el-tag>
                <div class="avatar">
                  <el-avatar :src="item.avatar" size="small"></el-avatar>
                </div>
              </div>
              <el-button v-if="isAdd3" type="text" icon="el-icon-plus" @click="isAdd3 = !isAdd3"></el-button>
              <div v-else class="add-input">
                <el-input v-model="input" placeholder="请输入内容" />
                <div class="block" style="display: flex; padding-right: 10px">
                  <el-date-picker v-model="value1" type="date" placeholder="截止时间" size="mini"></el-date-picker>
                  <el-button icon="el-icon-user" type="text" style="color: #c0c4cc">负责人</el-button>
                </div>
                <div style="padding: 10px">
                  <el-button type="primary" size="mini">确定</el-button>
                  <el-button type="info" plain size="mini">取消</el-button>
                </div>
              </div>
            </draggable>
          </div>
          <div class="card">
            <h6>已完成</h6>
            <draggable v-model="finishedArray" group="task" @start="drag=true" @end="drag=false">
              <div v-for="(item, index) in finishedArray" :key="index" class="dragItem">
                <el-checkbox v-model="item.checked">{{item.title}}</el-checkbox>
                <el-tag type="info" size="mini" style="margin-top: 5px; margin-left: 25px" ><i class="el-icon-time"></i>{{ item.time }}</el-tag>
                <div class="avatar">
                  <el-avatar :src="item.avatar" size="small"></el-avatar>
                </div>
              </div>
              <el-button v-if="isAdd4" type="text" icon="el-icon-plus" @click="isAdd4 = !isAdd4"></el-button>
              <div v-else class="add-input">
                <el-input v-model="input" placeholder="请输入内容" />
                <div class="block" style="display: flex; padding-right: 10px">
                  <el-date-picker v-model="value1" type="date" placeholder="截止时间" size="mini"></el-date-picker>
                  <el-button icon="el-icon-user" type="text" style="color: #c0c4cc">负责人</el-button>
                </div>
                <div style="padding: 10px">
                  <el-button type="primary" size="mini">确定</el-button>
                  <el-button type="info" plain size="mini">取消</el-button>
                </div>
              </div>
            </draggable>
          </div>
          <div class="card">
            <h6>待开始</h6>
            <draggable v-model="newArray" group="task" @start="drag=true" @end="drag=false">
              <div v-for="(item, index) in newArray" :key="index" class="dragItem">
                <el-checkbox v-model="item.checked">{{item.title}}</el-checkbox>
                <el-tag type="info" size="mini" style="margin-top: 5px; margin-left: 25px" ><i class="el-icon-time"></i>{{ item.time }}</el-tag>
                <div class="avatar">
                  <el-avatar :src="item.avatar" size="small"></el-avatar>
                </div>
              </div>
              <el-button v-if="isAdd5" type="text" icon="el-icon-plus" @click="isAdd5 = !isAdd5"></el-button>
              <div v-else class="add-input">
                <el-input v-model="input" placeholder="请输入内容" />
                <div class="block" style="display: flex; padding-right: 10px">
                  <el-date-picker v-model="value1" type="date" placeholder="截止时间" size="mini"></el-date-picker>
                  <el-button icon="el-icon-user" type="text" style="color: #c0c4cc">负责人</el-button>
                </div>
                <div style="padding: 10px">
                  <el-button type="primary" size="mini">确定</el-button>
                  <el-button type="info" plain size="mini">取消</el-button>
                </div>
              </div>
            </draggable>
          </div>
          <div class="card">
            <h6>待开始</h6>
            <draggable v-model="newArray" group="task" @start="drag=true" @end="drag=false">
              <div v-for="(item, index) in newArray" :key="index" class="dragItem">
                <el-checkbox v-model="item.checked">{{item.title}}</el-checkbox>
                <el-tag type="info" size="mini" style="margin-top: 5px; margin-left: 25px" ><i class="el-icon-time"></i>{{ item.time }}</el-tag>
                <div class="avatar">
                  <el-avatar :src="item.avatar" size="small"></el-avatar>
                </div>
              </div>
              <el-button v-if="isAdd6" type="text" icon="el-icon-plus" @click="isAdd6 = !isAdd6"></el-button>
              <div v-else class="add-input">
                <el-input v-model="input" placeholder="请输入内容" />
                <div class="block" style="display: flex; padding-right: 10px">
                  <el-date-picker v-model="value1" type="date" placeholder="截止时间" size="mini"></el-date-picker>
                  <el-button icon="el-icon-user" type="text" style="color: #c0c4cc">负责人</el-button>
                </div>
                <div style="padding: 10px">
                  <el-button type="primary" size="mini">确定</el-button>
                  <el-button type="info" plain size="mini">取消</el-button>
                </div>
              </div>
            </draggable>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label"><i class="el-icon-data-line"></i> 测试</span>
        <div class="card-container" style="margin-top:10px;">
          <div class="card">
            <h6>待开始</h6>
            <draggable v-model="todoArray" group="task" @start="drag=true" @end="drag=false" animation="500">
              <div v-for="(item, index) in todoArray" :key="index" class="dragItem">
                <el-checkbox v-model="item.checked" @change="(val) => handleCheckedChange(val, index)">{{item.title}}</el-checkbox>
                <el-tag type="danger" size="mini" style="margin-top: 5px; margin-left: 25px" >低</el-tag>
                <div class="avatar">
                  <el-avatar :src="item.avatar" size="small"></el-avatar>
                </div>
              </div>
              <el-button v-if="isAdd1" type="text" icon="el-icon-plus" @click="isAdd1 = !isAdd1"></el-button>
              <div v-else class="add-input">
                <el-input v-model="input" placeholder="请输入内容" />
                <div class="block" style="display: flex; padding-right: 10px">
                  <el-date-picker v-model="value1" type="date" placeholder="截止时间" size="mini" value-format="yyyy-MM-dd" format="yyyy/MM/dd"></el-date-picker>
                  <el-button icon="el-icon-user" type="text" style="color: #c0c4cc">负责人</el-button>
                </div>
                <div style="padding: 10px">
                  <el-button type="primary" size="mini" @click="comfirm">确定</el-button>
                  <el-button type="info" plain size="mini" @click="cancel">取消</el-button>
                </div>
              </div>
            </draggable>
          </div>
          <div class="card">
            <h6>实现中</h6>
            <draggable v-model="myArray" group="task" @start="drag=true" @end="drag=false" animation="500">
              <div v-for="(item, index) in myArray" :key="index" class="dragItem">
                <el-checkbox v-model="item.checked" @change="handleCheckedChange">{{item.title}}</el-checkbox>
                <el-tag type="info" size="mini" style="margin-top: 5px; margin-left: 25px" ><i class="el-icon-time"></i>{{ item.time }}</el-tag>
                <div class="avatar">
                  <el-avatar :src="item.avatar" size="small"></el-avatar>
                </div>
              </div>
              <el-button v-if="isAdd2" type="text" icon="el-icon-plus" @click="isAdd2 = !isAdd2"></el-button>
              <div v-else class="add-input">
                <el-input v-model="input" placeholder="请输入内容" />
                <div class="block" style="display: flex; padding-right: 10px">
                  <el-date-picker v-model="value1" type="date" placeholder="截止时间" size="mini"></el-date-picker>
                  <el-button icon="el-icon-user" type="text" style="color: #c0c4cc">负责人</el-button>
                </div>
                <div style="padding: 10px">
                  <el-button type="primary" size="mini">确定</el-button>
                  <el-button type="info" plain size="mini">取消</el-button>
                </div>
              </div>
            </draggable>
          </div>
          <div class="card">
            <h6>测试中</h6>
            <draggable v-model="testArray" group="task" @start="drag=true" @end="drag=false">
              <div v-for="(item, index) in testArray" :key="index" class="dragItem">
                <el-checkbox v-model="item.checked">{{item.title}}</el-checkbox>
                <el-tag type="info" size="mini" style="margin-top: 5px; margin-left: 25px" ><i class="el-icon-time"></i>{{ item.time }}</el-tag>
                <div class="avatar">
                  <el-avatar :src="item.avatar" size="small"></el-avatar>
                </div>
              </div>
              <el-button v-if="isAdd3" type="text" icon="el-icon-plus" @click="isAdd3 = !isAdd3"></el-button>
              <div v-else class="add-input">
                <el-input v-model="input" placeholder="请输入内容" />
                <div class="block" style="display: flex; padding-right: 10px">
                  <el-date-picker v-model="value1" type="date" placeholder="截止时间" size="mini"></el-date-picker>
                  <el-button icon="el-icon-user" type="text" style="color: #c0c4cc">负责人</el-button>
                </div>
                <div style="padding: 10px">
                  <el-button type="primary" size="mini">确定</el-button>
                  <el-button type="info" plain size="mini">取消</el-button>
                </div>
              </div>
            </draggable>
          </div>
          <div class="card">
            <h6>已完成</h6>
            <draggable v-model="finishedArray" group="task" @start="drag=true" @end="drag=false">
              <div v-for="(item, index) in finishedArray" :key="index" class="dragItem">
                <el-checkbox v-model="item.checked">{{item.title}}</el-checkbox>
                <el-tag type="info" size="mini" style="margin-top: 5px; margin-left: 25px" ><i class="el-icon-time"></i>{{ item.time }}</el-tag>
                <div class="avatar">
                  <el-avatar :src="item.avatar" size="small"></el-avatar>
                </div>
              </div>
              <el-button v-if="isAdd4" type="text" icon="el-icon-plus" @click="isAdd4 = !isAdd4"></el-button>
              <div v-else class="add-input">
                <el-input v-model="input" placeholder="请输入内容" />
                <div class="block" style="display: flex; padding-right: 10px">
                  <el-date-picker v-model="value1" type="date" placeholder="截止时间" size="mini"></el-date-picker>
                  <el-button icon="el-icon-user" type="text" style="color: #c0c4cc">负责人</el-button>
                </div>
                <div style="padding: 10px">
                  <el-button type="primary" size="mini">确定</el-button>
                  <el-button type="info" plain size="mini">取消</el-button>
                </div>
              </div>
            </draggable>
          </div>
          <div class="card">
            <h6>待开始</h6>
            <draggable v-model="newArray" group="task" @start="drag=true" @end="drag=false">
              <div v-for="(item, index) in newArray" :key="index" class="dragItem">
                <el-checkbox v-model="item.checked">{{item.title}}</el-checkbox>
                <el-tag type="info" size="mini" style="margin-top: 5px; margin-left: 25px" ><i class="el-icon-time"></i>{{ item.time }}</el-tag>
                <div class="avatar">
                  <el-avatar :src="item.avatar" size="small"></el-avatar>
                </div>
              </div>
              <el-button v-if="isAdd5" type="text" icon="el-icon-plus" @click="isAdd5 = !isAdd5"></el-button>
              <div v-else class="add-input">
                <el-input v-model="input" placeholder="请输入内容" />
                <div class="block" style="display: flex; padding-right: 10px">
                  <el-date-picker v-model="value1" type="date" placeholder="截止时间" size="mini"></el-date-picker>
                  <el-button icon="el-icon-user" type="text" style="color: #c0c4cc">负责人</el-button>
                </div>
                <div style="padding: 10px">
                  <el-button type="primary" size="mini">确定</el-button>
                  <el-button type="info" plain size="mini">取消</el-button>
                </div>
              </div>
            </draggable>
          </div>
          <div class="card">
            <h6>待开始</h6>
            <draggable v-model="newArray" group="task" @start="drag=true" @end="drag=false">
              <div v-for="(item, index) in newArray" :key="index" class="dragItem">
                <el-checkbox v-model="item.checked">{{item.title}}</el-checkbox>
                <el-tag type="info" size="mini" style="margin-top: 5px; margin-left: 25px" ><i class="el-icon-time"></i>{{ item.time }}</el-tag>
                <div class="avatar">
                  <el-avatar :src="item.avatar" size="small"></el-avatar>
                </div>
              </div>
              <el-button v-if="isAdd6" type="text" icon="el-icon-plus" @click="isAdd6 = !isAdd6"></el-button>
              <div v-else class="add-input">
                <el-input v-model="input" placeholder="请输入内容" />
                <div class="block" style="display: flex; padding-right: 10px">
                  <el-date-picker v-model="value1" type="date" placeholder="截止时间" size="mini"></el-date-picker>
                  <el-button icon="el-icon-user" type="text" style="color: #c0c4cc">负责人</el-button>
                </div>
                <div style="padding: 10px">
                  <el-button type="primary" size="mini">确定</el-button>
                  <el-button type="info" plain size="mini">取消</el-button>
                </div>
              </div>
            </draggable>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label"><i class="el-icon-money"></i> 发布</span>
        <div class="card-container" style="margin-top:10px;">
          <div class="card">
            <h6>待开始</h6>
            <draggable v-model="todoArray" group="task" @start="drag=true" @end="drag=false" animation="500">
              <div v-for="(item, index) in todoArray" :key="index" class="dragItem">
                <el-checkbox v-model="item.checked" @change="(val) => handleCheckedChange(val, index)">{{item.title}}</el-checkbox>
                <el-tag type="danger" size="mini" style="margin-top: 5px; margin-left: 25px" >低</el-tag>
                <div class="avatar">
                  <el-avatar :src="item.avatar" size="small"></el-avatar>
                </div>
              </div>
              <el-button v-if="isAdd1" type="text" icon="el-icon-plus" @click="isAdd1 = !isAdd1"></el-button>
              <div v-else class="add-input">
                <el-input v-model="input" placeholder="请输入内容" />
                <div class="block" style="display: flex; padding-right: 10px">
                  <el-date-picker v-model="value1" type="date" placeholder="截止时间" size="mini" value-format="yyyy-MM-dd" format="yyyy/MM/dd"></el-date-picker>
                  <el-button icon="el-icon-user" type="text" style="color: #c0c4cc">负责人</el-button>
                </div>
                <div style="padding: 10px">
                  <el-button type="primary" size="mini" @click="comfirm">确定</el-button>
                  <el-button type="info" plain size="mini" @click="cancel">取消</el-button>
                </div>
              </div>
            </draggable>
          </div>
          <div class="card">
            <h6>实现中</h6>
            <draggable v-model="myArray" group="task" @start="drag=true" @end="drag=false" animation="500">
              <div v-for="(item, index) in myArray" :key="index" class="dragItem">
                <el-checkbox v-model="item.checked" @change="handleCheckedChange">{{item.title}}</el-checkbox>
                <el-tag type="info" size="mini" style="margin-top: 5px; margin-left: 25px" ><i class="el-icon-time"></i>{{ item.time }}</el-tag>
                <div class="avatar">
                  <el-avatar :src="item.avatar" size="small"></el-avatar>
                </div>
              </div>
              <el-button v-if="isAdd2" type="text" icon="el-icon-plus" @click="isAdd2 = !isAdd2"></el-button>
              <div v-else class="add-input">
                <el-input v-model="input" placeholder="请输入内容" />
                <div class="block" style="display: flex; padding-right: 10px">
                  <el-date-picker v-model="value1" type="date" placeholder="截止时间" size="mini"></el-date-picker>
                  <el-button icon="el-icon-user" type="text" style="color: #c0c4cc">负责人</el-button>
                </div>
                <div style="padding: 10px">
                  <el-button type="primary" size="mini">确定</el-button>
                  <el-button type="info" plain size="mini">取消</el-button>
                </div>
              </div>
            </draggable>
          </div>
          <div class="card">
            <h6>测试中</h6>
            <draggable v-model="testArray" group="task" @start="drag=true" @end="drag=false">
              <div v-for="(item, index) in testArray" :key="index" class="dragItem">
                <el-checkbox v-model="item.checked">{{item.title}}</el-checkbox>
                <el-tag type="info" size="mini" style="margin-top: 5px; margin-left: 25px" ><i class="el-icon-time"></i>{{ item.time }}</el-tag>
                <div class="avatar">
                  <el-avatar :src="item.avatar" size="small"></el-avatar>
                </div>
              </div>
              <el-button v-if="isAdd3" type="text" icon="el-icon-plus" @click="isAdd3 = !isAdd3"></el-button>
              <div v-else class="add-input">
                <el-input v-model="input" placeholder="请输入内容" />
                <div class="block" style="display: flex; padding-right: 10px">
                  <el-date-picker v-model="value1" type="date" placeholder="截止时间" size="mini"></el-date-picker>
                  <el-button icon="el-icon-user" type="text" style="color: #c0c4cc">负责人</el-button>
                </div>
                <div style="padding: 10px">
                  <el-button type="primary" size="mini">确定</el-button>
                  <el-button type="info" plain size="mini">取消</el-button>
                </div>
              </div>
            </draggable>
          </div>
          <div class="card">
            <h6>已完成</h6>
            <draggable v-model="finishedArray" group="task" @start="drag=true" @end="drag=false">
              <div v-for="(item, index) in finishedArray" :key="index" class="dragItem">
                <el-checkbox v-model="item.checked">{{item.title}}</el-checkbox>
                <el-tag type="info" size="mini" style="margin-top: 5px; margin-left: 25px" ><i class="el-icon-time"></i>{{ item.time }}</el-tag>
                <div class="avatar">
                  <el-avatar :src="item.avatar" size="small"></el-avatar>
                </div>
              </div>
              <el-button v-if="isAdd4" type="text" icon="el-icon-plus" @click="isAdd4 = !isAdd4"></el-button>
              <div v-else class="add-input">
                <el-input v-model="input" placeholder="请输入内容" />
                <div class="block" style="display: flex; padding-right: 10px">
                  <el-date-picker v-model="value1" type="date" placeholder="截止时间" size="mini"></el-date-picker>
                  <el-button icon="el-icon-user" type="text" style="color: #c0c4cc">负责人</el-button>
                </div>
                <div style="padding: 10px">
                  <el-button type="primary" size="mini">确定</el-button>
                  <el-button type="info" plain size="mini">取消</el-button>
                </div>
              </div>
            </draggable>
          </div>
          <div class="card">
            <h6>待开始</h6>
            <draggable v-model="newArray" group="task" @start="drag=true" @end="drag=false">
              <div v-for="(item, index) in newArray" :key="index" class="dragItem">
                <el-checkbox v-model="item.checked">{{item.title}}</el-checkbox>
                <el-tag type="info" size="mini" style="margin-top: 5px; margin-left: 25px" ><i class="el-icon-time"></i>{{ item.time }}</el-tag>
                <div class="avatar">
                  <el-avatar :src="item.avatar" size="small"></el-avatar>
                </div>
              </div>
              <el-button v-if="isAdd5" type="text" icon="el-icon-plus" @click="isAdd5 = !isAdd5"></el-button>
              <div v-else class="add-input">
                <el-input v-model="input" placeholder="请输入内容" />
                <div class="block" style="display: flex; padding-right: 10px">
                  <el-date-picker v-model="value1" type="date" placeholder="截止时间" size="mini"></el-date-picker>
                  <el-button icon="el-icon-user" type="text" style="color: #c0c4cc">负责人</el-button>
                </div>
                <div style="padding: 10px">
                  <el-button type="primary" size="mini">确定</el-button>
                  <el-button type="info" plain size="mini">取消</el-button>
                </div>
              </div>
            </draggable>
          </div>
          <div class="card">
            <h6>待开始</h6>
            <draggable v-model="newArray" group="task" @start="drag=true" @end="drag=false">
              <div v-for="(item, index) in newArray" :key="index" class="dragItem">
                <el-checkbox v-model="item.checked">{{item.title}}</el-checkbox>
                <el-tag type="info" size="mini" style="margin-top: 5px; margin-left: 25px" ><i class="el-icon-time"></i>{{ item.time }}</el-tag>
                <div class="avatar">
                  <el-avatar :src="item.avatar" size="small"></el-avatar>
                </div>
              </div>
              <el-button v-if="isAdd6" type="text" icon="el-icon-plus" @click="isAdd6 = !isAdd6"></el-button>
              <div v-else class="add-input">
                <el-input v-model="input" placeholder="请输入内容" />
                <div class="block" style="display: flex; padding-right: 10px">
                  <el-date-picker v-model="value1" type="date" placeholder="截止时间" size="mini"></el-date-picker>
                  <el-button icon="el-icon-user" type="text" style="color: #c0c4cc">负责人</el-button>
                </div>
                <div style="padding: 10px">
                  <el-button type="primary" size="mini">确定</el-button>
                  <el-button type="info" plain size="mini">取消</el-button>
                </div>
              </div>
            </draggable>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <!-- 編輯彈框 -->
    <el-dialog title="編輯工作項" :visible.sync="dialogFormVisible">
      <div slot="title" class="dialog-title">
        <div>报告整理</div>
        <div class="title-button">
          <el-button icon="el-icon-star-off" type="text">关注</el-button>
          <el-button icon="el-icon-collection-tag" type="text">标签</el-button>
          <el-button icon="el-icon-s-operation" type="text">检查项</el-button>
          <el-button icon="el-icon-link" type="text">关联</el-button>
          <el-button icon="el-icon-more" type="text">更多</el-button>
        </div>
      </div>
      <div>
        <div class="item-title"><el-checkbox v-model="checked">{{ form.title || "产品调研" }}</el-checkbox></div>
        <el-divider></el-divider>
        <div class="item-role">
          <div><i class="el-icon-user"></i><span style="padding-left: 10px">负责人</span></div>
          <div>
            <el-date-picker size="mini"
              v-model="timeValue1"
              type="datetimerange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['12:00:00']">
            </el-date-picker>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  components: { draggable },
  data () {
    return {
      todoArray: [
        { id: 1, title: '看板支持消息通知', checked: 0, avatar: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg' },
        { id: 2, title: '工作项拖动功能工作项拖动功能工作项拖动功能', checked: 0, level: 'high', avatar: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg' },
        { id: 3, title: '创建评论、展示评论', checked: 0, avatar: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg' },
        { id: 4, title: '上传背景图片', checked: 0, avatar: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg' }
      ],
      testArray: [
        { id: 1, title: '看板支持消息通知', checked: 0, time: '2017/5/25', avatar: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg' },
        { id: 2, title: '工作项拖动功能', checked: 0, time: '2017/5/25', level: 'high', avatar: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg' },
        { id: 3, title: '创建评论、展示评论', checked: 0, time: '2017/5/25', avatar: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg' },
        { id: 4, title: '上传背景图片', checked: 0, time: '2017/5/25', avatar: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg' },
        { id: 5, title: '默认开发资源', checked: 0, time: '2017/5/25', avatar: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg' },
        { id: 6, title: '产品调研 & 用户需求分析报告编写', checked: 0, time: '2017/5/25', avatar: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg' }
      ],
      finishedArray: [
        { id: 1, title: '看板支持消息通知', checked: 0, time: '2017/5/25', avatar: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg' },
        { id: 2, title: '工作项拖动功能', level: 'high', checked: 0, time: '2017/5/25', avatar: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg' },
        { id: 3, title: '创建评论、展示评论', checked: 0, time: '2017/5/25', avatar: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg' },
        { id: 4, title: '上传背景图片', checked: 0, time: '2017/5/25', avatar: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg' },
        { id: 5, title: '默认开发资源', checked: 0, time: '2017/5/25', avatar: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg' },
        { id: 6, title: '产品调研 & 用户需求分析报告编写', checked: 0, time: '2017/5/25', avatar: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg' }
      ],
      myArray: [
        { id: 1, title: '看板支持消息通知', checked: 0, time: '2017/5/25', avatar: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg' },
        { id: 2, title: '工作项拖动功能', checked: 0, time: '2017/5/25', avatar: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg' },
        { id: 3, title: '创建评论、展示评论', checked: 0, time: '2017/5/25', avatar: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg' },
        { id: 4, title: '上传背景图片', checked: 0, time: '2017/5/25', avatar: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg' }
      ],
      newArray: [
        { id: 1, title: '看板支持消息通知', checked: 0, time: '2017/5/25', avatar: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg' },
        { id: 2, title: '工作项拖动功能', checked: 0, time: '2017/5/25', level: 'high', avatar: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg' },
        { id: 3, title: '创建评论、展示评论', checked: 0, time: '2017/5/25', avatar: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg' },
        { id: 4, title: '上传背景图片', checked: 0, time: '2017/5/25', avatar: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg' },
        { id: 5, title: '默认开发资源', checked: 0, time: '2017/5/25', avatar: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg' }
      ],
      index: 0,
      value1: '',
      timeValue1: '',
      eventLog: [],
      form: [],
      input: '',
      isAdd1: true,
      isAdd2: true,
      isAdd3: true,
      isAdd4: true,
      isAdd5: true,
      isAdd6: true,
      checked: false,
      dialogFormVisible: false
    }
  },
  methods: {
    editItem (item) {
      console.log(item)
      this.dialogFormVisible = true
    },
    handleCheckedChange (val, index) {
      console.log(index, val, 123)
    },
    comfirm () {
      this.isAdd1 = true
      this.todoArray.push({
        title: this.input,
        avatar: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
        time: this.value1
      })
      this.input = ''
      this.value1 = ''
    },
    cancel () {
      this.isAdd1 = true
      this.input = ''
      this.value1 = ''
    }
  }
}
</script>

<style lang="less" scoped>
.card-title {
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  align-items: center;
  background-color: #f8f8f8;
}
.title-button {
  padding-right: 30px;
}
.bord-container {
  height: 100%;
}
.card-container {
  display: flex;
  justify-content: flex-start;
}
.card {
  width: 250px;
  margin: 0 15px;
  border: 1px solid #e3e7e7;
  border-radius: 2px;
  .item-title {
    padding-left: 10px;
    line-height: 19px;
    font-size: 14px;
    color: #606266
  }
  .add-input {
    button {
      width: 80px;
    }
    ::v-deep .el-input__inner {
      margin: 10px;
      width: 230px
    }
    ::v-deep .el-input--mini .el-input__inner {
      border: none !important;
      width: 150px;
    }
  }
  h6 {
    font-size: 14px;
    font-weight: 600;
    height: 40px;
    line-height: 40px;
    background-color: #f8f8f8;
    border-bottom: 1px solid #e3e7e7;
  }
  .dragItem {
    padding: 5px 5px 5px 15px;
    border-bottom: 1px solid #e3e7e7;
    cursor: pointer;
    .avatar {
      padding: 0 5px 10px 5px;
      display: flex;
      justify-content: flex-end;
    }
    ::v-deep .el-checkbox__label {
      white-space: pre-wrap;
      width: 210px;
    }
  }
  button {
    width: 50px;
  }
}
::v-deep .el-tabs--card>.el-tabs__header .el-tabs__item {
  width: 300px;
  height: 100px;
}
::v-deep .el-tabs--card>.el-tabs__header .el-tabs__item {
  padding-top: 25px;
}
.dialog-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

</style>
