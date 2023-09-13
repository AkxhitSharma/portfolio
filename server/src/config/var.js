const {LocalIndex} = require('vectra');
const {Configuration , OpenAIApi} = require("openai");
const path=require('path')

const configuration = new Configuration({
    apiKey: "//api key",
});
const openai = new OpenAIApi(configuration);

const index = new LocalIndex(path.join(__dirname, '../vectra', 'index'));

(async()=>{if (!await index.isIndexCreated()) {
    await index.createIndex();
}})();

module.exports={
    openai:openai,
    index : index,
    PORT: 8000
}
