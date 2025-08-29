<template>
  <div>
    <h1>things</h1>
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

    <!-- <pre>{{ things }}</pre> -->
  </div>
</template>

<script
  setup
  lang="ts"
>
import { ThingApi } from "base-api"

const TOKEN = "AUTH_TOKEN";

const baseURL = ""; // if in nuxt we can do this
// const baseURL = "http://localhost:3000"; // outside of nuxt 

const page = ref(0);

const thingApi = new ThingApi({
  baseURL,
  async onRequest({ request, options }) {
    options.headers.set('Authorization', `Bearer ${TOKEN}`)
  }
});

const fetchThings = async () => {
  things.value = [];

  const ret = await thingApi.getThings(page.value);
  console.log("fetched using thingApi", { });

  things.value = ret.things;
}

// this await on the api makes the page suspendable and renders server side, with potentially a loop-back api call
const init = await thingApi.getThings(page.value);
const things = ref(init.things);

// then render client side after hydration
watch(page, fetchThings);

</script>