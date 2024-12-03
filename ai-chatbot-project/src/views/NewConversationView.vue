<template>
  <div >
    <h1> {{ props.query }} </h1>
    <div v-html="message"></div>
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
</script>

<script>
import { marked } from "https://cdn.jsdelivr.net/npm/marked@13.0.3/lib/marked.esm.js";
import DOMPurify from "https://cdn.jsdelivr.net/npm/dompurify@3.1.6/dist/purify.es.mjs";

export default {
  props: {
    query: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      message: "Loading...",
      session: null,
    };
  },
  methods: {
    async promptModel() {
      if (!self.ai || !self.ai.languageModel) {
        console.error("self.ai or languageModel is undefined");
        this.message = "I'm sorry, your browser does not support cool stuff.";
        return;
      }

      var prompt = this.query;
      if (!prompt) return;

      if (prompt.toLowerCase().includes("ignore") && prompt.toLowerCase().includes("previous")) {
        this.message = "Bad human";
        return;
      }
      // prompt = "Respond to the following user input in a concise and helpful way, as if you were chatting with them over text: " + prompt;
      prompt = "Respond to the following user input with helpful advice: " + prompt;

      let responseBuffer = ""; // Buffer to accumulate the full response
      //const uniqueChunks = new Set(); // Track unique chunks

      try {
        if (!this.session) {
          await this.updateSession();
        }

        const stream = await this.session.promptStreaming(prompt);
       

      for await (const chunk of stream) {
        var cleanChunk = chunk.trim(); // Remove leading/trailing whitespace
        this.message = DOMPurify.sanitize(marked.parse(cleanChunk.trim()));
      }
   
      } catch (error) {
        console.error("Error during promptModel:", error);
        this.message = "Bears may attack if approached.";
      }
    },
    async updateSession() {
      try {
        this.session = await self.ai.languageModel.create({
          temperature: 0.2, //decreased this
          topK: 20,
          maxTokens: 150,   // Added this to try to make the response shorter but the repetition problem persists
        });
      } catch (error) {
        console.error("Failed to create session:", error);
        this.message = "Session initialization failed.";
      }
    },
  },
  beforeMount() {
    this.promptModel().catch((error) => {
      console.error("Error during promptModel initialization:", error);
      this.message = "Initialization failed.";
    });
  },
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