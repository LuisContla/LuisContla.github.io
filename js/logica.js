//vamos a crear una función que se encarge del cifrado cesar
//let

var cesar = cesar || (function(){
    //función anónima :O
    //callback

    var doStaff = function(txt, desp, action){
        var replace = (function(){
            //mi abecedario
            var abc = ['a','b','c','d','e','f','g','h','i','j','k',
                    'l','m','n','ñ','o','p','q','r','s','t','u',
                    'v','w','x','y','z'];
            var l = abc.length;

            //funcion que se va a encargar de cifrar
            return function(c){
                var i = abc.indexOf(c.toLowerCase());
                //vamos a verificar que no está vacío
                if (i != -1) {
                    var pos = i;
                    if (action) {
                        //avanzar, ya que estamos recorriendo
                        //en el cifrado de cesar se cifra por desplazamiento
                        pos += desp;
                        //ahora ocuparé un operador ternario para ahorrarme toda una función
                        //lo ocupo porque ya supe como usarlo mejor :)
                        pos = (pos >= l) ? pos-l : pos;                                
                        //pos -= (pos>=1)?1:0; -- Esto hacía que se hiciera raro el cifrado... xD
                    }else{
                        //retroceder
                        //descifrar por el mismo desplazamiento
                        pos -= desp;
                        //de nuevo :D. solo que algo difrente a la anterior, solo la lógica
                        pos = (pos < 0) ? l+pos : pos;
                        //pos += (pos < 0)?1:0; -- Esto igual xD
                    }
                    return abc[pos];
                }
                return c;
            };
        })();

        //aqui es donde tenmos que hacer el match
        var re = (/([a-z-ñÑ])/ig);
        return String(txt).replace(re, function(match){
            return replace(match);
        });
    };
    //ahora solo falta saber si quiero cifrar o descifrar
    return{
        encode : function(txt, desp){
            return doStaff(txt, desp, true);
        },

        decode : function(txt, desp){
            return doStaff(txt, desp, false);
        }
    };
})();

//realizar una función que se encargue de codificar y decodificar

function codificar(){
    camposVacios();
    //si es un número negativo, saco valor absoluto
    var posi = Math.abs(parseInt(document.getElementById("posicionamiento").value));
    //obtener el téxto del textarea
    //usaré mas operadores ternarios :D
    var res = cesar.encode(document.getElementById("cadena").value, (posi >= 27) ? posi%27 : posi );
    document.getElementById("res").innerText = res;
}

function decodificar(){
    //si es un número negativo, saco valor absoluto
    var posi = Math.abs(parseInt(document.getElementById("posicionamiento").value));
    //obtener el téxto del textarea
    //aquí igual operadores ternarios :DD
    var res = cesar.decode(document.getElementById("cadena").value, (posi >= 27) ? posi%27 : posi );
    document.getElementById("res").innerText = res;
}

//Ahora viene la parte de la valdación :(((
//Aunque me ahorré un poco en el html :D

//Para ver que no haya campos necesarios vacíos o el numero sea negativo

function camposVacios(){
    var cadena = document.getElementById("cadena").value;
    var posicionamiento = parseInt(document.getElementById("posicionamiento").value);
    if (cadena == "") {
        alert("ERROR 01 : Ingrese texto a codificar");
    }if (posicionamiento < 0) {
        alert("ERROR 02 : Numero negativo, se tomará como positivo")
    }
}

//Para que el texto se copie al campo de texto y se reinicion los campos

function colocar(){
    var copiado = document.getElementById("res").value;
    document.getElementById("cadena").value = copiado;
}

function reiniciar(){
    document.getElementById("cadena").value = "";
    document.getElementById("posicionamiento").value = 0;
    document.getElementById("res").innerText = "";
}