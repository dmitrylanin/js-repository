 "use strict" 
 
 /*
функция для конвертации числа из десятичной системы в двоичную
 */

function convertTo2 (x){ 
   
    var balance, quotient;
    var arr = [];

    do{
        quotient = x/2;
        balance = x%2; 
        arr.push(balance); 

        x = Math.floor(quotient);
        
        if(quotient == 1 ){
            arr.push(1); 
            break;
        }else if(quotient<1){
            break; 
        }
    } 
    while(quotient>0)

    arr = arr.reverse();
    var str = arr.join(""); 
    console.log(str); 
}

 /*
функция для конвертации числа из двоичной системы в десятичную
 */

function convertTo10(x){
    x = ""+x; 
    var arr = x.split("");
    var exp = arr.length-1;
    var n = 0; 
    var i=0;
    var z; 
    do{
        z=arr[i]; 
        n += z * Math.pow(2, exp);
        i++;  
        exp--;
    }
    while(exp>=0)

    console.log(n);
}
