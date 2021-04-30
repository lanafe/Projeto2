const elementhidden = () => {
    if (document.getElementById("Cifra").checked) {
        document.getElementById("quantidade").style.display = "block";
    }
    else {
        document.getElementById("quantidade").style.display = "none";
    };    
};

const codificando = () => {
    if (document.getElementById("codifico").checked) {
        document.getElementById("codificar").style.display = "block";
        document.getElementById("decodificar").style.display = "none";
    } 
    else {
        document.getElementById("codificar").style.display = "none";
        document.getElementById("decodificar").style.display = "block";
    };
};

//getMap-> decodificar
//encrypt-> codificar
const str = 'thisIsAString';
const getMap = (legend, shift) => {
   return legend.reduce((charsMap, currentChar, charIndex) => {
      const copy = { ...charsMap };
      let ind = (charIndex + shift) % legend.length;
      if (ind < 0) {
         ind += legend.length;
      };
      copy[currentChar] = legend[ind];
      return copy;
   }, {});
};

const encrypt = (str, shift = 0) => {
   const legend = 'abcdefghijklmnopqrstuvwxyz'.split('');
   const map = getMap(legend, shift);
   return str
   .toLowerCase()
   .split('')
   .map(char => map[char] || char)
   .join('');
}

function criptografar(){
    let resposta = document.getElementById("Goku");
    let valor = document.getElementById("textInput").value;
    let algarismo = document.getElementById("numero").value;
    resposta.innerHTML = encrypt(valor,algarismo);
}

function descriptografar(){
    let resposta_2 = document.getElementById("Goku");
    let valor_2 = document.getElementById("textInput").value;
    let algarismo_2 = document.getElementById("numero").value;
    resposta_2.innerHTML = getMap (valor_2,algarismo_2);
}

function base64_encode (s)
{
  // the result/encoded string, the padding string, and the pad count
  var base64chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var r = ""; 
  var p = ""; 
  var c = s.length % 3;

  // add a right zero pad to make this string a multiple of 3 characters
  if (c > 0) { 
    for (; c < 3; c++) { 
      p += '='; 
      s += "\0"; 
    } 
  }

  // increment over the length of the string, three characters at a time
  for (c = 0; c < s.length; c += 3) {

    // we add newlines after every 76 output characters, according to the MIME specs
    if (c > 0 && (c / 3 * 4) % 76 == 0) { 
      r += "\r\n"; 
    }

    // these three 8-bit (ASCII) characters become one 24-bit number
    var n = (s.charCodeAt(c) << 16) + (s.charCodeAt(c+1) << 8) + s.charCodeAt(c+2);

    // this 24-bit number gets separated into four 6-bit numbers
    n = [(n >>> 18) & 63, (n >>> 12) & 63, (n >>> 6) & 63, n & 63];

    // those four 6-bit numbers are used as indices into the base64 character list
    r += base64chars[n[0]] + base64chars[n[1]] + base64chars[n[2]] + base64chars[n[3]];
  }
   // add the actual padding string, after removing the zero pad
  return r.substring(0, r.length - p.length) + p;
}

function destransformar_base64 (str){
    return atob(str);
}