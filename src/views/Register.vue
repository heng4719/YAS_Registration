<template>
  <div class="hello">
    <h1>快速注册</h1>
    <el-form :model="form" class="form" style="width: 80%; margin-left:10%">
        <el-form-item label="" prop="account">
          <el-input v-model="form.account" placeholder="请输入12位账号，仅包含1~5、a~z" maxlength="12" ></el-input>
        </el-form-item>
        <el-form-item label="" prop="nick_name">
          <el-input v-model="form.nick_name" placeholder="请输入您的微信昵称" ></el-input>
        </el-form-item>
        <el-form-item label="" prop="inviter">
          <el-input v-model="form.inviter_account" placeholder="请输入邀请人YAS账号" ></el-input>
        </el-form-item>
        <el-form-item label="" prop="public_key">
            <el-input v-model="form.public_key" type="textarea" :rows="3" placeholder="请点击下方按钮生成公钥并填入此处" resize:none></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="submit" type="primary">提交注册</el-button>
          <el-button @click="createKey" :loading="loading" type="primary">生成公/私钥</el-button>
        </el-form-item>
    </el-form>
     <!-- <el-divider></el-divider>  
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
    </el-table> -->
    <!-- <el-pagination
      background
      layout="prev, pager, next"
      @current-change="handleCurrentChange"
      :current-page.sync="search.page"
      :page-size="10"
      :total="page.total"
    > 
    </el-pagination>-->
    <el-dialog :title="dialog.title" :visible.sync="dialog.show" width="80%" style="float:left; margin-left:-8%">
      <el-form ref="form" >
        <el-form-item label="" prop="name">
           <h3>私钥:</h3>
			     <div id="private_key" style="float:left; width:90%; margin-left:5%"> {{privateKey}}</div>
           <el-button type="primary" @click="copyKey('private_key')">复制私钥到剪切板</el-button>
			  </el-form-item>
        <div></div>
		  	<el-form-item label="" prop="code">
           <h3 style="margin-top: -20px">公钥:</h3>
				   <div id="public_key" style="float:left; width:90%; margin-left:5%">{{'YAS'+rawpublicKey}}</div>
           <el-button type="primary"  @click="copyKey('public_key')">复制公钥到剪切板</el-button>
		  	</el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import ecc from 'eosjs-ecc';
import {
  register
} from "@/api/api"
export default {
  name: 'HelloWorld',
  data () {
    return {
        msg: 'El Psy Congroo',
        input: '',
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
       }],
       privateKey: '',
       rawpublicKey: '',
       loading:false,
    }
  },
  created() {

  },
  methods: {
    fetchData(){

    },
    submit() {
        if(this.form.account.length != 12){
          this.$message.error("申请的账号不合规范: 12位账号，仅包含1~5、a~z")
          return
        }
        console.log("1111111")
        for (var i in this.form.account) {
          console.log("i: " + i)
          var asc = this.form.account.charCodeAt(i);
          if ((asc >= 49 && asc <= 53 || asc >= 97 && asc <= 122)) {
              continue;
          }else{
            this.$message.error("申请的账号不合规范: 12位账号，仅包含1~5、a~z")
            return
          }
        }
        console.log("222222")
        
        register(this.form).then(res => {
            if (res.code == 0) {
              this.$message.success(res.data)
            }else{
              this.$message.error(res.msg)
            }
          })
    },
    createKey(){
        this.loading = true
        ecc.randomKey().then(privateKey => {
          this.privateKey = privateKey;
          const publicKey = ecc.privateToPublic(privateKey);
          this.rawpublicKey = publicKey.slice(3)
          this.dialog.show = true
          this.loading = false
        })
    },
    copyKey(key){
       var div = document.getElementById(key);
        if (document.body.createTextRange) {
            var range = document.body.createTextRange();
            range.moveToElementText(div);
            range.select();
        } else if (window.getSelection) {
            var selection = window.getSelection();
            var range = document.createRange();
            range.selectNodeContents(div);
            selection.removeAllRanges();
            selection.addRange(range);
        } else {
            console.warn("none");
        }
        document.execCommand("Copy"); // 执行浏览器复制命令
 
        alert("已复制到剪切板");
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
