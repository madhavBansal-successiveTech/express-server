let printEquiTriangle=(noOfRows)=>{
    for(let i=1;i<=noOfRows;i++){
        let str='';
    for(let j=noOfRows;j>i;j--)
    str+=' ';
    
    for(let j=i;j>=1;j--)
    str+='* ';
    console.log(str);
    
    }
}
let printPattern=(noOfRows)=>{
    console.log(`Print an Equilateral Triangle with rows ${noOfRows}`);
    printEquiTriangle(noOfRows);
}
printPattern(13);