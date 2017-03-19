    /*
        ПРИМЕР КОДА ДЛЯ ТЕСТИРОВАНИЯ:
        let a = new List() - создаем очередь
        a.add(1)
        a.add(2)
        a.add(3) - добавляем в нее элементы; эти значения сохранятся в свойстве value каждого из объектов очереди

        let b = new List() - создаем вторую очередь и добавляем в нее элементы
        b.add(3)
        b.add(2)
        b.add(1)

        let c = listSumm(a, b) - вызываем функцию суммирования очередей, получим 123 + 321 = 444
    
        let d = outerButton(c)  -  преобразуем число 444 к обратно к очереди из трех элементов 4,4,4 
        d.delete(2) - удалим второй элемент из очереди, получили очередь из двух элементов - 4,4 
        
    */
    
    /*
        конструктор очереди - содержит объект очереди
        объект хранит внутри себя информацию о первом (свойство first) и последнем (свойство nextObj) элементах очереди, количестве элементов в очереди в принципе (свойство index)

        изменение последнего элемента в очереди и изменение количества элементов осуществляется с помощью
        геттеров и сеттеров
    */
    function List () {
        this.first = null;
        this.index = 0; 
        this.nextObj = null;

        this.previousObj = null, 

        this.getNextObj = function(){
            return this.nextObj;
        }

        this.setNextObj = function(obj){
            this.nextObj = obj;
        }

        this.getPreviousObj = function(){
            return this.previousObj;
        }

        this.setPreviousObj = function(obj){
            this.previousObj = obj; 
        }

        this.getIndex = function(){
            return this.index;  
        }; 
        
        this.setIndex = function(n){
             this.index = n; 
        };




        //метод для добавления объекта в очередь
        this.add = function (value) {
            let objCurrent = new Node(value); 

            //случай, если очередь пустая и новый элемент будет в ней первым
           if(this.index == 0){
                this.first = objCurrent; 
                
                objCurrent.index = this.getIndex()+1;
                this.setIndex(objCurrent.index); 

                this.setNextObj(objCurrent); 
                objCurrent.previousObj = objCurrent; 
                this.setPreviousObj(objCurrent); 
           
           }else{
            //случай для добавления второго и последующего узлов
                objCurrent.index = this.getIndex()+1;
                this.setIndex(objCurrent.index); 

                objCurrent.nextObj = this.getNextObj(); 
                this.setNextObj(objCurrent); 

                this.getPreviousObj().previousObj = objCurrent;
                this.setPreviousObj(objCurrent); 

            } 
        }

        /* 
            метод для поиска объекта в очереди
            в метод передается номер объекта в очереди и затем метод возвращает соответствующий объект
        */
        this.search = function(n){
            objCurrent = this.first; 
             
            if(n>this.index|| n<0){
                return "Такого значения нет в очереди";
            }else{
                do{       
                    if(objCurrent.index == n){
                        return objCurrent.value; 
                        break; 
                    } 
                    objCurrent = objCurrent.previousObj; 
                }
                while(this.index >= objCurrent.index); 
            }
        };


        /*
            метод для удаления объекта из очереди - метод принимает номер объекта, 
            который нужно удалить и после этого связывает между собой объекты идущие после и до него;
            в результате, ссылка на удаляемый объект пропадает;

            в методе используется функция changeIndex - она меняет номера объектов, идущих за 
            удаленным объектом;
            например - в очереди 3 объекта - 1,2,3 - пусть мы удалим объект №2 -> объект №3 станет вторым в 
            очереди - для этого и нужна функция changeIndex()
        */
        this.delete = function(n){
            let context = this; 
            if(n == this.index){
                this.previousObj.previousObj = null; 
                this.setIndex(n-1)
            
            }else if(n == 1){
                this.first.previousObj = this.first;

                changeIndex(n, context); 

            }
             /* 
             ниже случай удаления узла из середины очереди: 
            находим предыдущий и следующий узлы относительно него и 
            склеиваем их между собой
            затем для пересчета номеров узлов в очереди вызываем функцию changeIndex()
            */

            else if(n>0 && n<=this.index){
                let right = this.specialSearch(n-1); 
                let left = this.specialSearch(n+1);
                left.nextObj = right; 
                right.previousObj = left; 
                changeIndex(n, context);      
            }
        }

        /* 
        метод для поиска узла в очереди при удалении
        отличается от  this.search тем, что 
        возвращает не содержание найденного объекта (value), 
        а ссылку на объект
        */ 
        this.specialSearch = function(n){
            objCurrent = this.first; 
             
            if(n>this.index|| n<0){
                return "Такого значения нет в очереди";
            }else{
                do{       
                    if(objCurrent.index == n){
                        return objCurrent; 
                        break; 
                    } 
                    objCurrent = objCurrent.previousObj; 
                }
                while(this.index >= objCurrent.index); 
            }
        };
    } 
    
    /*
    конструтор узла, содержит его содержание - value, номер очереди,
    ссылки на следующий и предыдущий объекты
    */
    function Node(value){
        this.value = value; 
        this.index = 0; 
        this.previousObj = null; 
        this.nextObj = null;
    }

    /* 
    функция пересчитывает номера элементов в очереди и ее объем, когда
    удаляется элемент из середины очереди
    второй аргумент context необходим для захвата контекста
    */
    function changeIndex(n, context){
        do{
            objCurrent.index = objCurrent.index-1; 
            objCurrent = objCurrent.previousObj;
        }
        while(objCurrent != undefined)
        
        context.index = context.index-1;  
    }




    /*
        функция сложения n-списков (количество списков значения не имеет),
        возвращает число - результат суммирования;
        можно было бы результ сложения также сделать списком, но 
        это мне показалось менее эстетичным ;))) 
    */
    function listSumm(l1, l2){
        let count = 0;
        let rez = 0; 
        let arr = new Array(); 

        while(arguments.length>count){
            
            let j = arguments[count]; 
                j = j.previousObj; 
                arr.push(j.value); 
            
            do{
                arr.push(j.nextObj.value);   
                j = j.nextObj;
            } while(j.nextObj); 

            arr = arr.reverse(); 
            let str = arr.join("");

            rez += parseInt(str);

            count++;
            arr = []; 
        
        }

        return rez; 
    }

    /*
    обертка - получает число а, состоящее из n-разрядов, 
    дробит число по разрядам и последовательно ставит их в очередь 
    из конструткора List
    */

    function outerButton(a){

        let nubmer = a+ ""; 
        let arr = nubmer.split(""); 

        let list = new List(); 

        for(let j = 0; j< arr.length; j++){
            list.add(arr[j]); 
        }
        return list; 
    }
