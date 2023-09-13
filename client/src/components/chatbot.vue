<template>
  <div id="icon" style="cursor:help; width: 3%;height: 3%;position: fixed;bottom:8%;right:2%;">
    <img v-if="close" src="../assets/47815604.jpg" style=" border-radius: 100%; width: 100%;" @click="closed">
    <img v-else src="../assets/hyphen.jpg" style=" border-radius: 100%; width: 100%;" @click="helper">

    <div v-if="close ===false"><chatpannel /></div>
    <div class="suggest hide"></div>
  </div>
</template>

<script>
import chatpannel from "./icons/chatpannel.vue";
export default {
    name: 'ChatBot' ,   
    data(){
        return{
            close:true,
            i:0,
            txt: 'Hey! Just a Remider, I can help you :)',
            timer:''
        }
    },
    mounted:function(){
      this.helper()
    },
    components:{
      chatpannel,
    },
    methods:{

      helper(){
        this.close=true
        
        let suggest=document.querySelector('.suggest')
              
        const typeWriter=()=>{
            suggest.classList.remove('hide')
            if (this.i < this.txt.length) {
              suggest.innerHTML += this.txt[this.i];
              this.i++;
              this.timer=setTimeout(typeWriter, 80);
            }else{
              this.timer=setTimeout(()=>{
                suggest.classList.add('hide')
                this.i=0
                suggest.innerHTML=''
                setTimeout(typeWriter, (Math.floor(Math.random() * (120 - 45 + 1) + 45))*1000);
              },10000)
            
          }
        }
        setTimeout(typeWriter,25000)

    },

    closed(){
      this.close=false
      let suggest=document.querySelector('.suggest')
      clearTimeout(this.timer)
      this.i=0
      suggest.innerHTML=''
      suggest.classList.add('hide')

    }
  }
}
</script>

<style>

.suggest{
  position : fixed;
  bottom:11% ; 
  right: 5%;;
  background-color: #03a9f4;
  color: #ffffff;
  width: 14%;
  height: 11%;
  padding: 1%;
  border-top-left-radius: 150px;
  border-top-right-radius: 150px;
  border-bottom-right-radius: -200px;
  border-bottom-left-radius: 150px;
  overflow-wrap: break-word;
}

.hide{
  display: none;
}
</style>