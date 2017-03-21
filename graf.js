    /*
        конструтор графа - принимает массив массивов парных чисел;
        выдает объект, где каждая вернаши графа - отдельный объект с двумя свойствами:
            - имя вершины
            - партнеры - массив симметричных вершин
        метод searchDeep позволяет обходить массив

        !!! у кода есть ПРОБЛЕМА - в нем используются две глобальные переменные - 
            calculated и proxyCalculated - КАК ОТ ЭТОГО ИЗБАВИТЬСЯ? 

        пример кода для тестирования:

        let gr = Graf([[0, 3], [1, 3], [2, 3], [4, 3], [5, 4]])

        searchDeep(gr) - выдает массив со списком вершин графа

    */

    /*
        конструктор графа - принимает массив массивов парных чисел; последовательно перебирает каждый подмассив и для каждого элемента подмассива вызывает конструктор couple; 
    */

function Graf(arr){
    let x, y;
    let obj; 

    for(let i = 0; i<arr.length; i++){
        x = arr[i][0];
        y = arr[i][1]; 
        
        obj = couple(x, y); 
    }
    return obj; 
}

    //это глобальная переменная, и это плохо!!!
let calculated = {}; 

    /*
        функция couple - принимает на вход два числа, которые обозначают смежные вершины графа
        затем проверяет - если такие вершины уже есть в объекте calculated (используется для 
        хранения вершин, для которых уже был создан свой экземпляр) - и после этого либо объекты обоих вершин в calculated, либо лишь объект одной вершины 

        объекты вершин создаются с помощью конструтора Node, который содержит два поля:
            value - название вершины
            partners - массив вершин, с которыми она смежная
    */

function couple(x, y){

    let couple1, couple2; 
   
    if(calculated[x] && calculated[y]){
        couple1 = calculated[x];
        couple2 = calculated[y];
    }else if(calculated[x]){
        couple2 = new Node(y); 
        couple1 = calculated[x]; 
    }
    else if(calculated[y]){
        couple1 = new Node(x); 
        couple2 = calculated[y];
    }else{
        couple1 = new Node(x); 
        couple2 = new Node(y); 
    }
    
    couple1.partners.push(couple2); 
    couple2.partners.push(couple1); 
    
    calculated[couple1.value] = couple1;
    calculated[couple2.value] = couple2;

    return calculated; 

}

function Node(value){
    this.value = value; 
    this.partners = []; 
}

    /*
        функция searchDeep() используется для перебора вершин графа, алгоритм работы:
            - перебор объекта графа, начинаем с первого свойства;
            - проверяем, есть ли такая вершина в массиве searched (в нем хранится список найденных вершин) - проверяем с какими вершинами смежна текущая вершина (обращаемся к массиву partners 
                текущей вершины) и передаем этот массив в функцию deepDeep()
            - функция deepDeep последовательно прокручивает каждый элемент переданного массива partners;
            - для каждой вершины, находящейся в partners, снова вызываем функцию deepDeep() и она ищет смежные вершины у вершин, смежных первоначальной вершине (фактически ищет partners-ов у partners-ов первоначального элемента); эти данные отправляются во временное хранилище searchedChild; 
            - проверяем с помощью функции smartMix - есть ли уникальные элементы в массиве searchedChild
                или же его содержание полностью совпадает с содержанием массива searched; 
            - когда цикл перебрал все варианты, функция searchDeep возвращает массив searched, содержащий
                только уникальные вершины
    */

function searchDeep(obj){
    let roll;
    let searched = [];
    let searchedChild;  

    for(let key in obj){
        roll = obj[key]; 
        let proxyArr = []; 
        proxyArr.push(roll.value)

        searched = smartMix(searched, proxyArr); 
        searchedChild = deepDeep(roll.partners); 

        searched = smartMix(searched, searchedChild)
    }
        
    return searched; 
}

let proxyCalculated = [];

function deepDeep(arr){    
    let roll;  

    for(let j=0; j<arr.length; j++){
        roll = arr[j];
        if(proxyCalculated.indexOf(roll.value) == -1){
            proxyCalculated.push(roll.value); 
            deepDeep(roll.partners)
        }
    }

    return proxyCalculated; 

}
    /*
        функция принимает два массива "куда" и "что"
        проверяет, если элемента массива "что" нет в массиве "куда", то добавляет новый элемент
        если есть - игнорирует
        функция возвращает "обнволенный" массив куда
    */

function smartMix(where, what){
   
    for(let i=0; i<what.length; i++){
        let z = what[i]; 
        if(where.indexOf(z) == -1){
            where.push(z); 
        }
    }

    return where; 
}
