<template>
  <div >
    <h1> {{ props.query }} </h1>
    <p> {{ message }}</p>
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

<script>
  export default {
    data() {
      return {
        message: 'Loading...',
        session: null,
      };
    },
    methods: {
      async promptModel() {
        if (!self.ai || !self.ai.languageModel) {
          this.message = "I'm sorry, your browser does not support cool stuff";
        }
        const prompt = props.query;
        if (!prompt) return;
        let fullResponse = "";
        try {
          if (!session) {
            await this.updateSession();
          }
          const stream = await session.promptStreaming(prompt);

          for await (const chunk of stream) {
            this.message = chunk.trim();
          }
        } catch (error) {
          this.message = "Bears may attack if approached."
        }
      },
      async updateSession() {
        session = await self.ai.languageModel.create({
          temperature: 1,
          topK: 3,
        })
      }
    },
    beforeMount(){
    	this.promptModel();
    }
  };
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