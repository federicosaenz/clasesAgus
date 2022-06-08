const functionPersonas = require("./funciones/functionPersons");
const funtionColores = require("./funciones/funtionColors");


const personaDeEjemplo = functionPersonas.getPersonaById(4);
//console.log(personaDeEjemplo);

const personasMasculinas = functionPersonas.getPersonasByGender("male");
// console.log(personasMasculinas);

const personaNoEncontrada = functionPersonas.getPersonaByDNIOrElUltimo("45984349");
// console.log(personaNoEncontrada);

// Traigo un usuario por id y muestro el nombre y el apellido
// console.log(functionPersonas.formatName(functionPersonas.getPersonaById(2)));

// Ejemplo complejo de funciones que devuelven funciones (en realidad, estoy devolviendo funciones en base al tipo de parametro de entrada)
// console.log(functionPersonas.getConjuntoFunciones(5)[0]())

//for(i in functionPersonas.personas) {
//  console.log(`La persona ${functionPersonas.formatName(functionPersonas.personas[i])} tiene ${functionPersonas.getCantidadMascotas(functionPersonas.personas[i])} mascotas...`);
//}


// agregar un archivo que se llame funtionColores las funciones para traer un color por ID, por nombre, bulean "calidos"
//investigar js array.map, array.reduce, array.pop, array.shift, array.find, array.forEach, array.sort, array.join, string.split,  . (repasar todos los array.)  




//console.log(funtionColores.getColorPorId(5))

// console.log(functionPersonas.addCompleteName());

// console.log(functionPersonas.mediaDeEdad());
//console.log(functionPersonas.agregarPersona("pepe","sarasa","23434239","asdfasdf@asdfasdf.com"));

// console.log(functionPersonas.personas);

//console.log(functionPersonas.getPersonas());

// console.log(funtionColores.getColorByName("cyan"))

// console.log(funtionColores.getColorByCalidez(true))
console.log(functionPersonas.agregarKeysAlArray())





//pendientes para explicar referencia de un array y un objeto.