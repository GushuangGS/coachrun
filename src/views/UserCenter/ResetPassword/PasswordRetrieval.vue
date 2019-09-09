    <template>
        <div>
            <component :is="toPas" @ResPas="toResPas" :userInfo="userInfo"></component>
        </div>
    </template>
    
    <script>
        import passwordItem from './PasswordItem'
        import ResetPassword from './ResetPassword'
        export default {
            name:'PasswordRetrieval',
            components: {
                passwordItem,
                ResetPassword
            },
            data() {
               return{
                    toPas:passwordItem,
                    userInfo:[]
               }
            },
            methods:{
                toResPas(data){
                    this.toPas = data[0].ResetPassword;
                    this.userInfo = data;
                }
            }
        }
    
    </script>
    
    <style scoped>
        
    </style>
    