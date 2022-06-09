const colores = require('../_data/colores.json');
let personas = require('../_data/personas.json');
const fs = require('fs');
const { parse } = require('csv-parse');
const moment = require("moment");
//const parse = require('csv-parse');



const csvData = []

function imprimir() {
  console.log(colores);
}

/** ESTAS DOS FUNCIONES SON PARECIDAS. EN BASE A UN ARRAY, DEVUELVE 1 Y SOLO 1 RESULTADO. SI NO ENCUENTRA NADA, DEVUELVE null */
const getPersonaById = (id) => {
  // for(i in personas) {
  //   if(personas[i].userId===id) return personas[i];
  // }
  let ret = null;
  personas.forEach(function(persona) {
    if(persona.userId===id) ret = persona;
  })
  return ret;
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
//sirve para filtrar por una caracteristica que tegan mas de 1 objeto y devuelve todos los que cumplan la condicion.
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

const agregarPersona = (userId,firstName,lastName,phoneNumber,emailAddress,gender,vip,age,dni,mascotas,fobias) => {
  personas = [...personas,{userId: userId, firstName:firstName,lastName:lastName,phoneNumber:phoneNumber,emailAddress:emailAddress,gender:gender,vip:vip,age:age,dni:dni,mascotas:mascotas, fobias:fobias}]
}

const getAllPhoneNumbersAsStr = () => {
  return personas
    .map(personas=>personas.phoneNumber)
    .join(",")
    .split(",")
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
}

const addCompleteName = () => {
  return personas.map(persona=> {
    let newPersona = persona;
    newPersona.completeName = formatName(persona);
    return newPersona
  })
}

/**  */
const mediaDeEdad = () => {
  const edadTotal = personas.reduce((acum,persona)=>{
    return persona.age + acum
  }, 0);
  return personas.length ? (edadTotal / personas.length) : 0
}

const getArrayDeEdades = () => {
  return personas.map(persona=> persona.age);
}

/** para traer toda la lista de personas */
const getPersonas = () => {
  return personas;
}


const agregarPersonasFromCSV = () => {
  // usar fs para abrir el archivo
  //abrir el csv
  //obtener todas las filas
  //Por cada fila, obtener todas las columnas
  // en base al valor de cada columna, agregarla al array de personas con esos valores   
}

const probarCSV = () => {
  fs.readFile(`${__dirname}/../_data/csv_personas.csv`, 'utf-8', (error, data) =>{
    if(!error){
      console.log(data);
    }else{
      console.log(`error: ${error}`);
    }
  });
}

const arrayDePersonasSinColumns = () => {
    

  fs.createReadStream(`${__dirname}/../_data/csv_personas.csv`)
  .pipe(
    parse({
      delimiter: ',',
    })

  )
  .on('data', persona => {
    //Boolean("") <-- false
    //Boolean("asdfadsf") <-- true
    //Boolean(" ") <-- true
    const isVip = Boolean(persona[24]);

    const fNacDDMMYY = persona[11]; //20/03/1964 o tambien vienen fechas asi 14/02/59. El anio tiene 2 tamanios distintos, entonces vamos a sanitizarlo
    const arrFechasSeparadas = fNacDDMMYY.split("/"); // ["20","03","1964"]
    const fechaSanitizada = arrFechasSeparadas
      .map((dateValue,index) => (index===2 && dateValue.length===2) ? "19" + dateValue : dateValue)
      .join("/");
    const dateMoment = moment(fechaSanitizada, "DD/MM/YYYY");
    const edad = moment().diff(dateMoment,'years');
    /*
    dateMoment es un objeto de la clase moment, en cuyo estado (suponemos) se almacena algo así {
      anio: 2022,
      mes: 04
      ... etc
    }
    */

    // Hacer esto siempre y cuando el id del csv no coincida con los userIds que ya tenemos
    const csvID = Number.parseInt(persona[0]);
    //if(!personas.find(personaExistente => csvID===personaExistente.userId)) {
    if(!personas.some(personaExistente => csvID===personaExistente.userId )) {
      agregarPersona(csvID,persona[3],persona[2],persona[6],persona[8],persona[10],isVip,edad,persona[35],[], persona[32]);
    }
  })
  .on('end',result=> {
    console.log(personas);
  })
}

// const agregarKeysAlArray = () => {
//   const a = arrayDePersonas();
//   console.log(a);
  // arrayDePersonas().forEach( (persona,index) => {
  //   if(index===1) {
  //     console.log(persona);
  //   }
  //   // agregarPersona()
  // })
  //return datosCsv
// }




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
  addCompleteName,
  mediaDeEdad,
  getArrayDeEdades,
  getAllPhoneNumbersAsStr,
  agregarPersona,
  getPersonas,
  probarCSV,
  arrayDePersonasSinColumns,
  personas
}