"use strict"

/*
    функция wordIndex() принимает на входе строку, разбивает ее на слова и затем возвращает объект (либо объекты если слов с одинаковой упоминаемостью несколько) currentWord с двумя свойствами:
    value - cамо слово
    count - количество упоминаний слова в тексте
*/

function wordIndex(str) {
    str = str.toLowerCase(); 
    let arrString = str.split(" "); 
    let usedWords = []; 
    let index = []; 
    let currentWord; 
    let currentMaxIndex = 0; 

        //внешний цикл перебирает каждое слово в строке
    for(let i=0; i<arrString.length; i++){
        currentWord = new countWord(arrString[i]); 
        
        /*
            проверка - обрабатывалось ли слово ранее или нет; 
            если "да", то слово помещается в массив usedWords и счетчик не будет повторно пересчитывать количество его упоминаний 
        */
        
        if(usedWords.indexOf(currentWord.value) == -1){

        //внутренний цикл проверяет сколько раз каждое конкретное слово встречается в тексте
            for(let j=0; j<arrString.length; j++){
                if(currentWord.value == arrString[j]){
                    currentWord.count ++; 
                }
                usedWords.push(currentWord.value); 
            } 
        }
        
        /*
        определяем самое "популярное" слово и помещаем объект (слово и количество упоминаний) в массив index
        если только что обработонное слово встречается чаще, чем ранее обработанные слова, 
        массив обнуляется и в него добавляется последнее слово
        */
        if(currentWord.count>currentMaxIndex){
            index.length = 0; 
            currentMaxIndex = currentWord.count;
            index.push(currentWord); 
        }else if(currentWord.count == currentMaxIndex){
            index.push(currentWord); 
        }  
    }

    return index; 
}

        //конструктор для индексирования слов включает в себя само слово и количество его повторений
function countWord(word){
    this.value = word;
    this.count = 0; 
}
