const {getVector}= require("../controllers/getvector")
const {openai , index}= require('../../config/var')

exports.getresponse= async(req,res)=>{
    
    const {Question} = req.query;

    if(Question){
    //getting vector respose
    const vector = await getVector(Question);
    const results = await index.queryItems(vector, 5);
    console.log(results)

    // generating context for gpt
    let content_text = '';
    for (const result of results) {
        let content = result.item.metadata.text;
        console.log(`[${result.score}] ${result.item.metadata.text}`);
        content_text += `${content.trim()}`;
    }

    //implementing gpt-4 api

    const answer = await openai.createChatCompletion({
        model:"gpt-3.5-turbo",
        messages:[
            {"role": "system", "content": "you are Akshit's personal assistant .Answer the question like a personal assistant very strictly on the basis of content provided abd donot tell them that you are openai model "},
            {"role": "assistant", "content": `${content_text}`},
            {"role": "user", "content": `${Question}`},
        ]
    })

    res.send({ans:answer.data.choices[0].message.content})
    console.log("sent")
}
}