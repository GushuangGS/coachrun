<template>
    <div class="contact-list">
      <el-container>
        <el-header height="33px">
          <item-header :status="status" :headerInfo="headerInfo"></item-header>
        </el-header>
        <el-main>
            <div class="container">
              <h2>Contact Information</h2>
              <div class="table-wrapper">
                <el-table
                  :data="contactList"
                  style="width: 100%">
                  <el-table-column
                    header-align="center"
                    prop="name"
                    label="Name"
                    min-width="200">
                    <template slot-scope="scope">
                      <span>{{ scope.row.name }}</span>
                      &nbsp;
                      <span v-if="scope.row.isDefault" class="default">[ Default ]</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    align="center"
                    header-align="center"
                    prop="phone"
                    label="Phone"
                    min-width="300">
                  </el-table-column>
                  <el-table-column
                    align="center"
                    header-align="center"
                    prop="email"
                    label="Email"
                    min-width="100">
                  </el-table-column>
                  <el-table-column
                    align="center"
                    header-align="center"
                    label="Actions"
                    min-width="200">
                    <template slot-scope="scope">
                      <el-button type="text" size="small" @click.native="jump(scope.row.id)">Edit</el-button>
                      <el-button type="text" size="small" v-if="!scope.row.isDefault" @click.native="setDefault(scope.row.id)">Default</el-button>
                      <el-button @click="handleClick(scope.row)" type="text" size="small">Delete</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
        </el-main>
      </el-container>
    </div>
</template>

<script>
  import ItemHeader from '@/views/UserCenter/ItemHeader'
  import { getContactList } from '../../../api/UserCenter/ContactInformation/contact-list'
  import { ERR_OK } from '../../../api/config'
  export default {
    data() {
      return {
        status: 0,
        headerInfo: [
          [''],
          { description: 'Contact Information', path: '/app/member/account/contactlist' }
        ],
        contactList: [
          { id: 2, isDefault: true, name: 'Tom', phone: '15751002499', email: '15751002499@163.com' },
          { id: 1, isDefault: false, name: 'Jack', phone: '16651619952', email: '16651619952@163.com' }
        ]
      }
    },
    methods: {
      _getContactList() {
        getContactList(1, {
          'Content-Type': 'application/json',
          'Authorization': this.token
        }).then((response) => {
          let res = response.data
          if (res.code === ERR_OK) {
            for (let i = 0; i < res.data.length; i++) {
              let contactItem = {}
              contactItem.name = res.data[i].firstName + res.data[i].lastName
              contactItem.isDefault = res.data[i].isDefault
              contactItem.phone = res.data[i].phone
              contactItem.email = res.data[i].email
              this.contactList.push(contactItem)
            }
          } else {
          }
        })
      },
      jump(id) {
        this.$router.push(`${this.$router.currentRoute.path}/${id}`)
      },
      setDefault(id) {

      }
    },
    created() {
      // this._getContactList()
    },
    components: {
      ItemHeader
    },
    name: 'ContactList'
  }
</script>

<style scoped>
  .contact-list {
    flex: 1;
  }
  >>> .el-main {
    padding-top: 24px;
  }
  .container {
    padding-left: 20px;
  }
  .container>h2 {
    padding-left: 5px;
    font-size: 18px;
    font-weight: bold;
    line-height: 20px;
    margin-top: 0;
  }
  >>> .el-table__header th {
    background-color: #E5EFFA;
    color: #29507D;
    padding: 6px 0;
  }
  >>> .el-table__body td {
    padding: 3px 0;
  }
  >>> .el-table__header th>div.cell {
    font-size: 16px;
  }
  >>> .el-table__body td>div.cell{
    font-size: 15px;
  }
  span.default {
    color: #FF9A0D;
  }
  >>> .el-table__body td>div.cell>button>span {
    color: #29507D;
    font-weight: bold;
    font-size: 15px;
  }
  >>> .el-table__body td>div.cell>button:not(:last-child)>span {
    padding-right: 10px;
    border-right: 1px solid #979797;
  }
</style>
