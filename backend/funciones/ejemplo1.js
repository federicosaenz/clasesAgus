const colores = require('./../_data/colores.json');
const personas = require('./../_data/personas.json');

function imprimir() {
  console.log(colores);
}

/** ESTAS DOS FUNCIONES SON PARECIDAS. EN BASE A UN ARRAY, DEVUELVE 1 Y SOLO 1 RESULTADO. SI NO ENCUENTRA NADA, DEVUELVE null */
const getPersonaById = (id) => {
  for(i in personas) {
    if(personas[i].userId===id) return personas[i];
  }
  return null;
}
const getPersonaByEmailAddress = (email)=> {
  // Find trae la primera ocurrencia que encuentra en el array. Tener cuidado, que haya uno solo.
  return personas.find(function(persona) {
    return persona.emailAddress===email;
  });
}

const getPersonaByDNIOrElUltimo = (dni) => {
  // En este caso puntual, tambien usamos indice en la funcion que recibe por parametro el find
  return personas.find(function(persona,indice) {
    return (persona.dni===dni || indice===personas.length-1);
  });
}


/**  */
const getPersonasByGender = (gender) => {
  let arrTmp = [];
  for(i in personas) {
    if(personas[i].gender===gender) {
      arrTmp.push(personas[i]);
    }
  }
  return arrTmp;
}

const getPersonasByVipLevel = (vipLevel) => {
  return personas.filter(function(persona) {
    return persona.vip === vipLevel
  })
}

const formatName = (persona) => {
  return `${persona.lastName}, ${persona.firstName}`;
}

// Ejemplo complejo de funciones que devuelven funciones (en realidad, estoy devolviendo funciones en base al tipo de parametro de entrada)
const getConjuntoFunciones = (parametro) => {
  if(typeof parametro === "string") {
    return [
      function() {
        return parametro.length
      }, 
      function() {
        return parametro.charAt(0).toUpperCase() + parametro.slice(1);
      }
    ]
  } else {
    return [
      function() {
        return parametro>10
      }, 
      function() {
        return (parametro%2===0)
      }
    ]
  }
}

// Este ejemplo es exactamente igual al anterior, pero esta simplificado a una linea
const getConjuntoFuncionesSimplificado = (parametro) => (typeof parametro === "string") ? 
  [
    () => parametro.length, 
    () => parametro.charAt(0).toUpperCase() + parametro.slice(1)
  ] : 
  [
    () => parametro > 10, 
    () => (parametro % 2 === 0)
  ];

const getCantidadMascotas = (persona) => {

  return persona.mascotas?.length;

  // if(persona.mascotas) {
  //   return persona.mascotas.length;
  // }
  // return 0;
}

module.exports = {
  imprimir,
  getPersonaById,
  getPersonasByGender,
  getPersonasByVipLevel,
  getPersonaByDNIOrElUltimo,
  getPersonaByEmailAddress,
  formatName,
  getConjuntoFunciones,
  getConjuntoFuncionesSimplificado,
  getCantidadMascotas,
  personas
}