export default function getMyDay(date){
    var week;
    if(date.getDay()==0) week="Sun"
    if(date.getDay()==1) week="Mon"
    if(date.getDay()==2) week="Tues"
    if(date.getDay()==3) week="Wed"
    if(date.getDay()==4) week="Thur"
    if(date.getDay()==5) week="Fri"
    if(date.getDay()==6) week="Sat"
    return week;
}