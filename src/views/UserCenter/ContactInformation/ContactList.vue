<template>
    <div class="contact-information">
      <el-container>
        <el-header height="33px">
          <item-header :status="status" :headerInfo="headerInfo"></item-header>
        </el-header>
        <el-main>
            <div class="container">
              <h2>Contact Information</h2>
              <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                  prop="name"
                  label="Name"
                  width="180">
                  <template slot-scope="scope">
                    <span>{{ scope.row.name }}</span>
                    <span v-if="scope.row.isDefault" class="default">[ Default ]</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="Address"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="zipCode"
                  label="Zip Code">
                </el-table-column>
                <el-table-column
                  label="Actions"
                  width="180">
                  <template slot-scope="scope">
                    <el-button type="text" size="small">Edit</el-button>
                    <el-button type="text" size="small">Default</el-button>
                    <el-button @click="handleClick(scope.row)" type="text" size="small">Delete</el-button>
                  </template>
                </el-table-column>
              </el-table>
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
        status: 0,
        headerInfo: [
          [''],
          { description: 'Contact Information', path: '/app/member/account/contactlist' }
        ],
        contactList: [
          { id: 1, isDefault: false, name: 'Jack', address: '杭州市西湖区三墩镇紫荆花北路望月公寓', zipCode: '310013' },
          { id: 2, isDefault: true, name: 'Tom', address: '杭州市滨江区。。。。。。', zipCode: '310051' }
        ]
      }
    },
    components: {
      ItemHeader
    },
    name: 'ContactList'
  }
</script>

<style scoped>

</style>
