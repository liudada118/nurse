export function TimeMin(num) {
    var hour = parseInt(num / 60)
    var min = num % 60
    return [hour, min]
}

export function computeMin(num) {
    var hour = parseInt(num / 60)
    var min = num % 60
    // return hour > 0 ? `${hour}h${min}min` : `${min}min`
    return hour > 0 ? [hour, min] : min
}


export function toString(str){
    return str.split(' ')[1]
}