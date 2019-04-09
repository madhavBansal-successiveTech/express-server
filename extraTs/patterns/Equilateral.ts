import  Pattern from './daimond'
export default class PrintPattern extends Pattern {
    constructor() {
        super();
    }
   public printEquiTriangle = (noOfRows: number):void => {
        console.log(`Print an Equilateral Triangle with rows ${noOfRows}`);
        this.printFirstHalfPattern(noOfRows);

    }
}