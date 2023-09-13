const {openai}= require('../../config/var')

exports.getVector=async (text)=>{
    const response = await openai.createEmbedding({
        'model': 'text-embedding-ada-002',
        'input': text,
    });
    return response.data.data[0].embedding;
}