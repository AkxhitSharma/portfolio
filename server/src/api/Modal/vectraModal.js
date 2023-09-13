const pdfparse = require("pdf-parse");
const path=require('path')
const fs = require('fs')
const {getVector}= require("../controllers/getvector")
const {index}= require('../../config/var')

let dataBuffer = fs.readFileSync(path.join(__dirname, '../Resume/About.pdf'));
console.log(dataBuffer)
pdfparse(dataBuffer).then(function(result){

    console.log(result.text)
    let file =result.text
    file=file.replaceAll('\n',"").replaceAll('  ','')
    console.log(file)
    const resume = file.split('. ');
    let about=[];
    for (let i = 0; i < resume.length-1; i += 3) {
        about.push(resume.slice(i, i + 3));
    }

    for(let i=0 ; i<about.length;i++){
        setTimeout(async ()=>{
            for(let j =0 ; j<3;j++){
                let text = about[i][j];
                await index.insertItem({
                    vector: await getVector(text),
                    metadata: { text }
                });
            }
            console.log("in timer")
        },(about.length-i)*60000)
    }
    
 console.log('done')
});