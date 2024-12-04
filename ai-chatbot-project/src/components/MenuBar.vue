<template>
    <div class="card" style="border-radius: 50px;">
        <Menubar :model="items" style="border-radius: 50px;"/>
        <Button icon="pi pi-moon" text raised rounded @click="toggleDarkMode()" style="position:fixed; top: 10px; right: 10px;" />
     </div>

     <div v-if="dialogVisible" class="dialog-overlay">
      <div class="dialog-content">
        <h2>{{ dialogTitle }}</h2>
        <p>{{ dialogMessage }}</p>
        <Button label="Accept" icon="pi pi-check" @click="closeDialog" />
      </div>
    </div>
</template>
<script setup>
import {ref} from "vue";
import { Menubar } from "primevue";
import Button from 'primevue/button';
import { useRouter } from 'vue-router';

const router = useRouter();

// State for controlling dialog visibility and content
const dialogVisible = ref(false);
const dialogTitle = ref("");
const dialogMessage = ref("");

function toggleDarkMode() {
    document.documentElement.classList.toggle('my-app-dark');
}

const items = ref([
    {
        label: 'Home',
        icon: 'pi pi-home',
        command: () => {
            router.push('/');
        }
    },
    { 
        label: 'About Us',
        icon: 'pi pi-users',
        command: () => {
            router.push('/about');
        }
    },
    {
        label: 'User Agreement',
        icon: 'pi pi-building-columns',
        command: () => {
      openDialog("User Agreement", "I hereby agree to the rules and conditions set forth by this web application; notably that this is not professional medical advice and I am following the instructions of this web app on my own accord with baseline understanding of the risks involved should the information be incorrect. I still wish to proceed and use this application for first-aid response purposes but know that any injury resulting from inaccuracies is subject to my own responsibility.");
    },
    },
    {
        label: 'Disclaimer',
        icon: 'pi pi-envelope',
        command: () => {
      openDialog("Disclaimer", "This website is provided as a proof of concept for an experimental AI tool only and is not intended to constitute medical advice or the provision of professional healthcare services. The information presented here should not be used for diagnosing or treating any health condition or disease and the information presented may not be accurate. For personal medical advice, diagnosis, or treatment, please consult a licensed physician or qualified healthcare provider. Always seek the guidance of your healthcare professional with any questions you may have regarding a medical condition. Never disregard or delay seeking professional medical advice because of information you have read on this website. If you believe you are experiencing a medical emergency, please call 911 or go to the nearest emergency department immediately. Use of this website does not establish a physician-patient relationship. Neither the creators of this website nor its contributors make any representations or warranties, express or implied, regarding the accuracy, completeness, or applicability of the information provided.");
    },
    },
    // {
    //     label: 'Learn More',
    //     icon: 'pi pi-desktop',
    //     command: () => {
    //         router.push('/learn-more');
    //     }
    // }
])

// Open dialog with title and message
const openDialog = (title, message) => {
  dialogTitle.value = title;
  dialogMessage.value = message;
  dialogVisible.value = true;
};

// Close dialog
const closeDialog = () => {
  dialogVisible.value = false;
};
</script>

<style>
.card {
    width: 70%;
    margin: 20px auto;
    border-radius: 15px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}
button {
  margin: 10px;
}

/* Dialog overlay */
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index:4;
}

.dialog-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
  width: 60%;
  text-align: center;
}
</style>