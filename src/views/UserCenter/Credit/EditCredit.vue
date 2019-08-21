<template>
  <div class="add-credit">
    <el-container>
      <el-header height="33px">
        <item-header :status="status" :headerInfo="headerInfo"></item-header>
      </el-header>
      <el-main>
        <div class="content">
          <div class="introduction">
            <div class="text">
              * A debit card with VISA, MasterCard or American Express logo can be accepted as a credit card.
            </div>
            <div class="img-wrapper">
              <img src="./img/AmEx.png">
              <img src="./img/mastercard.png">
              <img src="./img/visa.png">
            </div>
          </div>
          <div class="form-wrapper">
            <div class="info">
              <img src="./img/safety.png">
              <span>Your payment details are secure</span>
            </div>
            <b-form @reset="onReset">
              <div class="up">
                <div class="row">
                  <div class="col-6">
                    <b-form-group
                      id="input-group-00"
                      label-for="input-00"
                    >
                      <div name="label" class="custom-label">
                        <span class="necessary">* </span>
                        Card Holder Name:
                        &nbsp;
                        <el-tooltip placement="bottom" effect="light">
                          <div slot="content">Card Holder Name is <br> 
                            typically the name of the <br> person on the front of the 
                            <br> credit card.
                            </div>
                          <span class="fa fa-exclamation-circle"></span>
                        </el-tooltip>
                      </div>
                      <b-form-input
                        id="input-00"
                        v-model="form.holderName"
                      ></b-form-input>
                    </b-form-group>
                  </div>
                  <div class="col-6">
                    <b-form-group
                      id="input-group-01"
                      label-for="input-01"
                    >
                      <div name="label" class="custom-label">
                        <span class="necessary">* </span>
                        Card Number:
                      </div>
                      <b-form-input
                        id="input-01"
                        v-model="form.cardNumber"
                        v-on:focus="showTips"
                        v-on:blur="hideTips"
                        :state="showTip==true?validationNum:validationNum2"
                      ></b-form-input>
                      <b-form-invalid-feedback>
                        {{cardNum}}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </div>
                </div>

                <div class="row">
                  
                  <div class="col-3">
                    <b-form-group
                      id="input-group-11"
                      label-for="input-11"
                    >
                      <div name="label" class="custom-label">
                        <span class="necessary">* </span>
                        Type:
                      </div>
                      <b-form-select
                        id="input-11"
                        v-model="form.type"
                        :options="types"
                        @change="selectType"
                      ></b-form-select>
                    </b-form-group>
                  </div>
                  <div class="col-3">
                    <b-form-group
                      id="input-group-12"
                      label-for="input-12"
                    >
                      <div name="label" class="custom-label">
                        <span class="necessary">* </span>
                        Expiration:
                      </div>
                      <b-form-select
                        id="input-12"
                        v-model="form.month"
                        :options="months"
                      ></b-form-select>
                    </b-form-group>
                  </div>
                  <div class="col-3">
                    <b-form-group
                      id="input-group-13"
                      label-for="input-13"
                    >
                      <div name="label" class="custom-label">
                        &nbsp;
                      </div>
                      <b-form-select
                        id="input-13"
                        v-model="form.year"
                        :options="years"
                        @change="selectYear"
                      ></b-form-select>
                    </b-form-group>
                  </div>
                  <div class="col-3">
                    <b-form-group
                      id="input-group-10"
                      label-for="input-10"
                    >
                      <div name="label" class="custom-label">
                        <span class="necessary">* </span>
                        CVV:
                        &nbsp;
                        <el-tooltip placement="bottom" effect="light">
                          <div slot="content">Flip your card over and look at the <br/>
                              signature box. You should see either the entire <br> 16-digit 
                              credit card number <br> or just the last four digits followed 
                              by a <br> special 3-digit code. This 3-digit code <br> is your Card 
                              Security Code.</div>
                          <span class="fa fa-exclamation-circle"></span>
                        </el-tooltip>
                      </div>
                      <b-form-input
                        id="input-10"
                        v-model="form.CVV"
                      ></b-form-input>
                    </b-form-group>
                  </div>
                </div>
              </div>
              <div class="middle"></div>
              <div class="down">
                <h2>Billing Address (address where you are receiving the statements for your credit card)</h2>

                <b-form-group id="input-group-4" label-for="input-4">
                  <div name="label" class="custom-label">
                    <span class="necessary">* </span>
                    Street:
                  </div>
                  <b-form-input
                    id="input-4"
                    v-model="form.street"
                  ></b-form-input>
                </b-form-group>

                <b-form-group id="input-group-5" label-for="input-5">
                  <div name="label" class="custom-label">
                    <span class="necessary">* </span>
                    City:
                  </div>
                  <b-form-input
                    id="input-5"
                    v-model="form.city"
                  ></b-form-input>
                </b-form-group>
                <div class="row">
                  <div class="col-4">
                    <b-form-group id="input-group-60" label-for="input-60">
                      <div name="label" class="custom-label">
                        State:
                      </div>
                      <b-form-select
                        v-show="stateChange"  
                        id="input-60"
                        v-model="form.state"
                        :options="statesOptions"
                      ></b-form-select>
                      <b-form-input
                          v-show="!stateChange"
                          id="input-60"
                          v-model="form.state"
                        ></b-form-input>
                    </b-form-group>
                  </div>
                  <div class="col-8">
                    <b-form-group id="input-group-61" label-for="input-61">
                      <div name="label" class="custom-label">
                        <span class="necessary">* </span>
                        Zipcode:
                        &nbsp;
                        <el-tooltip placement="bottom" effect="light">
                            <div slot="content">Some countries do not have zip <br>
                               codes. You can put '00000' instead of <br>
                                a number. And, you will be able to <br>  
                                 complete the booking without any <br> problem. 
                              </div>
                            <span class="fa fa-exclamation-circle"></span>
                          </el-tooltip>
                      </div>
                      <b-form-input
                        id="input-61"
                        v-model="form.zipcode"
                      ></b-form-input>
                    </b-form-group>
                  </div>
                </div>
                <b-form-group id="input-group-3" label-for="input-3">
                  <div name="label" class="custom-label">
                    <span class="necessary">* </span>
                    Country:
                  </div>
                  <b-form-select
                    id="input-3"
                    v-model="form.country"
                    :options="countryOptions"
                    @change="selectCountry"
                  ></b-form-select>
                </b-form-group>
              </div>
              <el-switch
                  class="isDefault"
                  v-model="showDefault"
                  inactive-text="Default payment method："
                  @change="selectDefault">
                </el-switch>
              <div class="btn-wrapper">
                <b-button type="reset"  variant="light">Cancel</b-button>
                <b-button @click="save" variant="warning">Save</b-button>
              </div>
            </b-form>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import ItemHeader from '@/views/UserCenter/ItemHeader'
  import countryOptions from '@/configs/country.json'
  import statesOptions from '@/configs/states.json'

  export default {
    data() {
      return {
        status: 1,
        headerInfo: [
          ['Add Credit Card'],
          { description: '', path: '',title:'My Account' }
        ],
        form: {
          holderName: '',
          cardNumber: '',
          CVV: '',
          type: '',
          month: '08',
          year: '2019',
          street: '',
          city: '',
          state:'null',
          zipcode:'',
          country:''
        },
        types: ['AmEx','VISA','Master'],
        months: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
        years: ['2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029'],
        infos:{},//编辑的具体信息
        cardNum:'Your card number must be 15 characters long.',
        showTip:'false',//默认不显示
        stateChange:'true',
        countryOptions,//国家选择
        statesOptions,//城市选择
        chooseMonth:'',//选择月份
        selectNum:'',//选择数字
        showDefault:true
      }
    },
    computed:{
      validationNum(){
        if(this.form.type == 'AmEx'){
          return this.form.cardNumber.length ==15;
        }else{
          return this.form.cardNumber.length ==16;
        }
      },
      validationNum2(){
        if(this.form.cardNumber.length!=0){
          if(this.form.type == 'AmEx'){
            return this.form.cardNumber.length ==15;
          }else if(this.form.type == 'VISA' || this.form.type == 'Master'){
            return this.form.cardNumber.length ==16;
          }
        }
      }
    },
    created(){
      this.infos = this.$store.state.creditInfo == ''?this.$store.state.creditInfo:JSON.parse(localStorage.getItem("creditInfo"));
      console.log(this.infos);
      //将月份转换成字符串
      if(this.infos.expireMonth>9){
        this.chooseMonth = this.infos.expireMonth.toString();
      }else{
        this.chooseMonth = '0'+this.infos.expireMonth.toString();
      }
      console.log(this.chooseMonth);
      this.form.holderName = this.infos.nameOnCard;
      this.form.cardNumber = this.infos.cardNumber;
      if(this.infos.cardType == 3){
        this.form.type = 'AmEx';
      }else if(this.infos.cardType == 2){
        this.form.type = 'VISA';
      }else if(this.infos.cardType == 1){
        this.form.type = 'Master';
      }
      this.form.month = this.chooseMonth;
      this.form.year = this.infos.expireYear;
      this.form.CVV = this.infos.xCardCode;
      this.form.street = this.infos.billingAddress.street;
      this.form.city = this.infos.billingAddress.city;
      this.form.state = this.infos.billingAddress.state;
      this.form.zipcode = this.infos.billingAddress.zipcode;
      this.form.country = this.infos.billingAddress.country;
      this.showDefault = this.infos.isDefault;
      this.selectCountry();
    },
    methods: {
      showTips(){
        this.showTip = true;
        console.log(this.showTip);
      },
      hideTips(){
        this.showTip = false;
        console.log(this.showTip);
      },
      selectType(val){//选择下拉type属性
        // console.log(val);
        if(val == 'VISA' || val == 'Master'){
          this.cardNum = 'Your card number must be 16 characters long.'
        }else if(val == 'AmEx'){
          this.cardNum = 'Your card number must be 15 characters long.'
        }
      },
      selectYear(val){//选择年份
        var date=new Date;
        var year=date.getFullYear(); 
        var month=date.getMonth()+1;
        if(Number(val)>year){
          this.months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
        }else{
          this.months = this.months.splice(month-1,13-month);
          this.form.month = this.months[0];
        }
      },
      selectCountry(val){//选择国家
        if(val == 'us'){
          this.stateChange = true;
        }else{
          this.stateChange = false;
        }
      },
      expiration(){
        var date=new Date;
        var year=date.getFullYear(); 
        var month=date.getMonth();
        this.months = this.months.splice(month,12-month);
        this.form.month = this.months[0];
      },
      selectDefault(val){
        this.showDefault = val;
        console.log(val);
      },
      onReset(evt) {
        this.$router.go(-1);
        // this.form = {
        //   holderName: '',
        //   cardNumber: '',
        //   CVV: '',
        //   type: 'null',
        //   month: '01',
        //   year: '2019',
        //   street: '',
        //   city: '',
        //   state:'null',
        //   zipcode:'',
        //   country:'us'
        // }
      },
      save(){
        if(this.form.type == 'VISA'){
          this.selectNum = 2;
        }else if(this.form.type == 'AmEx'){
          this.selectNum = 3;
        }else if(this.form.type == 'Master'){
          this.selectNum = 1;
        }
        if(this.form.holderName!='' &&this.form.cardNumber!=''&&this.form.CVV!='' &&this.form.street!='' &&this.form.city!='' &&this.form.zipcode!=''){
          this.$http.patch(`${this.$api.creditUpdate}/${this.infos.ccid}`,
              {ccid:this.infos.ccid,
                nameOnCard:this.form.holderName,
                cardNumber:this.form.cardNumber,
                cardType:this.selectNum,
                expireMonth:this.form.month,
                expireYear:this.form.year,
                xCardCode:this.form.CVV,
                isDefault:this.showDefault,
                billingAddress:{
                  uid:'11',
                  street:this.form.street,
                  city:this.form.city,
                  state:this.form.state,
                  zipcode:this.form.zipcode,
                  country:this.form.country}},
                {headers:{'Authorization':`Bearer ${sessionStorage.getItem('IvyCustomer_LoginToken')}`}})
              .then((res)=>{
                  console.log(res);
                  this.$router.push({name:'CreditList'});
              })
        }else{
          this.$message({
            message: 'Incomplete information',
            type: 'warning',
            showClose: true,
            center: true
          });
        }
      }
    },
    components: {
      ItemHeader
    },
    name: 'EditCredit'
  }
</script>

<style scoped>
  @import '~bootstrap/dist/css/bootstrap.css';
  @import '~bootstrap-vue/dist/bootstrap-vue.css';
  .add-credit {
    flex: 1;
  }
  .introduction::before, .introduction::after {
    display: table;
    content: '';
  }
  .introduction::after {
    clear: both;
  }
  .introduction {
    padding-left: 15px;
    padding-top: 4px;
    padding-bottom: 24px;
  }
  .introduction>.text {
    width: 540px;
    height: 38px;
    line-height: 19px;
    font-size: 16px;
    float: left;
    margin-right: 30px;
    color: #002E63;
  }
  .introduction>.img-wrapper {
    float: left;
  }
  .introduction>.img-wrapper>img {
    margin-right: 15px;
  }
  .form-wrapper {
    background-color: #FCFCFC;
    padding-top: 32px;
    padding-bottom: 20px;
    width: 814px;
  }
  .form-wrapper>.info {
    height: 30px;
    margin-bottom: 30px;
    margin-left: 124px;
    margin-right: 124px;
  }
  .form-wrapper>.info>img {
    width: 30px;
    height: 30px;
    margin-right: 20px;
    vertical-align: middle;
  }
  .form-wrapper>.info>span {
    color: #1CAD78;
    font-size: 16px;
    font-weight: bold;
  }
  .fa-exclamation-circle {
    color: #002E63;
  }
  >>> .custom-select:focus {
    border-color: #FF9A0D;
    box-shadow: none;
  }
  .custom-label {
    margin-bottom: 0.5rem;
  }
  .necessary {
    color: #F84C4C;
  }
  >>> .form-control:focus {
    border-color: #FF9A0D;
    box-shadow: none;
  }
  >>> .custom-select:focus {
    border-color: #FF9A0D;
    box-shadow: none;
  }
  .up {
    padding-left: 124px;
    padding-right: 124px;
  }
  .middle {
    border-top: 1px dashed #E5EFFA;
    margin-top: 36px;
    margin-bottom: 36px;
  }
  .down {
    padding-left: 124px;
    padding-right: 124px;
  }
  .down>h2 {
    font-size: 16px;
    line-height: 1;
    margin-top: 0;
    margin-bottom: 24px;
  }
  .btn-wrapper {
    padding-left: 124px;
    margin-top: 15px;
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
    padding-left: 124px;
    padding-right: 124px;
  }
</style>
