const ejemplo1Modulo = require("./funciones/ejemplo1");


const personaDeEjemplo = ejemplo1Modulo.getPersonaById(4);
//console.log(personaDeEjemplo);

const personasMasculinas = ejemplo1Modulo.getPersonasByGender("male");
// console.log(personasMasculinas);

const personaNoEncontrada = ejemplo1Modulo.getPersonaByDNIOrElUltimo("45984349");
// console.log(personaNoEncontrada);

// Traigo un usuario por id y muestro el nombre y el apellido
// console.log(ejemplo1Modulo.formatName(ejemplo1Modulo.getPersonaById(2)));

// Ejemplo complejo de funciones que devuelven funciones (en realidad, estoy devolviendo funciones en base al tipo de parametro de entrada)
// console.log(ejemplo1Modulo.getConjuntoFunciones(5)[0]())

for(i in ejemplo1Modulo.personas) {
  console.log(`La persona ${ejemplo1Modulo.formatName(ejemplo1Modulo.personas[i])} tiene ${ejemplo1Modulo.getCantidadMascotas(ejemplo1Modulo.personas[i])} mascotas...`);
}