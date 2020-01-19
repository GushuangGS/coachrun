<template>
  <div class="frequent-list">
    <el-container>
      <el-main>
        <div class="container">
          <h2>Frequent Traveler Info</h2>
          <div class="container-list">
            <div class="container-title">
              <span class="container-name">Name</span>
              <span class="container-action">Actions</span>
            </div>
            <div class="user-list">
              <div
                class="user-edit"
                v-for="(item, index) in freLits"
                :key="item.id"
              >
                <div class="user-info">
                  <div class="user-name">
                    <span>{{ item.firstName }}</span
                    >&nbsp;
                    <span>{{ item.lastName }}</span>
                  </div>
                  <div class="user-action">
                    <!-- <span @click="activeInde=index">Edit</span> -->
                    <span @click="editInfo(index, item)">Edit</span>
                    <span class="user-delete" @click="deleteInfo(item.id)"
                      >Delete</span
                    >
                  </div>
                </div>
                <frequent-edit
                  v-show="showEdit && activeIndex == index"
                  :editFreInfo="editFreInfo"
                  @hide-edit="hideEdit"
                  @cancel-edit="cancelEdit"
                ></frequent-edit>
              </div>
            </div>
            <div class="add-list">
              <div class="add-contact">
                <i
                  class="icon-plus-circled"
                  v-show="!showAdd"
                  @click="addContact"
                ></i>
                <span @click="addContact">Add New Traveler</span>
              </div>
              <frequent-edit
                v-show="showAdd"
                @hide-edit="hideEdit"
                @cancel-edit="cancelEdit"
              ></frequent-edit>
            </div>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import FrequentEdit from "@/components/FrequentEdit";
export default {
  name: "FrequentList",
  components: {
    FrequentEdit
  },
  data() {
    return {
      activeIndex: -1,
      showEdit: false, //编辑消失
      showAdd: false, //添加消失
      freLits: [],
      editFreInfo: ""
    };
  },
  created() {
    this.getLists();
  },
  methods: {
    hideEdit(data) {
      this.showAdd = data;
      this.showEdit = data;
      this.getLists();
    },
    cancelEdit(data) {
      this.showAdd = data;
      this.showEdit = data;
    },
    getLists() {
      this.$http.get(this.$api.travellerList).then(res => {
        console.log(res);
        if (res.data.code == 200) {
          this.freLits = res.data.data;
        } else if (res.data.code == 500) {
          this.$message({
            message: res.data.msg,
            type: "warning",
            center: true
          });
        }
      });
    },
    deleteInfo(id) {
      this.$http.delete(`${this.$api.travellerList}/${id}`).then(res => {
        console.log(res);
        if (res.data.code == 200) {
          this.$message({
            message: "Removed successfully.",
            type: "success",
            center: true
          });
          this.getLists();
        }
      });
    },
    //编辑
    editInfo(index, item) {
      this.activeIndex = index;
      this.editFreInfo = item;
      this.showEdit = true;
      this.showAdd = false;
    },
    addContact() {
      this.showAdd = true;
      this.showEdit = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.frequent-list {
  flex: 1;
}
.container > h2 {
  font-size: 18px;
  font-weight: bold;
  line-height: 1;
  margin-top: 0;
  margin-bottom: 18px;
}
.container-list {
  width: 400px;
  border: 1px solid #dcdfe6;
}
.container-title {
  height: 40px;
  background: #e5effa;
  display: flex;
}
.container-name,
.container-action {
  // width: 230px;
  display: inline-block;
  line-height: 40px;
  color: #29507d;
  font-size: 14px;
  font-weight: bold;
}
.container-name {
  width: 280px;
  margin-left: 20px;
}
.container-action {
  width: 90px;
}
.user-list {
  padding: 0 10px;
}
.user-edit {
  padding: 0 10px;
  border-bottom: 1px solid #ebeef5;
}
.user-info {
  display: flex;
  height: 40px;
  font-size: 14px;
  line-height: 40px;
}
.user-name {
  width: 350px;
}
.user-action {
  width: 90px;
  margin-left: 20px;
  color: #29507d;
  font-weight: bold;
}
.user-action span {
  cursor: pointer;
}
.user-delete {
  margin-left: 10px;
}
.add-contact {
  height: 40px;
  line-height: 40px;
  color: #333;
  font-size: 14px;
  cursor: pointer;
}
.add-contact i {
  font-size: 16px;
  color: #00a2ff;
  margin-right: 5px;
}
.add-list {
  padding: 0 20px;
}
</style>
