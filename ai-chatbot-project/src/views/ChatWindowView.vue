<template>
<header class="header">
    <h2 class="title"> Hello, there </h2>
    <h4 class="subtitle"> Is everything okay? What's wrong?</h4>
<!-- Suggestion List  -->
<ul class="suggestion-list">
    <li class="suggestion">
        <h4 class="text">
        What should I do if a snake bites me?</h4>
        <span class="pi pi-pen-to-square"></span>
    </li>
    <li class="suggestion">
        <h4 class="text">
       What's the song that people sing to practice performing CPR?</h4>
       <span class="pi pi-heart"></span>
    </li>
    <li class="suggestion">
        <h4 class="text">
        What's the difference between urgent care and the emergency room?</h4>
        <span class="pi pi-question-circle"></span>
    </li>
    <li class="suggestion">
        <h4 class="text">
        What should I do to make my cold go away faster?</h4>
        <span class="pi pi-sparkles"></span>
    </li>
 </ul>
</header>

<!-- Chat List / Container -->
<div ref="chatList" class="chat-list" >
    <div v-for="(message, index) in messages" :key="index"> 
        <div v-if="index % 2 === 0 "class="message outgoing">
            <div class="message-content">
                <img src="../assets/DayBearsBabyBearTransparent.png" alt="User Image" class="avatar">
                <p class="text"> {{ message.text }} </p>
            </div>
        </div>
        <div v-else class="message incoming">
            <div v-if="!message.visible && updateTrigger >= 0" class="message incoming loading">
    <div class="message-content">
        <img src="../assets/temp.png" alt="Aidin Image" class="avatar">
        <p class="text"> Lorem ipsum, dolor sit amet etcccc. </p>
        <div class="loading-indicator">
            <div class="loading-bar"></div>
            <div class="loading-bar"></div>
            <div class="loading-bar"></div>
        </div>
    </div>
    <span class="pi pi-copy"></span>
</div> 

            <div v-else class="message-content">
                <img src="../assets/temp.png" alt="Aidin Image" class="avatar">
                <!-- <p class="text"> {{ message.text }}</p> -->
                <div v-html="message.text" class="text"></div>
            </div>
            <span @click="copyMessage(message.text)" class="pi pi-copy"></span>
        </div> 
    </div>
</div>

<!-- Typing area -->
<div class="typing-area">
    <form action="#" class="typing-form">
        <div class="input-wrapper">
            <input type="text" placeholder="Enter a prompt here" class="typing-input" required v-model="userMessage">
            <button class="pi pi-send" @click="handleSubmitMessage"></button>
        </div>
        <div class="action-buttons">
            <span @click="toggleTheme" class="pi pi-sun"></span>
            <span class="pi pi-trash"></span>
        </div>
    </form>
    <p class="disclaimer-text"> There is a possibility that the info might be wrong, so take the advice with a large grain of salt. Thanks!</p>
</div>

</template>
<script setup lang="ts">
// import { PrimeIcons } from '@primevue/core/api';
import {computed, onMounted, ref, watch, defineProps} from 'vue';
import { nextTick } from "vue";
import { marked } from "https://cdn.jsdelivr.net/npm/marked@13.0.3/lib/marked.esm.js";
import DOMPurify from "https://cdn.jsdelivr.net/npm/dompurify@3.1.6/dist/purify.es.mjs";
const updateTrigger = ref(0); // int to trigger updates

const props = withDefaults(
    defineProps<{
        query: string;
    }>(), {
        query: '',
    }
);

const userMessage = ref("");
const chatList =  ref<HTMLElement | null>(null);
const messages = ref<{text: string; visible: boolean}[]>([]);
let session = null;
var currentMessage = "";
const sendFirstQuery = ref<boolean>(false);

//light or dark mode
const isLight = ref(false);

const toggleTheme = () => {
    isLight.value = !isLight.value;
    document.body.classList.toggle("light_mode", isLight.value);
      // Save the current theme to localStorage
    if (isLight.value) {
        localStorage.setItem("theme", "light"); 
    } else {
        localStorage.setItem("theme", "dark"); 
    }
    
};

const handleSubmitMessage = () => {
    if (!userMessage.value.trim())  return;
        
    const message = {
        text: userMessage.value,
        visible: false,
      };
      messages.value.push(message); //user = even, ai = odd

    userMessage.value = "";
    
      addAiResponse(message.text);
    
};



const addAiResponse = async (text: string) => {
      await promptModel(text);
      const aiMessage = {
        text: currentMessage, 
        visible: false,
      };
      messages.value.push(aiMessage);
      currentMessage = "";

      setTimeout(() => {
        aiMessage.visible = true;
        updateTrigger.value++; // keep this increment to trigger reactivity
        }, 500);
    };


const copyMessage = async (text: string) => {
    try {
        await navigator.clipboard.writeText(text); // we copying
    } catch (err) {
        console.log("didnt work", err);
    }
}

const loadTheme = () => {
  if (localStorage.getItem("theme") === "light") {
    isLight.value = true;
    document.body.classList.add("light_mode");
    
  } else {
    isLight.value = false;
    document.body.classList.remove("light_mode");
   
  }
};

const scrollToBottom = () => {
  const chatContainer = chatList.value; 
  if (chatContainer) {
    chatContainer.scrollTop = chatContainer.scrollHeight; // Scroll to the bottom
  }
};

const promptModel = async (text: string) => {
    currentMessage = "Loading..."
      if (!self.ai || !self.ai.languageModel) {
        console.error("self.ai or languageModel is undefined");
        currentMessage = "I'm sorry, your browser does not support cool stuff.";
        return;
      }

      var prompt = text;
      if (!prompt) return;

      if (prompt.toLowerCase().includes("ignore") && prompt.toLowerCase().includes("previous")) {
        currentMessage = "Please do not abuse my helping features.";
        return;
      }
      prompt = "Respond to the following user input in a concise and helpful way, as if you were chatting with them over text: " + prompt + ". If the previous input does not include health or an injury, please inform the user that you are only designed to answer health questions.";
    //   prompt = "Respond to the following user input with helpful advice: " + prompt;

      let responseBuffer = ""; // Buffer to accumulate the full response
      //const uniqueChunks = new Set(); // Track unique chunks

      try {
        if (!session) {
          await updateSession();
        }

        const stream = await session.promptStreaming(prompt);
       

      for await (const chunk of stream) {
        var cleanChunk = chunk.trim(); // Remove leading/trailing whitespace
        currentMessage = DOMPurify.sanitize(marked.parse(cleanChunk.trim()));
      }
   
      } catch (error) {
        console.error("Error during promptModel:", error);
        currentMessage = "I'm sorry, I'm unable to help at the moment";
      }
    }

const updateSession = async () => {
      try {
        session = await self.ai.languageModel.create({
          temperature: 0.8, //decreased this
          topK: 20,
          maxTokens: 150,   // Added this to try to make the response shorter but the repetition problem persists
        });
      } catch (error) {
        console.error("Failed to create session:", error);
        currentMessage = "Session initialization failed.";
      }
    }

onMounted(() => {
  loadTheme();
  scrollToBottom();
  const message = {
        text: props.query,
        visible: true,
      };
  messages.value.push(message);
  addAiResponse(props.query);
});

watch(updateTrigger, (newVal) => {
    scrollToBottom(); 
});

</script>
<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Inter', 'Helvetica', 'Arial', sans-serif;
}

:root {
    /* Dark mode colors */
    --text-color: #e3E3E3;
    --subheading-color: #828282;
    --placeholder-color: #A6A6A6;
    --primary-color: #242424;
    --secondary-color: #383838;
    --secondary-hover-color: #444;
    --aura: radial-gradient(circle,#000000, #000000, #7f7f7f,  #ffffff);
}

.light_mode {
    --text-color: #222;
    --subheading-color: #A0A0A0;
    --placeholder-color: #6c6c6c;
    --primary-color: #fff;
    --secondary-color: #e9eef6;
    --secondary-hover-color: #dbe1ea;
    --aura: radial-gradient(circle, #8be2ff, #dff6fa, #f8e27e, #ffccd3);
}

body {
    background: var(--aura);
    background-size: 200% 200%;
    animation: auraAnimation 5s infinite ease-in-out;
}

@keyframes auraAnimation {
  0% {
    background-size: 100% 100%;
    background-position: 50% 50%;
  }
  50% {
    background-size: 200% 200%;
    background-position: 50% 50%;
  }
  100% {
    background-size: 100% 100%;
    background-position: 50% 50%;
  }
}


.header, .typing-area {
    color: var(--text-color);
}

/* need to use this for the front page lol */
.header, .chat-list .message, .typing-form {
    max-width: 1000px;
    margin: 0 auto;
    max-height: 100vh;
    overflow-y: auto;
}

.header {
    margin-top: 7vh;
    padding: 1rem;
    /* display: none; */
}

body.hide-header .header {
    display: none; 
    margin-top: 0;
}

.header :where(.title, .subtitle) {
    font-weight: 500;
    line-height: 3.6rem;
}

.header .title {
    font-size: 2.7rem;
    width: fit-content;
    background-clip: text;
    background: linear-gradient(to right, #8be2ff, #dff6fa, #f8e27e);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.header .subtitle {
    font-size: 2.4rem;
    color: var(--subheading-color);
}

.suggestion-list {
    margin-top: 9.5vh;
    list-style: none;
    display: flex;
    gap: 1.25rem;
    overflow-x: auto;
    scrollbar-width: none;
}

.suggestion-list .suggestion {
    background: var(--secondary-color);
    padding: 1.25rem;
    cursor: pointer;
    width: 230px;
    flex-shrink: 0;
    border-radius: 0.75rem;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between ;

}
.suggestion-list .suggestion:hover {
    background: var(--secondary-hover-color)
}
.suggestion-list .suggestion .text {
    font-weight: 400;
}

.suggestion-list .suggestion .pi {
    height: 42px;
    width: 42px;
    font-size: 1.3rem;
    margin-top: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: var(--primary-color);
}

.typing-area {
    position: fixed;
    width: 100%;
    bottom: 0;
    padding: 1rem;
    background: var(--primary-color)
}

.typing-area :where(.typing-form, .action-buttons) {
    display: flex;
    gap: 0.75rem;
}

.typing-area .input-wrapper {
    height: 56px;
    width: 100%;
    display: flex;
    position: relative;
}
.typing-area .typing-input {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    background: var(--secondary-color);
    border-radius: 6.2rem;
    padding: 1.1rem 4rem 1.1rem 1.5rem;
    font-size: 1rem;
}

.typing-area .typing-input::placeholder {
    color: var(--placeholder-color)
}

.typing-area .typing-input:focus {
    background: var(--secondary-hover-color);
}

.typing-area .pi {
    height: 56px;
    width: 56px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: var(--secondary-color);
}

.typing-area .pi:hover {
    background: var(--secondary-hover-color)!important;
}

.typing-area .input-wrapper .pi {
    position: absolute;
    right: -10px;
    top: -10px;
    outline: none;
    border: none;
    background: none;
    color: var(--text-color);
    transform: scale(0);
    transition: transform 0.2s ease;
}

.typing-area .input-wrapper .typing-input:valid ~ .pi {
    transform: scale(1);
}

.typing-area .disclaimer-text {
    font-size: 0.85rem;
    margin-top: 1rem;
    text-align: center;
    color: var(--placeholder-color);
}

/* Chat stuff here */
.chat-list {
    padding: 2rem 1rem 12rem;
    max-height: 100vh;
    overflow-y: auto;
    scrollbar-color: #999 transparent;
  
}
.chat-list .message.incoming 
{
    margin-top: 1.5rem;
}
.chat-list .message .message-content {
    display: flex;
    gap: 1.5rem;
    width: 100%;
    align-items: center;
}

.chat-list .message .text {
    color: var(--text-color);
}
.chat-list .message .pi {
    height: 35px;
    width: 35px;
    cursor: pointer;
    font-size: 1.25rem;
    margin-left: 3.5rem;
    background: var(--secondary-color);
    color: var(--text-color);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    visibility: hidden;
}

.chat-list .message:not(.loading):hover .pi {
    visibility: visible;
}

.chat-list .message .avatar {
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: 50%;
    align-self: flex-start;
}
.chat-list .loading-indicator {
    display: flex; 
    width: 100%;
    gap: 0.8rem;
    flex-direction: column;
}

.chat-list .loading-indicator .loading-bar {
    height: 11px;
    width: 100%;
    border-radius: 0.14rem;
    background: linear-gradient(to right, #8be2ff, #dff6fa, #f8e27e, var(--primary-color),#f8e27e,#dff6fa, #8be2ff);
    animation: animate 3s linear infinite;
}
.chat-list .loading-indicator .loading-bar:last-child {
    width: 70%;
}

@keyframes animate {
    0% {
        background-position: -800px 0;
    }
    100% { 
        background-position: 800px 0;
    }
}

.chat-list .message.loading .text {
    display: none;
}

.chat-list .message.loading .avatar {
    animation: rotate 3s linear infinite;
}
@keyframes rotate {
    100% {
        transform: rotate(360deg);
    }
}



/* #8be2ff, #dff6fa, #f8e27e */
</style>
 