<script setup lang="ts">
import { ofetch } from "ofetch"; 
import { ref, onMounted, watch } from 'vue';
import { ThingApi } from "base-api";

const TOKEN = "AUTH_TOKEN";

const baseURL = "http://localhost:3000";

const page = ref(0);

const things = ref([]);

const thingApi = new ThingApi({ 
  baseURL,
  async onRequest({ request, options }) {
    options.headers.set('Authorization', `Bearer ${TOKEN}`)
  }
});

const fetchThings = async () => {
  things.value = [];
  
  const ret = await thingApi.getThings(page.value);
  console.log("fetched using ofetch", { ret });

  things.value = ret.things;
}

onMounted(fetchThings);
watch(page, fetchThings);

</script>

<template>
  <h1>a vue app</h1>

  <h3>
    <a
      @click="fetchThings"
      href="#"
    >
      [fetch again]
    </a>
  </h3>

  <h3>
    page {{ page }}
    <a
      @click="page--"
      href="#"
    >
      [prev]
    </a>
    <a
      @click="page++"
      href="#"
    >
      [next]
    </a>
  </h3>

  <h3>things</h3>
  <ul>
    <li v-for="thing, i of things">{{ thing.name }}</li>
  </ul>
</template>
