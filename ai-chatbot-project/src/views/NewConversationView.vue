<template>
    <div >
      <h1> chat with google wahoo</h1>
      <p> {{  props.query }}</p>
    </div>
  </template>
  <script setup>
import { defineProps } from 'vue';
const props = defineProps({
  query: {
    type: String,
    required: false
  }
});

console.log(props.query)
</script>
  
  <style>
  @media (min-width: 1024px) {
    .body {
      min-height: 100vh;
      display: flex;
      align-items: center;
    }
  }
  </style>