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

<!-- Typing area -->
<div class="typing-area">
    <form action="#" class="typing-form">
        <div class="input-wrapper">
            <input type="text" placeholder="Enter a prompt here" class="typing-input" required>
            <button class="pi pi-send"></button>
        </div>
        <div class="action-buttons">
            <span class="pi pi-trash"></span>
        </div>
    </form>
    <p class="disclaimer-text"> There is a possibility that the info might be wrong, so take the advice with a large grain of salt. Thanks!</p>
</div>

</template>
<script>
import { PrimeIcons } from '@primevue/core/api';
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
}

body {
    background: var(--primary-color)
}

.header, .typing-area {
    color: var(--text-color);
}

/* need to use this for the front page lol */
.header, .typing-form {
    max-width: 1000px;
    margin: 0 auto;
}

.header {
    margin-top: 7vh;
    padding: 1rem;
}

.header :where(.title, .subtitle) {
    font-weight: 500;
    line-height: 3.6rem;
}

.header .title {
    font-size: 2.7rem;
    width: fit-content;
    background-clip: text;
    background: linear-gradient(to right, #4285f4, #d96570);
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

</style>