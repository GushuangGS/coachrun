<template>
  <!-- editcontact -->
  <div class="edit-contact">
    <el-container>
      <el-header height="33px">
        <item-header :status="status" :headerInfo="headerInfo"></item-header>
      </el-header>
      <el-main>
        <div class="content">
          <div class="form-wrapper">
            <b-form @submit="onSubmit" @reset="onReset" v-if="show">
              <div class="row">
                <div class="col-6">
                  <b-form-group
                    id="input-group-00"
                    label="First Name:"
                    label-for="input-00"
                  >
                    <b-form-input
                      id="input-00"
                      v-model="form.firstName"
                      :state="showTip==true?validationName:''"
                    ></b-form-input>
                  </b-form-group>
                </div>
                <div class="col-6">
                  <b-form-group
                    id="input-group-01"
                    label="Last Name:"
                    label-for="input-01"  
                  >
                    <b-form-input
                      id="input-01"
                      v-model="form.lastName"
                      :state="showTip==true?validationLastName:''"
                    ></b-form-input>
                  </b-form-group>
                </div>
              </div>

              <b-form-group
                id="input-group-3"
                label="Contact Email:"
                label-for="input-3"
              >
                <b-form-input
                  id="input-3"
                  v-model="form.email"
                  :state="showTip==true?validationEmail:''"
                ></b-form-input>
              </b-form-group>

              <b-form-group id="input-group-4" label="Contact Phone:" label-for="input-4">
                <!-- <b-form-input
                  id="input-4"
                  type="tel"
                  v-model="form.phone"
                ></b-form-input> -->
                <VuePhoneNumberInput v-model="form.phone" 
                  default-country-code="US" 
                  @update="onUpdate"
                  />
              </b-form-group>

              <b-form-group id="input-group-5" label="Alternate Phone:" label-for="input-5">
                  <!-- <b-form-input
                    id="input-5"
                    type="tel"
                    v-model="form.phone2"
                  ></b-form-input> -->
                  <VuePhoneNumberInput v-model="form.phone2" 
                    default-country-code="US" 
                    @update="onUpdateAgain"
                    />
                </b-form-group>
                <el-switch
                  class="isDefault"
                  v-model="showDefault"
                  inactive-text="Default information："
                  @change="selectDefault">
              </el-switch>
              <b-button type="reset" variant="light">Cancel</b-button>
              <b-button type="submit" variant="warning">Save</b-button>
            </b-form>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import ItemHeader from '@/components/ItemHeader'
  import VuePhoneNumberInput from 'vue-phone-number-input'
  export default {
    data() {
      return {
        status: 1,
        headerInfo: [
          ['Edit Contact Information'],
          { description: '', path: '',title:'My Account' }
        ],
        form: {
          firstName:'',
          lastName:'',
          email:'',
          phone:'',
          phone2:''
        },
        show: true,
        results: {},
        resultsAgain:{},
        showDefault:true,
        showTip:false,//默认不显示
      }
    },
    computed:{
      validationName(){
        return this.form.firstName!='';
      },
      validationLastName(){
        return this.form.lastName!='';
      },
      validationEmail(){
        return this.form.email!='';
      }
    },
    created(){
      this.form = this.$store.state.contactInfo==""?this.$store.state.contactInfo:JSON.parse(localStorage.getItem("contactInfo"));
      this.form.phone = this.intStr(this.form.phone);
      if(this.form.phone2){
        this.form.phone2 = this.intStr(this.form.phone2);
      }
      this.showDefault = this.form.isDefault;
      console.log(this.form);
    },
    methods: {
      onUpdate(payload) {
          this.results = payload;
      },
      onUpdateAgain(payload){
        this.resultsAgain = payload;
        console.log(this.resultsAgain.formatInternational);
        if(this.resultsAgain.formatInternational== undefined){
          this.resultsAgain.formatInternational = '';
        }
        
      },
      onSubmit(evt) {
        evt.preventDefault();
        if(this.form.firstName=='' || this.form.lastName=='' || this.form.email=='' || this.form.phone==''){
          this.showTip = true;
        }else{
          console.log(JSON.stringify(this.form));
          this.$http.patch(`${this.$api.contactUpdate}/${this.form.aid}`,
            {firstName:this.form.firstName,lastName:this.form.lastName,email:this.form.email,phone:this.results.formatInternational,phone2:this.resultsAgain.formatInternational,isDefault:this.showDefault},
            {headers:{'Authorization':`Bearer ${sessionStorage.getItem('IvyCustomer_LoginToken')}`}})
            .then((res)=>{
                console.log(res);
                this.$message({
                  message: 'Editorial Success',
                  type: 'success',
                  showClose: true,
                  center: true
                });
                //添加成功后，默认都设置为空
                this.$router.push({name:'ContactList'});
                this.form = {
                  firstName:'',
                  lastName:'',
                  email:'',
                  phone:'',
                  phone2:''
                }
            })
        }
        // if(this.form.firstName!='' && this.form.lastName!=''&&this.form.email!=''&&this.form.phone!=''&&this.form.phone2!=''){
        //     console.log(JSON.stringify(this.form));
        //     this.$http.patch(`${this.$api.contactUpdate}/${this.form.aid}`,
        //       {firstName:this.form.firstName,lastName:this.form.lastName,phone:this.results.formatInternational,email:this.form.email,phone2:this.resultsAgain.formatInternational,isDefault:this.showDefault},
        //       {headers:{'Authorization':`Bearer ${sessionStorage.getItem('IvyCustomer_LoginToken')}`}})
        //       .then((res)=>{
        //           console.log(res);
        //           this.$message({
        //             message: 'Editorial Success',
        //             type: 'success',
        //             showClose: true,
        //             center: true
        //           });
        //           //添加成功后，默认都设置为空
        //           this.$router.push({name:'ContactList'});
        //           this.form = {
        //             firstName:'',
        //             lastName:'',
        //             email:'',
        //             phone:'',
        //             phone2:''
        //           }
        //       })
        // }else{
        //   this.$message({
        //     message: 'Incomplete information',
        //     type: 'warning',
        //     showClose: true,
        //     center: true
        //   });
        // }
      },
      intStr(val){
        return val.slice(val.indexOf(' ') + 1);
      },
      selectDefault(val){
        this.showDefault = val;
        console.log(val);
      },
      onReset(evt) {
        this.$router.go(-1);
        // evt.preventDefault();
        // // Reset our form values
        // this.form.firstName = ''
        // this.form.lastName = ''
        // this.form.email = ''
        // this.form.phone =''
        // this.form.phone2 =''
        // // Trick to reset/clear native browser form validation state
        // this.show = false
        // this.$nextTick(() => {
        //   this.show = true
        // })
      }
    },
    components: {
      ItemHeader,
      VuePhoneNumberInput
    },
    name: 'EditContact'
  }
</script>

<style scoped>
  @import '~bootstrap/dist/css/bootstrap.css';
  @import '~bootstrap-vue/dist/bootstrap-vue.css';
  .edit-contact {
    flex: 1;
  }
  >>> .el-main {
    padding-top: 0;
  }
  .content {
    background-color: #FCFCFC;
    padding-top: 30px;
    padding-left: 60px;
    padding-bottom: 30px;
  }
  .form-wrapper {
    width: 500px;
    font-size: 16px;
  }
  >>> .form-control:focus {
    border-color: #FF9A0D;
    box-shadow: none;
  }
  >>> .custom-select:focus {
    border-color: #FF9A0D;
    box-shadow: none;
  }
  .custom-label {
    margin-bottom: 0.5rem;
  }
  .fa-exclamation-circle {
    color: #002E63;
  }
  >>> .btn {
    width: 72px;
    height: 30px;
    line-height: 1;
    font-size: 16px;
    padding-top: 7px;
    padding-bottom: 7px;
    text-align: center;
    border-radius: 4px;
  }
  >>> .btn-light {
    background-color: #fff;
    color: #727272;
    border: 1px solid #727272;
    margin-right: 20px;
  }
  >>> .btn-warning {
    background-color: #FF9A0D;
    color: #fff;
  }
  .isDefault{
    display: block;
    margin-bottom: 10px;
  }
  >>> .el-switch__label *{
    font-size: 16px;
  }
</style>
