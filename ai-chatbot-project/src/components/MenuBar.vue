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
        <Button label="Disagree" icon="pi pi-times" @click="closeDialog" />
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
      openDialog("User Agreement", " User Agreement content");
    },
    },
    {
        label: 'Disclaimer',
        icon: 'pi pi-envelope',
        command: () => {
      openDialog("Disclaimer", "Disclaimer content");
    },
    },
    {
        label: 'Learn More',
        icon: 'pi pi-desktop',
        command: () => {
            router.push('/learn-more');
        }
    }
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