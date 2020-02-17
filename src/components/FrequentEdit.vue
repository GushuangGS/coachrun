<template>
    <div class="edit-list">
        <div class="edit-info">
            <div class="fir-name">
                <label>
                    <span class="color-orange">*</span>
                    <span>First Name</span>
                </label>
                <input v-model="firstName" type="text" name="firstName">
                <p v-show="showFir" class="show-txt">Please enter first name.</p>
            </div>
            <div class="last-name">
                <label>
                    <span class="color-orange">*</span>
                    <span>Last Name</span>
                </label>
                <input v-model="lastName" type="text" name="lastName">
                <p v-show="showLast" class="show-txt">Please enter last name.</p>
            </div>
        </div>
        <div class="check">
            <input id="check-default" type="checkbox" class="check-default" v-model="checkDefault"> 
            <span class="set-default" @click="setDefault">Set as default traveler</span>
            <!-- <label for="check-default" class="set-default" @click="setDefault">Set as default contact</label> -->
        </div>
        <div class="btns">
            <div class="save-btn" @click="saveInfo">
                Save
            </div>
            <div class="cancel-btn" @click="cancelInfo">
                Cancel
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'FrequentEdit',
        props:{
            editFreInfo:''
        },
        data(){
            return{
                firstName:'',
                lastName:'',
                showFir:false,//firName提示
                showLast:false,//lastName提示
                showAdd:false,//添加消失
                showEdit:false,//编辑消失
                checkDefault:false
            }
        },
        watch:{
            editFreInfo:{
                handler(val){
                    this.firstName = this.editFreInfo.firstName;
                    this.lastName = this.editFreInfo.lastName;
                    this.checkDefault = this.editFreInfo.isDefault;
                }
            }
        },
        created(){
            
        },
        methods:{
            // inputFir(){
            //     this.showFir = this.firstName ? false : true;
            // },
            // blurFir(){
            //     this.showFir = this.firstName ? false : true;
            // },
            setDefault(){                
                this.checkDefault = !this.checkDefault;
                console.log(this.checkDefault)
            },
            saveInfo(){
                console.log(this.checkDefault)
                if(this.firstName && this.lastName){
                    this.showFir = false;
                    this.showLast = false;
                    if(this.editFreInfo){
                        console.log(this.firstName,this.lastName)
                        this.$http.patch(`${this.$api.travellerList}/${this.editFreInfo.id}`,{firstName: this.firstName, lastName:this.lastName,isDefault:this.checkDefault})
                            .then((res)=>{
                                console.log(res)
                                if(res.data.code == 200){
                                    this.$emit('hide-edit',this.showEdit);
                                }
                            })
                    }else{
                        console.log('add');
                        this.$http.post(this.$api.travellerList,{ firstName: this.firstName, lastName:this.lastName,isDefault:this.checkDefault})
                            .then((res)=>{
                                console.log(res);
                                if(res.data.code == 200){
                                    this.$emit('hide-edit',this.showAdd);
                                    this.firstName = '';
                                    this.lastName = '';
                                }else if(res.data.code==500){
                                    this.$message({
                                        message: res.data.msg,
                                        type: 'warning',
                                        center: true
                                    });
                                }                            
                            })
                    }
                }else if(this.firstName=="" && this.lastName){
                    this.showFir = true;
                    this.showLast = false;
                }else if(this.firstName && this.lastName==""){
                    this.showFir = false;
                    this.showLast = true;
                }else{
                    this.showFir = true;
                    this.showLast = true;
                }
            },
            cancelInfo(){
                this.showFir = false;
                this.showLast = false;
                if(this.editFreInfo){
                    this.$emit('cancel-edit',this.showEdit);
                    this.firstName = this.editFreInfo.firstName;
                    this.lastName = this.editFreInfo.lastName;
                }else{
                    this.firstName = '';
                    this.lastName = '';
                    this.$emit('cancel-edit',this.showAdd);
                }
            }
        }
    }
</script>

<style scoped>
    label{
        margin-bottom: 5px;
    }
    input{  
        background:none;  
        outline:none;  
        border: none;
        border: 1px solid rgb(229, 229, 229);
        width: 150px;
        height: 28px;
        padding-left: 5px;
    }
    .edit-list{
        padding-bottom: 10px;
    }
    .edit-info{
        display: flex;
    }
    .fir-name,.last-name{
        display: flex;
        flex-direction: column;
        font-size: 14px;
    }
    .last-name{
        margin-left: 10px;
    }
    .color-orange {
        color: #FF6A00;
    }
    .show-txt{
        color: #FF6A4D;
        font-size: 12px;
    }
    .btns{
        display: flex;
        margin-top: 10px;
    }
    .save-btn,.cancel-btn{
        padding: 7px 5px;
        font-size: 14px;
        border-radius: 4px;
        cursor: pointer;
    }
    .save-btn{
        background-color: #FF9A0D;
        color: #fff;
    }
    .cancel-btn{
        background: #FFFFFF;
        border: 1px solid #DCDFE6;
        color: #333;
        margin-left: 10px;
    }
    .check{
        margin-top: 10px;
        display: flex;
    }
    .set-default{
        font-size: 14px;
        cursor: pointer;
    }
    .check-default{
        width: 14px;
        height: 14px;
        margin-right: 5px;
    }
</style>