export const dateFormat=(fecha)=>{

    let dayInicio=fecha.getDate()<10?'0'+fecha.getDate():fecha.getDate()
    let monthInicio=(fecha.getMonth()+1)<10?'0'+(fecha.getMonth()+1):(fecha.getMonth()+1)
    let fechaFinal=dayInicio+'/'+monthInicio+'/'+fecha.getFullYear()+" "+fecha.getTime()
    return fechaFinal
}
export const  toIsoDate=(date)=> {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}
 
export const dateFormatA=(fecha)=>{

    let dayInicio=fecha.getDate()<10?'0'+fecha.getDate():fecha.getDate()
    let monthInicio=(fecha.getMonth()+1)<10?'0'+(fecha.getMonth()+1):(fecha.getMonth()+1)
    let fechaFinal=dayInicio+'/'+monthInicio+'/'+fecha.getFullYear()
    return fechaFinal
}
export const utcDate=(fecha)=>{
    let fechaFinal=null
if(fecha!=null){
    let dayInicio=fecha.getDate()<10?'0'+fecha.getDate():fecha.getDate()
    let monthInicio=(fecha.getMonth()+1)<10?'0'+(fecha.getMonth()+1):(fecha.getMonth()+1)
   fechaFinal=fecha.getFullYear()+'-'+monthInicio+'-'+dayInicio
}

    return fechaFinal
}
export const getHours=(fecha)=>{

    let fechaFinal=fecha.getHours()+':'+fecha.getMinutes()
    return fechaFinal
}
export const convertirDate=(dateString)=>{
    if(dateString!=""){
        
        let dateParts = dateString.split("/");
        let dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]); 
        return dateObject 
    }else{
        return '';
    }

}
