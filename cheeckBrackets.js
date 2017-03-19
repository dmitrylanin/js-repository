    /*
    функция cheeckBrackets проверяет верно ли расставлены скобки 
    и в зависимости от результата возвращает true или false
    на входе функция получает строку из разных видов скобок, затем начинает перебирать ее посимвольно
    при переборе создается стек, в который последовательно кладется символ за символом;
    если предпоследний и последний элементы стека образуют правильное сочетание скобок, то 
    оба элемента удаляются из стека
    если после перебора всех скобок в стеке остаются скобки, значит последовательность была неверной
    и функция возвращает false
    */

    function cheeckBrackets(string){
        //примеры правильного сочетания скобок
        let variant1 = "{}"; 
        let variant2 = "[]";
        let variant3 = "()";
        let summ; 
        //разбиваем строку на символы
        let arr = string.split(""); 

        //создаем стек 
        let stack = new makeStack(new makeLetter(arr[0])); 
        //начинаем перебор элементов и последовательно закидываем их в стек
        for(let i=1; i<arr.length; i++){
            stack.add(new makeLetter(arr[i])); 
            
            if(stack.next.previousObj != null && stack.next != null){
                summ =  stack.next.previousObj.value + stack.next.value; 

                //проверяем, "правильная" ли сумма скобок и если "да" - удаляем ее из стека
                if( summ == variant1 ||
                    summ == variant2 ||
                    summ == variant3){
                        stack.deleteCouple(); 
                }
            }
        }

        //по итогам работы функции смотрим, осталось ли что-то в стеке
        if(stack.previous == null && stack.next == null){
            return "true"
        }
            return "false";
    }

    /*
    конструктор стека; 
    содержит свойства next - ссылка на верхний (последний) элемент стека и 
    previous - предпоследний элемент стека
    */
    function makeStack(obj){
        this.next = null;
        this.previous = null; 

        if(this.previous == null){
            this.previous = obj;
        } 
    }

    /*
        метод добавления нового элемента в стек
        при добавлении нового элемента он становится "верхним" и записывается в свойство стека next
        в предпоследний элемент записывается, что только что добавленный элемент становится для него next
    */
    makeStack.prototype.add = function(obj){ 
        this.next = obj; 
        if(this.previous){
            this.previous.nextObj = this.next;
            this.next.previousObj = this.previous; 
        }   
        this.previous = this.next;
    }

    /*
        метод удаления пары элементов из стека; адаптирован для двух сценариев
        - первый - если в стеке после удаления пары верхних элементов останется хотя бы один элемент
        - второй - если в стеке после удаления пары верхних элементов не останется ни одного элемента
    */
    makeStack.prototype.deleteCouple = function(){
        if (this.next.previousObj.previousObj){
            this.previous = this.next.previousObj.previousObj;
            this.next.nextObj = null; 
            this.next = this.previous;
        } else if(this.next.previousObj.previousObj == null){
            this.previous = null;
            this.next = null; 
        }
    }

    /*
        конструктор элемента стека. содержит тип скобки в свойстве value,
        ссылку на следующий объект стека в свойстве nextObj
        и на предыдущий объект стека в свойстве previousObj
    */  
    function makeLetter(value) {
        this.value = value; 
        this.nextObj = null; 
        this.previousObj = null; 
    }
