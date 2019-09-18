export function websiteDomain(path){
    let domain = ''
    if(process.env === 'production'){
        domain = `${process.env.VUE_APP_WEBSITE_DOMAIN}/cgi-bin/${path}.fcgi`
    }else{
        domain = `${process.env.VUE_APP_WEBSITE_DOMAIN}/cgi-bin/${path}.cgi`
    }
    return domain
}
