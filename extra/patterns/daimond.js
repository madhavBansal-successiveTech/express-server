export let printFirstHalfPattern = (noOfRows) => {
    for (let i = 1; i <= noOfRows; i++) {
        let str = '';
        for (let j = noOfRows; j > i; j--)
            str += ' ';

        for (let j = i; j >= 1; j--)
            str += '* ';
        console.log(str);

    }
}
let printSecondHalfPattern = (noOfRows) => {
    for (let i = noOfRows; i >= 1; i--) {
        let str = '';
        for (let j = noOfRows; j > i; j--)
            str += ' ';

        for (let j = i; j >= 1; j--)
            str += '* ';
        console.log(str);

    }
}
export default function printPattern(noOfRows){
    console.log(`Print a Daimond with rows ${noOfRows}`);
    printFirstHalfPattern(noOfRows);
    printSecondHalfPattern(noOfRows);
}
//  module.exports.EquiTri=printFirstHalfPattern
// printPattern(10);
