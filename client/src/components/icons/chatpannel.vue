<template>
  <div style="width: 20%;height: 50%;position: fixed;bottom: 11%;right: 5%;">
    <img src="../../assets/47815604.jpg" style="border-radius: 100%; width: 18%;margin-left: -18%;transform: scaleX(-1);">
    <div id="bot" style="overflow: auto;height: 66%;background-color: rgba(0, 0, 0, 0.312);margin-top: -2%;border-top-left-radius:10px;border-top-right-radius: 10px;">
        <p class="botmessage">Hi there</p>
        <p class="botmessage">Ask me anything about Akshit I will be responding on his behalf</p>
    </div>
    <div class="footer">
        <input type="text" id="question" placeholder="Ask anything ..." @keyup.enter = "question">
        <button id="ask" @click="question">Ask</button>
    </div >
  </div>
</template>

<script>
import axios from "axios"
export default {
    name: "ChatPannel",
    data(){
        return{
            message: String,
        }
    },
    computed:{
        
    },
    methods:{
        question(){
            const usermessage =document.getElementById("question")
            const panel=document.getElementById('bot');
            const typing=document.createElement('p');
            typing.classList.add("typing");
            typing.innerText="typing"
            let typetxt="...";
            let k=0
                    function typer() {
                        if (k < typetxt.length) {
                            typing.innerHTML += typetxt.charAt(k);
                            k++;
                            setTimeout(typer, 500);
                        }else{
                            typing.innerText="typing"
                            k=0;
                            setTimeout(typer, 500);
                            

                        }
                    }
            this.message = usermessage.value ;
            usermessage.value=''
            if(this.message){
                const usermess=document.createElement('p');
                usermess.classList.add("usermessage");
                usermess.innerText=this.message;
                panel.appendChild(usermess);
                panel.scrollTop=panel.scrollHeight;
                setTimeout(()=>{
                    typer()
                    panel.appendChild(typing)
                    panel.scrollTop=panel.scrollHeight;
                },500)
                
                axios.get(
                    "http://localhost:8000/api/getresponse",{
                    params:{
                        Question : this.message
                    }
                }).then((response)=>{
                    // console.log(response);
                    const botmess=document.createElement('p');
                    botmess.classList.add("botmessage");
                    
                    let txt = response.data.ans
                    let i=0
                    function typeWriter() {
                        if (i < txt.length) {
                            botmess.innerHTML += txt.charAt(i);
                            i++;
                            panel.scrollTop=panel.scrollHeight;
                            setTimeout(typeWriter, 20);
                        }
                    }
                    panel.removeChild(typing)
                    panel.appendChild(botmess);
                    typeWriter()
                    
                })
            }
            
            
        }
    }

}
</script>

<style>

.botmessage{
    background-color:#03a9f4;
    color: #ffffff;
    width:fit-content;
    border-radius: 7px;
    margin:2% 2%;
    font-size: 95%;
    padding: 1%; 
}

.usermessage{
    background-color:#ededed;
    width: fit-content;
    border-radius: 7px;
    margin-left: auto;
    margin-right: 2%;
    color: black;
    margin-top:2%;
    font-size: 95%;
    padding: 1%;
}

.typing{
    background-color:#03a9f4;
    color: #ffffff;
    width:fit-content;
    border-radius: 7px;
    margin:2% 2%;
    font-size: 95%;
    padding: 1%;
}
.footer {
    display: flex;
    height: 12%;
}
.footer  input{
    margin-top:2%;
    width: 80%;
    height: 100%;
    border: none;
    outline: none;
    border-bottom-left-radius: 10px;
    padding-left: 5%;
    
}
.footer  button{
    margin-top:2%;
    height: 100%;
    background-color: #03a9f4;
    color: #ffffff;
    border: none;
    outline: none;
    width: 20%;
    border-bottom-right-radius: 10px;
}
::-webkit-scrollbar {
  width: 3px;
}
::-webkit-scrollbar-thumb {
  color: #03a8f4c9;
  border-radius: 5px;
  border: 3px solid;
  background-clip: content-box;
}
</style>