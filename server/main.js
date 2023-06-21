const {ChromaClient , OpenAIEmbeddingFunction} = require('chromadb');
const {Configuration , OpenAIApi} = require("openai");
require('dotenv').config()


//making connection with chromadb
const client = new ChromaClient()
//embedder using OpenAI
const embedder = new OpenAIEmbeddingFunction(process.env.API_KEY)

const embed = async ()=>{


    const Question = 'Introduce him to me';

    //getting vector respose
    const collection =await client.getCollection("resume", embedder);
    const results = await collection.query(
        undefined,
        3,
        undefined,
        [`${Question}`],
    ) 
    console.log(results)

    // generating context for gpt
    const context = results.documents[0]
    let content_text = '';
    for(let i =0 ; i<context.length ; i++){
        let content = context[i];
        content_text += `${content.trim()}`;

    }

    // //implementing gpt-4 api
    const configuration = new Configuration({
        apiKey: "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",
    });
    const openai = new OpenAIApi(configuration);

    const answer = await openai.createChatCompletion({
        model:"gpt-3.5-turbo",
        messages:[
            {"role": "system", "content": "you are Akshit's personal assistant .Answer the question like a personal assistant strictly on the basis of content provided "},
            {"role": "assistant", "content": `${content_text}`},
            {"role": "user", "content": `${Question}`},
        ]
    })

    console.log(answer.data.choices[0].message.content)
    

}

embed()


