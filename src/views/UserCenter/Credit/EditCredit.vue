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
            <b-form @submit="onSubmit" @reset="onReset">
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
                        <span class="fa fa-exclamation-circle"></span>
                      </div>
                      <b-form-input
                        id="input-00"
                        v-model="form.holderName"
                        required
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
                        required
                      ></b-form-input>
                    </b-form-group>
                  </div>
                </div>

                <div class="row">
                  <div class="col-3">
                    <b-form-group
                      id="input-group-10"
                      label-for="input-10"
                    >
                      <div name="label" class="custom-label">
                        <span class="necessary">* </span>
                        CVV:
                        &nbsp;
                        <span class="fa fa-exclamation-circle"></span>
                      </div>
                      <b-form-input
                        id="input-10"
                        v-model="form.CVV"
                        required
                      ></b-form-input>
                    </b-form-group>
                  </div>
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
                        required
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
                        required
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
                        required
                      ></b-form-select>
                    </b-form-group>
                  </div>
                </div>
              </div>
              <div class="middle"></div>
              <div class="down">
                <h2>Billing Address (address where you are receiving the statements for your credit card)</h2>
                <b-form-group id="input-group-3" label-for="input-3">
                  <div name="label" class="custom-label">
                    <span class="necessary">* </span>
                    Country:
                  </div>
                  <b-form-select
                    id="input-3"
                    v-model="form.country"
                    :options="countries"
                    required
                  ></b-form-select>
                </b-form-group>

                <b-form-group id="input-group-4" label-for="input-4">
                  <div name="label" class="custom-label">
                    <span class="necessary">* </span>
                    Street:
                  </div>
                  <b-form-input
                    id="input-4"
                    v-model="form.street"
                    required
                    placeholder=""
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
                    placeholder=""
                  ></b-form-input>
                </b-form-group>
                <div class="row">
                  <div class="col-4">
                    <b-form-group id="input-group-60" label-for="input-60">
                      <div name="label" class="custom-label">
                        <span class="necessary">* </span>
                        State:
                      </div>
                      <b-form-select
                        id="input-60"
                        v-model="form.state"
                        :options="states"
                        required
                      ></b-form-select>
                    </b-form-group>
                  </div>
                  <div class="col-8">
                    <b-form-group id="input-group-61" label-for="input-61">
                      <div name="label" class="custom-label">
                        <span class="necessary">* </span>
                        Zipcode:
                        &nbsp;
                        <span class="fa fa-exclamation-circle"></span>
                      </div>
                      <b-form-input
                        id="input-61"
                        v-model="form.zipcode"
                        placeholder=""
                      ></b-form-input>
                    </b-form-group>
                  </div>
                </div>
              </div>
              <div class="btn-wrapper">
                <b-button type="submit" variant="light">Cancel</b-button>
                <b-button type="reset" variant="warning">Save</b-button>
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
  export default {
    data() {
      return {
        status: 1,
        headerInfo: [
          ['Add Credit Card'],
          { description: '', path: '' }
        ],
        form: {
          holderName: '',
          cardNumber: '',
          CVV: '',
          type: 'AmEx',
          month: '01',
          year: '2019',
          country: null,
          street: '',
          city: ''
        },
        types: ['AmEx'],
        months: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
        years: ['2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029'],
        countries: [{ text: 'Select One', value: null }, 'Carrots', 'Beans', 'Tomatoes', 'Corn'],
        states: ['USA', 'UK', 'China']
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()
        alert(JSON.stringify(this.form))
      },
      onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        this.form.email = ''
        this.form.name = ''
        this.form.food = null
        this.form.checked = []
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
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
</style>
