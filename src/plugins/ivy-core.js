export default {
    getToken(callback,apiDomain,loginUrl){
        let token = Cookies.get("IvyCustomer_LoginToken") || sessionStorage.getItem("IvyCustomer_LoginToken");
        if (token) {
            callback(token)
        } else {
            let loginCookie = Cookies.get("IvyCustomer_LoginCookie");
            if (loginCookie){
                if(apiDomain.indexOf('coachrun')!=-1){
                    token = loginCookie.split('+|+')[2];
                    callback(token);
                }else{
                    axios.post(apiDomain+"/api/users/authorization", {loginCookie}, {headers: {'X-Api-Key': this.apiKey}})
                        .then(res=>{
                            if (res.data && res.data.code == 200) {
                                Cookies.get("IvyCustomer_LoginToken", res.data.data.token);
                                callback(res.data.data.token);
                            } else if (res.data && res.data.code == 401) {
                                Cookies.get("IvyCustomer_LoginToken", "");
                                location.href = loginUrl;
                            }
                        })
                }
            } else {
                location.href = loginUrl;
            }
        }
    }



}