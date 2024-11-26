<script setup>
import { RouterLink, RouterView } from 'vue-router'
import MenuBar from './components/MenuBar.vue';

</script>

<template>
  <header> <MenuBar/></header>
  <RouterView />

</template>
<style >

 header {
  line-height: 1.5;
  max-height: 100vh;
}

.p-menubar .p-component .p-menubar-mobile {
  border-radius:  50px !important;
}

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

body, html {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  /* background: linear-gradient(to right, #add8e6, #dff6fa, #fffacd);
  background-size: 300% 300%; 
  animation: gradientAnimation 10s ease infinite; */
  background: radial-gradient(circle, #8be2ff, #dff6fa, #f8e27e, #ffccd3);
  background-size: 200% 200%;
  animation: auraAnimation 3s infinite ease-in-out;
  box-sizing: border-box;
  font-family: 'Inter', 'Helvetica', 'Arial', sans-serif;
  margin: 0;
  color: #333;
  line-height: 1.5;
  
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

@keyframes gradientAnimation {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}

/* Landing Page Layout */
.landing-page {
  display: flex;
  width: 100%;
  height: 100%;
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
  font-size: 18px;
  color: #6c757d;
  margin-bottom: 40px;
  max-width: 500px; /* Keeps text centered and neat */
}


/* Discord Icon Inside Button */
.icon {
  width: 24px;
  height: 24px;
}

</style>



  <!-- <header>
    <div> 
      
<Button label="Toggle Dark Mode" @click="toggleDarkMode()" /> -->

    <!-- <InputText v-model:model-value="text" />
    {{ text }} <Button> Hello </Button> -->
  <!-- </div>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header> -->

  <!-- <div class="bg-surface-0 dark:bg-surface-950 px-6 py-20 md:px-12 lg:px-20">
      <div class="text-surface-700 dark:text-surface-100 text-center">
          <div class="text-primary font-bold mb-4"><i class="pi pi-discord" />&nbsp;POWERED BY DISCORD</div>
          <div class="text-surface-900 dark:text-surface-0 font-bold text-5xl mb-4">Join Our Design Community</div>
          <div class="text-surface-700 dark:text-surface-100 text-2xl mb-8">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit numquam eligendi quos.</div>
          <Button label="Join Now" icon="pi pi-discord" raised rounded class="font-bold px-8 py-4 whitespace-nowrap" />
      </div>
  </div> -->
