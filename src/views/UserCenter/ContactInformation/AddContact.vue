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
                        placeholder="Enter email"
                      ></b-form-input>
                    </b-form-group>
      
                    <b-form-group id="input-group-4" label="Contact Phone:" label-for="input-4">
                      <b-form-input
                        id="input-4"
                        type="tel"
                        v-model="form.phone"
                        placeholder=""
                      ></b-form-input>
                    </b-form-group>
      
                    <b-form-group id="input-group-5" label="Alternate Phone:" label-for="input-5">
                        <b-form-input
                          id="input-5"
                          type="tel"
                          v-model="form.AlternatePhone"
                          placeholder=""
                        ></b-form-input>
                      </b-form-group>
      
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
        import ItemHeader from '@/views/UserCenter/ItemHeader'
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
                AlternatePhone:''
              },
              show: true
            }
          },
          methods: {
            onSubmit(evt) {
              evt.preventDefault();
              if(this.form.firstName!='' && this.form.lastName!=''&&this.form.email!=''&&this.form.phone!=''&&this.form.AlternatePhone!=''){
                  console.log(JSON.stringify(this.form));
                  this.$http.post(this.$api.contactAdd,
                    { uid:'2199066',firstName:this.form.firstName,lastName:this.form.lastName,
                    phone:this.form.phone,email:this.form.email,phone2:this.form.AlternatePhone})
                    .then((res)=>{
                        console.log(res);
                        //添加成功后，默认都设置为空
                        this.form = {
                          firstName:'',
                          lastName:'',
                          email:'',
                          phone:'',
                          AlternatePhone:''
                        }
                    })
              }else{
                alert('信息不全')
              }
            },
            onReset(evt) {
              evt.preventDefault()
              // Reset our form values
              this.form.firstName = ''
              this.form.lastName = ''
              this.form.email = ''
              this.form.phone =''
              this.form.AlternatePhone =''
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
          name: 'AddContact'
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
      </style>
      