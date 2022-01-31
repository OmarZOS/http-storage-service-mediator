// This script is responsible of resolving attribute names
const constants = require('../constants')

const keyDictionary = new Object()


const caseResolver = (value) => { //makes attributes more case respectful..
    let key = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase().replace('_', ' ');
    if (!keyDictionary[`${key}`])
        keyDictionary[`${key}`] = [value]
    return key;
}

const attributeIndicator = (indicatorName, attributeName, value = 0, force = false) => {

    if (value != 0) {
        force = true;
    }

    if (!keyDictionary[`${indicatorName}`]) {
        keyDictionary[`${indicatorName}`] = [attributeName, keyDictionary[`${attributeName}`].length]
        keyDictionary[`${attributeName}`].push(value) //initialised with zero
        return value;
    }
    if (force) {
        keyDictionary[`${attributeName}`][keyDictionary[`${indicatorName}`][1]] = value
        return value;
    }
    // console.log(keyDictionary[`${attributeName}`][keyDictionary[`${indicatorName}`][1]])
    return keyDictionary[`${attributeName}`][keyDictionary[`${indicatorName}`][1]]
}

const backtoDatabase = (value) => {
    return keyDictionary[`${value}`][0]
}

module.exports = {
    caseResolver,
    attributeIndicator,
    backtoDatabase
}

// var att = caseResolver("ID_Deployment")
// console.log(keyDictionary[att])
// console.log(backtoDatabase(att))

// console.log(attributeIndicator("kpi", att))
// console.log(attributeIndicator("kpi", att))
// console.log(attributeIndicator("kpi", att))
// console.log(attributeIndicator("kpi", att, 6))
//     // console.log(attributeIndicator("kci", att, 8))
// console.log(attributeIndicator("kpi", att, 0, true))
// console.log(attributeIndicator("kpi", att))
// console.log(attributeIndicator("kpi", att, 9))
// console.log(attributeIndicator("kpi", att))
// console.log(attributeIndicator("kpi", att))