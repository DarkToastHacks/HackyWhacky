<script setup lang="ts">
import InputText from 'primevue/inputtext';
import {ref} from 'vue';
import { Button } from 'primevue';
import { useRouter } from 'vue-router';

const val = ref('');
const router = useRouter();
const goToNewConversation = () => {
  router.push({ name: 'chat', params: { query: val.value } });
};
const checkIfEnter = (e) => {
  if (e.keyCode === 13) {
    goToNewConversation();
  }
};
</script>

<template>
  <!-- <main> -->
    <div class="container" >
  <div class="landing-page">
    <div class="frosted-glass" style="margin-left: 200px;">
        <img src="../assets/chat_message.png" class="chatbot-window">

      </div> 
    <div class="content-section">
      <h1 style="font-size: 70px;">First Aid with AI</h1>
        <p class="description"> Introducing a web app that can answer your urgent questions with ease. Just ask our AI chatbot for tips and guidance. <br> (not professional medical advice though!)</p>
        <input type="text" v-model="val" class="input-field" placeholder="Start typing here..." v-on:keyup="checkIfEnter">
     
      <Button label="Let's go!" class="cute-button" @click="goToNewConversation"></Button>
  </div>

</div>
      <img src="../assets/Ambearlance.png"  class="image-left" />
     
</div>
  <!-- </main> -->
</template>

<style>
header {
  line-height: 1.5;
  max-height: 70vh;

}

p { font-size: smaller;}


 header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
 .container {
  display: flex;
  justify-content: space-between; /* Space between elements */
  align-items: center; /* Align items vertically */
  height: 100vh; /* Full height */
  padding: 0 2rem; /* Add space to the sides */
  overflow-y: auto;
  font-family: 'Inter', sans-serif;
}

.text-content {
  max-width: 50%; /* Prevent it from stretching too much */
}

.image {
  max-width: 40%; /* Adjust image size */

}

.frosted-glass {
  width: 300px;
  height: 300px;
  top: -20px; /* Move it slightly above */
  left: 20px; /* Move it slightly to the right */
  background: rgba(255, 255, 255, 0.2); /* Light white background */
  backdrop-filter: blur(20px); /* Apply a blur effect */
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Optional: adds a subtle shadow effect */
  color: rgba(0, 0, 0, 0.8); /* Text color */
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.2); /* Optional: adds a border with the same color as the background */
 
}
.chatbot-window {
  width: 300px;
  height: 300px;
}

/* Mobile-specific styling */
@media (max-width: 768px) {  /* 768px is a common breakpoint for tablets and mobile */
    .frosted-glass {
        width:100px; /* Adjust the width to 90% of the parent container */
        height: 100px; /* Let the height adjust automatically */
        padding: 10px; /* Adjust padding for smaller screens */
        top: 0px; /* Move it slightly above */
        left: 0px; /* Move it slightly to the right */
    }
    .chatbot-window {
  width: 100px;
  height: 100px;
}
}
.image-container {
    position: relative; /* Ensure the frosted-glass div is positioned relative to this container */
}
body, html {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  /* font-family: Arial, sans-serif; */
  box-sizing: border-box;
  font-family: 'Inter', 'Helvetica', 'Arial', sans-serif;
  margin: 0;
  color: #333;
  line-height: 1.5;
}

/* Landing Page Layout */
.landing-page {
  display: flex;
  width: 100%;
  height: 100%;
}

.content-section {
    flex: 1; /* Keeps it flexible within its parent container */
    display: flex;
    flex-direction: column;
    justify-content: flex-start; /* Align items towards the top */
    align-items: flex-end; /* Align items to the right-hand side */
    padding: 5% 10%; /* Add spacing for aesthetics */
}


.image-left {
  position: absolute;
  left: 0;         /* Position the image on the left edge */
  top: 55%;        /* Center the image vertically on the page */
  transform: translateY(-50%);  /* Adjust for the exact center vertically */
  width: 40%;        /* Image will take up 20% of the width */
  height: auto;      /* Maintain the aspect ratio */
  margin-right:10px;
}

/* Right Image Section */
.image-section {
  flex: 0; /* Takes up the right half of the page */

  display: flex;
  justify-content: center;
  align-items: center;
}

.landing-image {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Ensures the image fills the section neatly */
}

/* Powered by Text */
.powered-by {
  font-size: 14px;
  color: #6c757d;
  text-transform: uppercase;
  font-weight: bold;
  margin-bottom: 20px;
}

/* Main Heading */
h1 {
  font-size: 48px;
  color: #212529;
  margin: 0 0 20px 0;
  font-weight: bold;
}

/* Description Text */
.description {
  font-size: 14px;
  color: #6c757d;
  margin-bottom: 50px;
  max-width: 400px; /* Keeps text centered and neat */
}

.cute-button {
  background: linear-gradient(to right, #8be2ff, #dff6fa, #f8e27e) !important;
  color: rgb(13, 126, 192) !important;
  padding: 12px 24px !important;
  border-radius: 30px !important;
  font-size: 16px !important;
  font-weight: bold !important;
  text-transform: lowercase !important;
  border: none !important;
  cursor: pointer !important;
  transition: all 0.3s ease-in-out !important;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1) !important;
}

.cute-button:hover {
  background: linear-gradient(to right, #dff6fa, #8be2ff, #f8e27e) !important;
  transform: translateY(-4px) !important;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.2) !important;
}

.cute-button:focus {
  outline: none !important;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2) !important;
}
/* Discord Icon Inside Button */
.icon {
  width: 24px;
  height: 24px;
}
.input-field {
    width: 100%; /* Full width */
    max-width: 600px; /* Restrict the max-width */
    padding: 12px 16px; /* Padding for comfortable input */
    border: 0px ; /* Semi-transparent white border */
    border-radius: 25px; /* Rounded corners */
    background-color: rgba(255, 255, 255, 0.1); /* Semi-transparent background */
    color: #fff; /* White text color for contrast */
    font-size: 16px; /* Comfortable font size */
    font-family: 'Arial', sans-serif; /* Common font */
    outline: none; /* Remove default outline */
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1); /* Soft shadow effect */
    backdrop-filter: blur(10px); /* Apply blur effect to background */
    transition: all 0.3s ease; /* Smooth transition on focus */
    margin: 5px;
}

/* Focus state with a stronger frosted effect */
.input-field:focus {
    border-color: rgba(74, 144, 226, 0.7); /* Blue border on focus */
    background-color: rgba(255, 255, 255, 0.2); /* Slightly darker frosted effect */
    box-shadow: 0 0 8px rgba(74, 144, 226, 0.4); /* Soft blue glow */
}

/* Placeholder text styling */
.input-field::placeholder {
    color: #ccc; /* Light gray placeholder text */
    opacity: 1; /* Ensure placeholder text remains visible */
}
</style>
