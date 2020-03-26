import numeral from 'numeral'

export function numeralTrans(money){
    let number = numeral(Number(money));
    numeral.defaultFormat('$0,0.00');
    return number.format();
}

export function pointTrans(point){
    return numeral(point).format('0,0');
}