<template>
  <div class="hello">
    <h1>快速注册</h1>
    <el-form :model="form" class="form" style="width: 80%; margin-left:10%">
        <el-form-item label="" prop="account">
          <el-input v-model="form.account" placeholder="请输入12位账号" ></el-input>
        </el-form-item>
        <el-form-item label="" prop="nickname">
          <el-input v-model="form.nickname" placeholder="请输入您的微信昵称" ></el-input>
        </el-form-item>
        <el-form-item label="" prop="inviter">
          <el-input v-model="form.inviter" placeholder="请输入邀请人YAS账号" ></el-input>
        </el-form-item>
        <el-form-item label="" prop="public_key">
            <el-input v-model="form.public_key" type="textarea" :rows="3" placeholder="请点击下方按钮生成公钥并填入此处" resize:none></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="submit" type="primary">提交注册</el-button>
          <el-button @click="createKey" type="primary">生成公/私钥</el-button>
        </el-form-item>
    </el-form>
     <el-divider></el-divider>  
    <h4>审核结果通告</h4>
    <el-form :inline="true" :model="search">
      <el-form-item>
        <el-input v-model="search.keyword" placeholder="账号" clearable style="width:80%"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="submit" icon="el-icon-search" style="margin-left:-10px">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" style="width: 100%;  margin-left:10%">
        <el-table-column prop="account" label="账号"></el-table-column>
        <el-table-column prop="date" label="申请时间"></el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      @current-change="handleCurrentChange"
      :current-page.sync="search.page"
      :page-size="10"
      :total="page.total"
    >
    </el-pagination>
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.show"
      width="80%"
      style="float:left; margin-left:-8%" 
    >
      <el-form ref="form" >
			<el-form-item label="" prop="code">
                <h3 style="margin-top: -20px">公钥:</h3>
				<div style="float:left; width:90%; margin-left:5%">{{this.key.public_key}}</div>
                <el-button type="primary" @click="copyPublic">复制公钥到剪切板</el-button>
			</el-form-item>
			<el-form-item label="" prop="name">
                <h3>私钥:</h3>
				<div style="float:left; width:90%; margin-left:5%">{{this.key.private_key}}</div>
               <el-button type="primary" @click="copyPrivate">复制私钥到剪切板</el-button>
			</el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
        msg: 'El Psy Congroo',
        input: '',
        key:{
            public_key:"1OTySPDmGjNRccqF54JDgcXFSGk5pwCJyvLQX5HZ2u1g6Kawdwcu",
            private_key:"OYVlaezHUpiqDMMsgtYra2yjRbA9grvrIGhUsL1VbvQemwILiIc1"
        },
        form:{},
        dialog: {
            show: false,
            title: ""
        },
      search: {
        page: 1,
        limit: 10,
      },
      page: { total: 0, sizes: [10, 20, 30, 50] },  
         tableData: [{
            date: '2016-05-02',
            account: 'testaccount1',
            status: '通过'
          }, {
            date: '2016-05-04',
            account: 'testaccount2',
            status: '驳回'
          }, {
            date: '2016-05-01',
            account: 'testaccount3',
            status: '通过'
          }, {
            date: '2016-05-03',
            account: 'testaccount4',
            status: '通过'
          },
          {
            date: '2016-05-02',
            account: 'testaccount1',
            status: '通过'
          }, {
            date: '2016-05-04',
            account: 'testaccount2',
            status: '驳回'
          }         
          ]
    }
  },
  created() {

  },
  methods: {
    fetchData(){

    },
    submit() {
        console.log("提交: ", this.form)
    },
    createKey(){
        this.dialog.show = true
    },

    copyPublic(){

    },
    copyPrivate(){
    },
    handleCurrentChange(val) {
      this.fetchData()
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

.input {
  float:left;
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 20px;
  /* margin: 10px 20px 10px 20px; */
  /* margin:5px 10px; */
}
</style>
