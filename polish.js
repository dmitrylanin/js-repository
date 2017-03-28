    /*
        Код для вычисления на основе польской нотации, пример - 

            notation("234 345 456 + + 5 /") => (234+345+456)/5 = 207

        ВНУТРИ ФУНКЦИИ ЕСТЬ ОДИН МОМЕНТ, КОТОРЫЙ МНЕ НЕ НРАВИТСЯ - МОЖЕТ БЫТЬ, ПОДСКАЖИТЕ, КАК СДЕЛАТЬ КРАСИВЕЕ? 

        в функцию notation попадает строка с выражением, после чего она разделяется на два массива:
        operators - содержит знаки математических выражений
        operands - числа, с которыми происходят операции

        после разделения проверяем - соответствует ли число операндов числу операторов

        затем по принципу стека - берем два числа из operands и исполняем с ними operands

        сами математические выражения берем из объекта calculation - свойства объекта соответствуют матерматическим операциям


    */
    function notation(str) {
        let operands = str.split(" "); 
        let operators = [];
        let topOfStack, a, b;
        let i = 1;
        let j = 0; 
        
        for(let i=0; i<operands.length; i++){
            if(operands[i] == "+" || operands[i] == "-" || operands[i] == "*" || operands[i] == "/"){
                operators.push(operands[i])
                operands.splice(i, 1); 
                i--; 
            }; 
        }

        if(operands.length != operators.length+1){
            return "ошибка в синтаксисе"; 
        }
        
        /*
            переменная -- a -- используется только в цикле, но
            я вынужден определять ее вне цикла, поскольку если определить ее в цикле - она будет 
            постоянно ссылаться на 0-вой элемент массива.
            это некрасивое, но работающее решение - на Ваш взгляд, его можно как-то улучшить? 

        */

        a = operands[0]; 
        
        do{
            
            b = operands[i]; 

            topOfStack = calculation[operators[j]](a, b);
            a = topOfStack; 
            j++; 
            i++; 

        } while(i<operands.length); 

        console.log(topOfStack); 

    }


    let calculation = {
        "+": function(a, b){
            a = parseInt(a);
            b = parseInt(b);
            return a+b;
        },

        "-": function(a, b){
            a = parseInt(a);
            b = parseInt(b);
            return a-b;
        },

        "*": function(a, b){
            a = parseInt(a);
            b = parseInt(b);
            return a*b;
        },

        "/": function(a, b){
            a = parseInt(a);
            b = parseInt(b);
            return a/b;
        }
    }
