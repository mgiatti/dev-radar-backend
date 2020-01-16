function parseStringAsArray(params){
    return params.split(",").map(param => param.trim());
}

module.exports = parseStringAsArray;