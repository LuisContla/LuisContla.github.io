//Bien, aqui vamos, a ver si me sale en JavaScript, porque en java me hice bolas :(((
//Surgió una idea... De que el cifrado césar me podría ayudar bastante en el viggenere
//Esa fue una referencia a los Vengadores...
//Espero nunca nadie lea mis comentarios XDDD Que pena XD

//Bueno, continuando, como dije, el cifrado César me va a ayudar bastante en este, asi que...
//Ctrl + C ; Ctrl + V.

var viggenere = viggenere || (function(){

    var doStaff = function(txt, desp, action){
        var replace = (function(){
            var abc = ['a','b','c','d','e','f','g','h','i','j','k',
                    'l','m','n','ñ','o','p','q','r','s','t','u',
                    'v','w','x','y','z'];
            var l = abc.length;

            return function(c){
                var i = abc.indexOf(c.toLowerCase());
                if (i != -1) {
                    var pos = i;
                    if (action) {
                        pos += desp;
                        pos = (pos >= l) ? pos-l : pos;                                
                    }else{
                        pos -= desp;
                        pos = (pos < 0) ? l+pos : pos;
                    }
                    return abc[pos];
                }
                return c;
            };
        })();
        var re = (/([a-z-ñÑ])/ig);
        return String(txt).replace(re, function(match){
            return replace(match);
        });
    };
    return{
        encode : function(txt, desp){
            return doStaff(txt, desp, true);
        },

        decode : function(txt, desp){
            return doStaff(txt, desp, false);
        }
    };
})();

//Ahora, es hora de ejecutar mi idea...
//Crearé las funciones de codificar y decodificar:

function codificar(texto, clave) {

    var resultado = "";
    var indiceClave = 0;
    var charArTexto = texto.split(''); //split funciona como un charArray

    for (var i = 0; i < charArTexto.length; i++) {
        
        var despla = obIndiceClave(clave.charAt(indiceClave));
        var charTexto = charArTexto[i];

        resultado += viggenere.encode(charTexto, (despla >= 27) ? despla%27 : despla);
        indiceClave++

        if (indiceClave >= clave.length) {
            indiceClave = 0;
        }

    }

    document.getElementById("res").value = resultado;

}

function decodificar(texto, clave) {

    var resultado = "";
    var indiceClave = 0;
    var charArTexto = texto.split(''); //split funciona como un charArray

    for (var i = 0; i < charArTexto.length; i++) {
        
        var despla = obIndiceClave(clave.charAt(indiceClave));
        var charTexto = charArTexto[i];

        resultado += viggenere.decode(charTexto, (despla >= 27) ? despla%27 : despla);
        indiceClave++

        if (indiceClave >= clave.length) {
            indiceClave = 0;
        }

    }

    document.getElementById("res").value = resultado;

}

//Bien, ahora me falta lo que hará que mi idea funcione... espero... si no pus ni modo :(

function obIndiceClave(reco) {
    //JAJA Aquí básicamente lo que hago es decir el cuanto se va a recorrer la posición
    //Por ejemplo, a = 0, b = 1, c = 3, etc...
    var abc = ['a','b','c','d','e','f','g','h','i','j','k',
                'l','m','n','ñ','o','p','q','r','s','t','u',
                'v','w','x','y','z'];
    //reco es el numero del desplazamiento o recorrido
    return abc.indexOf(reco.toLowerCase());
}

//Y ahora la parte de la validación... de nuevo...

//Para ver que los campos no estén vacíos

function camposVacios(){
    var cadena = document.getElementById("cadena").value;
    var clave = document.getElementById("posicionamiento").value;
    if (cadena == "") {
        alert("ERROR 01 : Ingrese texto a codificar");
    }if (clave == "") {
        alert("ERROR 02 : Ingrese una palabra clave")
    }
}

//Para ver que el campo de la clave no sea más grande que el del texto a cifrar

function comprobarLongitudCodificar() {
    camposVacios();
    var texto = document.getElementById("cadena").value;
    var clave = document.getElementById("posicionamiento").value;
    if (clave.length > texto.length) {
        alert("ERROR 03 : La palabra clave es más larga que el texto a cifrar");
    }else{
        codificar(texto, clave);
    }
}

function comprobarLongitudDecodificar() {
    camposVacios();
    var texto = document.getElementById("cadena").value;
    var clave = document.getElementById("posicionamiento").value;
    if (clave.length > texto.length) {
        alert("ERROR 03 : La palabra clave es más larga que el texto a cifrar");
    }else{
        decodificar(texto, clave);
    }
}

//Para que el texto se copie al campo de texto y se reinicion los campos

function colocar(){
    var copiado = document.getElementById("res").value;
    document.getElementById("cadena").value = copiado;
}

function reiniciar(){
    document.getElementById("cadena").value = "";
    document.getElementById("posicionamiento").value = "";
    document.getElementById("res").innerText = "";
}
