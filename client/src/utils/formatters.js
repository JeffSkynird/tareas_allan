export const isDni=(cad)=>{
 
        var total = 0;
        var longitud = cad.length;
        var longcheck = longitud - 1;
    
        if (cad !== "" && longitud === 10) {
          for (let i = 0; i < longcheck; i++) {
            if (i % 2 === 0) {
              var aux = cad.charAt(i) * 2;
              if (aux > 9) aux -= 9;
              total += aux;
            } else {
              total += parseInt(cad.charAt(i)); // parseInt o concatenará en lugar de sumar
            }
          }
    
          total = total % 10 ? 10 - (total % 10) : 0;
    
          if (cad.charAt(longitud - 1) == total) {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
     
}

export const isEmail=(valor)=>{
    if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(valor)) {
        return true;
      } else {
        return false;
      }
}