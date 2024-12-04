<template>
    <header class="header2">
    <h2 class="title"> Learn about us! </h2>
    <br>
    <p class="text"> Aidin is a first aid AI-powered chat bot designed to provide accessible emergency counseling to all users. <br> Created by three medical students and two software engineers, this web app aims to make first aid fun and easy to follow. From bee stings to asthma attacks, searching up what to do in crisis can be scary and time consuming. Our goal is to streamline the process and make it digestible with a little Google magic. This app is not professional medical advice, rather intended as a first aid interactive guide with references from reputable sources such as the American Red Cross and more.
 <br> Made by the following: </p>
<!-- Cardstock List  -->
<ul class="cardstock-list">

    <li class="cardstock">
      <Card class="text">
        <template #title>Brandon Dalla Rosa</template>
        <template #content>
            <p class="m-0">
              Howdy! I'm Brandon, a software engineer who spends way too much time screaming at karaoke.
            </p>
            <img src="../assets/portraitAidinBrandon.png" alt="image" class="card__img" style="height: 300px; width: 300px;">
        </template>
    </Card>
    </li>
    <li class="cardstock">
      <Card class="text">
        <template #title>Maggie Zawoy</template>
        <template #content>
            <p class="m-0">
              Hey my name is Maggie and I like to draw, play musical instruments, and ride my bike without my helmet at exhilerating speeds.
            </p>
            <img src="../assets/portraitAidinMaggie.png" alt="image" class="card__img" style="height: 300px; width: 300px;">
        </template>
    </Card>
    </li>
    <li class="cardstock">
      <Card class="text">
        <template #title>Chance Fleeting</template>
        <template #content>
            <p class="m-0">
              Hi, I'm Chance! I'm in the graduate years of my MD-PhD training and have far too many musical instruments.
            </p>
            <img src="../assets/portraitAidinChance.png" alt="image" class="card__img" style="height: 300px; width: 300px;">
        </template>
    </Card>
    </li>
    <li class="cardstock">
      <Card class="text">
        <template #title>Sally Lu</template>
        <template #content>
            <p class="m-0">
              Hi my name is Sally and I'm a medical student who enjoys graphic design and web developement. I'm also obsessed with my cat Juniper!
            </p>
            <img src="../assets/portraitAidinSally.png" alt="image" class="card__img" style="height: 300px; width: 300px;">
        </template>
    </Card>
    </li>
    <li class="cardstock">
      <Card class="text">
        <template #title>Reem Larabi</template>
        <template #content>
            <p class="m-0">
              My name is Reem and I'm a software engineer who loves fashion and travelling! I'm also TikTok famous ;3
            </p>
            <img src="../assets/portraitAidinReem.png" alt="image" class="card__img" style="height: 300px; width: 300px;">
        </template>
    </Card>
    </li>
 </ul>
</header>

</template>

<script setup>
import Card from 'primevue/card';

</script>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Inter', 'Helvetica', 'Arial', sans-serif;
}

.header2 {
    max-width: 1500px;
    margin: 0 auto;
    max-height: 400vh;
    overflow-y: auto;
}

.header2 :where(.title, .subtitle) {
    font-weight: 500;
    line-height: 3.6rem;
}

.header2 .title {
    font-size: 4.0rem;
    width: fit-content;
    background-clip: text;
    background: linear-gradient(to right, #60c8eb, #29a2b8, #e0c33e);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.header2 {
    margin-top: 10vh;
    padding: 1rem;
    /* display: none; */
}

.cardstock-list {
    margin-top: 9.5vh;
    list-style: none;
    display: flex;
    gap: 1.25rem;
    overflow-x: auto;
    scrollbar-width: none;
}

.cardstock-list .cardstock {
    background: var(--secondary-color);
    padding: 1.25rem;
    cursor: pointer;
    width: 400px;
    min-height: 500px;
    flex-shrink: 0;
    border-radius: 0.75rem;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between ;

}
.cardstock-list .cardstock:hover {
    background: var(--secondary-hover-color)
}
.cardstock-list .cardstock .text {
    font-weight: 400;
}

.text {
    color: var(--text-color);
}

/* #8be2ff, #dff6fa, #f8e27e */
/* .container{
  display:flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
*/
</style>
