export default class Pattern {
    constructor() { }
   protected printFirstHalfPattern = (noOfRows: number):void => {
        for (let i: number = 1; i <= noOfRows; i++) {
            let str: string = '';
            for (let j: number = noOfRows; j > i; j--)
                str += ' ';

            for (let j: number = i; j >= 1; j--)
                str += '* ';
            console.log(str);

        }
    }
    private printSecondHalfPattern = (noOfRows: number):void => {
        for (let i: number = noOfRows; i >= 1; i--) {
            let str: string = '';
            for (let j: number = noOfRows; j > i; j--)
                str += ' ';

            for (let j: number = i; j >= 1; j--)
                str += '* ';
            console.log(str);

        }
    }
    public printPattern = (noOfRows: number):void => {
        console.log(`Print a Daimond with rows ${noOfRows}`);
        this.printFirstHalfPattern(noOfRows);
        this.printSecondHalfPattern(noOfRows);
    }
}
