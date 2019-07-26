<template>
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
                    label="First name:"
                    label-for="input-00"
                  >
                    <b-form-input
                      id="input-00"
                      v-model="form.firstName"
                      required
                    ></b-form-input>
                  </b-form-group>
                </div>
                <div class="col-6">
                  <b-form-group
                    id="input-group-01"
                    label="Last name:"
                    label-for="input-01"
                  >
                    <b-form-input
                      id="input-01"
                      v-model="form.lastName"
                      required
                    ></b-form-input>
                  </b-form-group>
                </div>
              </div>

              <b-form-group id="input-group-3" label="Country:" label-for="input-3">
                <b-form-select
                  id="input-3"
                  v-model="form.country"
                  :options="countries"
                  required
                ></b-form-select>
              </b-form-group>

              <b-form-group id="input-group-2" label="Street:" label-for="input-2">
                <b-form-input
                  id="input-2"
                  v-model="form.street"
                  required
                  placeholder=""
                ></b-form-input>
              </b-form-group>

              <b-form-group id="input-group-5" label="City:" label-for="input-5">
                <b-form-input
                  id="input-5"
                  v-model="form.city"
                  placeholder=""
                ></b-form-input>
              </b-form-group>

              <b-form-group id="input-group-6" label="Country/Region/Province:" label-for="input-6">
                <b-form-input
                  id="input-6"
                  v-model="form.CountryRegionProvince"
                  placeholder=""
                ></b-form-input>
              </b-form-group>

              <b-form-group id="input-group-7" label="Phone:" label-for="input-7">
                <b-form-input
                  id="input-7"
                  type="tel"
                  v-model="form.phone"
                  placeholder=""
                ></b-form-input>
              </b-form-group>

              <b-form-group id="input-group-8" label-for="input-8">
                <div name="label" class="custom-label">
                  Zipcode:
                  &nbsp;
                  <span class="fa fa-exclamation-circle"></span>
                </div>
                <b-form-input
                  id="input-8"
                  v-model="form.zipcode"
                  placeholder=""
                ></b-form-input>
              </b-form-group>

              <b-button type="submit" variant="light">Cancel</b-button>
              <b-button type="reset" variant="warning">Save</b-button>
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
          { description: '', path: '' }
        ],
        form: {
          firstName: '',
          lastName: '',
          country: null,
          street: '',
          city: '',
          countryRegionProvince: '',
          zipcode: '',
          checked: []
        },
        countries: [{ text: 'Select One', value: null }, 'Carrots', 'Beans', 'Tomatoes', 'Corn'],
        show: true
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
</style>
