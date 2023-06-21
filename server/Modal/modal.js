const pdfparse = require("pdf-parse");
const {ChromaClient , OpenAIEmbeddingFunction} = require('chromadb');
const fs = require('fs')
require('dotenv').config()


let dataBuffer = fs.readFileSync('../Resume/RESUME.pdf');

console.log(dataBuffer)
pdfparse(dataBuffer).then(function(result){

    console.log(result.text)
    let file =result.text
    file=file.replaceAll('\n',"").replaceAll('  ','')
    console.log(file)
    const resume = file.split('. ');

    const client = new ChromaClient()

    const embedder = new OpenAIEmbeddingFunction("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")
    //client.reset()
    const embed = async ()=>{

    const collection =await client.getCollection("resume", embedder);

    for(let i =0 ; i < resume.length; i++){
        await collection.add(
            [`id${i}`],
            undefined,
            undefined,
            [resume[i]],
        ) 
    }
    // for(i =resume.length/2 ; i < resume.length; i++){
    //     await collection.add(
    //         [`id${i}`],
    //         undefined,
    //         undefined,
    //         [resume[i]],
    //     ) 
    // }
    console.log("collection created")
    }

    embed()
});



