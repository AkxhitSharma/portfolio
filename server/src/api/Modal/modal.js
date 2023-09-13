const pdfparse = require("pdf-parse");
const {ChromaClient , OpenAIEmbeddingFunction} = require('chromadb');
const fs = require('fs')
require('dotenv').config()
const {TransformersEmbeddingFunction} = require('chromadb');

let dataBuffer = fs.readFileSync('E:/Portfolio/server/Resume/Akshit.pdf');

console.log(dataBuffer)
pdfparse(dataBuffer).then(function(result){

    console.log(result.text)
    let file =result.text
    file=file.replaceAll('\n',"").replaceAll('  ','')
    console.log(file)
    const resume = file.split('. ');

    const client = new ChromaClient()
    // const embedder = new TransformersEmbeddingFunction();
    const embedder = new OpenAIEmbeddingFunction("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")
    // client.reset()
    const embed = async ()=>{

    const collection =await client.createCollection("about", embedder);

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



