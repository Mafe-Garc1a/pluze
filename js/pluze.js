let miMatriz =matrizDesorganizada();


/* Esto fue al principio pa poder desordenar todo [ //se crea la matriz donde van los numeros
    ["1","2","3"],
    ["4","5","6"],
    ["7","","8"],
]; */

const board = document.querySelector(".board");
console.log(miMatriz);
function dibujarFichas(){
    //se limpia el tablero
    board.innerHTML="";
    //forEach es para iterar sobre los elementos de la matriz , es una alterantiva de for
    miMatriz.forEach(row=> row.forEach(Element=>{
        if(Element==""){
            board.innerHTML+=`<div class= "vacio">${Element}</div>`
        }else{
            board.innerHTML+=`<div class= "ficha">${Element}</div>`
        }
        
    }));
};
function addEventListeners(){//imprimir todas las fichas
    let fichas =document.querySelectorAll(".ficha");
    //se agg un escucha a un evento
    fichas.forEach(ficha => ficha.addEventListener("click" , ()=>{
        console.log("click");
        let  actualPosicion= buscarPosicion(ficha.innerText);
        console.log(actualPosicion);
        let vacioPosicion=buscarPosicion("");
        console.log(vacioPosicion);
        let movimiento= proximoMovimiento(actualPosicion , vacioPosicion);
        console.log(movimiento);
        if(movimiento!=="noMovimiento"){
            //3 paramentros : n moverlo donde hizo click , posicion actual , posicion vacia
            actualizarMatriz(ficha.innerText , actualPosicion , vacioPosicion);
            let resultado =  compararMatriz();//comparar con la matriz inicial
            console.log(resultado);
            //para lanzar el coonfeti  esto se encuentra en la pagina npm
            if(resultado==true){
                confetti({
                    particleCount:150,
                    spread:180,
                });
            }
            dibujarFichas();
            addEventListeners(); // vuelve y se llama porque serian nuevos elementos
        };
    }));
};
//se da el parametro element(el numnero) , para saber su posiion y hacia donde se puede mover
function buscarPosicion(Element){
    //variables pa guardar el indice
    let rowindex=0;
    let columindex=0;
    //se hace para hallar el inidice
    miMatriz.forEach((row , index) =>{
        //se esta guardando el indice en esta variable sino findIndex arroja un -1
        let rowElement = row.findIndex(item =>  
        item == Element);
            if(rowElement!==-1){
                console.log(index , rowElement);
                rowindex=index;
                columindex=rowElement;
            };
    });
     //lo devuelvo en forma de arreglo
    return[rowindex , columindex];
};
//para saber donde moverse
function proximoMovimiento(actualPosicion , vacioPosicion){
    //parte larga ya q solo necesitaba que me retornara en noMov , cuando sea mayor a 1 o menor a -1
    //acen oarte de la misma columna
    if(actualPosicion[1]==vacioPosicion[1]){
        if(actualPosicion[0]-vacioPosicion[0]==1 ){
            return "arriba";
        }else{
            if(actualPosicion[0]-vacioPosicion[0]== -1){
                
                return "abajo" ;
            }else{
                return "noMovimiento";
            };
        };
    }else{
        //si hacenparte de loa misma fila
        if(actualPosicion[0]==vacioPosicion[0]){
            if(actualPosicion[1]-vacioPosicion[1]== -1){
                return "derecha";
            }else{
                if(actualPosicion[1]-vacioPosicion[1]== 1){
                    return "izquierda";
                }else{
                        return "noMovimiento";
                };
            };
        }else{
            return "noMovimiento";
        };
    };
};
function actualizarMatriz(element , actualPosicion , vacioPosicion){
    miMatriz[actualPosicion[0]][actualPosicion[1]]="";
    miMatriz[vacioPosicion[0]][vacioPosicion[1]]=element;
    console.log(miMatriz);

};
function matrizDesorganizada(){
    let matrizDesorganizada=[
        [],
        [],
        []
    ];
    let arreglo = ["1" , "2","3","4","5","6","7","8", ""];
    //.sort =>pide una funcion flecha para ordenar de diferentes maneras (ascendentemente , descendentemente)
    //solo funcionan en arreglos
    //[1,3,4,5].sort((a,b)=>a-b) || dependiendo del resultado de la resta (positivo-negativo) ordena todo
    //match.random=> genera un numero decimal aleatorio entre 1 y 0
    let arregloDesordenado = arreglo.sort(()=>Math.random()-0.5 );
     //cada elemento se agrega a una ffila para la matriz
    let colum=0;
    let row=0;
    //se genera otra matriz desorganizada
    arregloDesordenado.forEach(element=>{
        matrizDesorganizada[row].push(element);
        if(colum<2){
            colum++;
        }else{
            //para que la columna vuelva a 0 y cree otra fila
            colum=0;
            row++; //para que en l otra interacion llene la otra fila
        };
    });
    console.log(matrizDesorganizada);
    return matrizDesorganizada;
};
function compararMatriz(){
    let finalMatriz = [
    ["1","2","3"],
    ["4","5","6"],
    ["7","8",""],
    ];
    let contador =0;
    //puede pasar 2 parametros 
    miMatriz.forEach((row , indexRow)=>{
        row.forEach((element,indexColumn)=>{
            if(element==finalMatriz[indexRow][indexColumn]){
                console.log("si son iguales");
                contador++;
            };
        });
    });
    if(contador==9){
        return true ; // retorna solo si los 9 num son iguales a la matriz original
    }else{
        return false;
    };
};

dibujarFichas();
addEventListeners();

