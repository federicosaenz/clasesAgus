const colors = require('../_data/colores.json');



function getColorPorId(id){
    for(i in colors){
        if(colors[i].colorId===id)
        return colors[i]
    }
}


const getColorById = (id) => {
    for(i in colors){
        if(colors[i].colorId===id) return colors[i];
    }
    return null;
}
//repasar diferencia entre estos 2 metodos, for y el de usar un .find/.filter
const getColorByName = (n) => {
    return colors.find(function(color) {
        return color.nombreColor===n
    })
}

const getColorByCalidez = (buleano) => {
    return colors.filter(function(color) {
        return color.calido===buleano
    })
}


module.exports = {
    getColorPorId,
    getColorById,
    getColorByName,
    getColorByCalidez

    
  }