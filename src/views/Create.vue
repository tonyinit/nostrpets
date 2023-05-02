<template>
    <q-layout>
      <q-page-container class="page-container">
        <q-page class="column">
          <q-carousel
            v-model="slide"
            transition-prev="scale"
            transition-next="scale"
            swipeable
            animated
            control-color="white"
            navigation
            arrows
            :height="windowHeight"
            class="bg-primary text-white shadow-1 rounded-borders"
          >
            <q-carousel-slide name="pet" class="column no-wrap">
              <span class="q-pa-lg text-h2 text-weight-bold text-center">choose a little friend</span>
              <q-select
              class="q-pa-lg custom-select"
              dark
              color="white"
              filled
              v-model="pet"
              :options="options"
              popup-content-class="text-h3"
              />
              <div class="mobile_nostrich" style="background-color: white">
                <img class="mobile_nostrich_spritesheet pixelart" :src="nostrich"/>
              </div>
            </q-carousel-slide>

            <q-carousel-slide name="name" class="column no-wrap">
              <span class="q-pa-lg text-h2 text-weight-bold text-center">give your friend a name</span>
              <q-input dark outlined v-model="name" class="q-px-xl custom-select full-width">
                <template v-slot:prepend>
                  <q-icon name="fa-solid fa-file-signature" />
                </template>
              </q-input>
              <div class="mobile_nostrich" style="background-color: white">
                <img class="mobile_nostrich_spritesheet pixelart" :src="nostrich"/>
              </div>
            </q-carousel-slide>

            <q-carousel-slide name="keys" class="column no-wrap text-center items-center">
              <span class="q-pa-lg text-h2 text-weight-bold">generate some keys</span>
              <span class="q-pa-lg text-h6 text-weight-light">don't lose these, we can't help you</span>

              <q-input dark outlined v-model="publicKey" label="public" class="q-px-xl q-pb-lg full-width">
                <template v-slot:prepend>
                  <q-icon name="fa-solid fa-lock" />
                </template>
              </q-input>
              <q-input dark outlined v-model="privateKey" label="private" class="q-px-xl full-width">
                <template v-slot:prepend>
                  <q-icon name="fa-solid fa-key" />
                </template>
              </q-input>
              <q-btn color="white" text-color="accent" class="q-mt-lg" @click="createInitEvent()">CREATE</q-btn>
            </q-carousel-slide>
          </q-carousel>
        </q-page>
      </q-page-container>
    </q-layout>
  </template>
  
  <script>
  import { ref } from 'vue'
  import Toolbar from '../components/Toolbar.vue'
  import {
    relayInit,
    generatePrivateKey,
    getPublicKey,
    getEventHash,
    signEvent,
    nip19
  } from 'nostr-tools'
  import '../assets/style.scss'
  
  export default {
    setup () {
      return {
        slide: ref('pet'),
        lorem: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum, error dignissimos praesentium libero ab nemo.',
        tab: ref(''),
        pet: 'nostrich',
        options: ['nostrich'],
        name: '',
        publicKey: '',
        privateKey: ''
      }
    },
    name: "Create",
    props: [],
    components: {
      Toolbar
    },
    data() {
      return {
        nostrich: 'assets/spritesheet.png'
      };
    },
    computed: {},
    watch: {},
    methods: {
      goTo(route) {
        this.$router.push(route);
      },
      async createInitEvent() {
        // const relay = relayInit('wss://nos.lol')
        const relay = relayInit('wss://relay.damus.io');
        await relay.connect();
        let event = {
          kind: 5663,
          pubkey: this.publicKey,
          created_at: Math.floor(Date.now() / 1000),
          tags: [],
          content: '🥚'
        }
        console.log(event)
        event.id = getEventHash(event)
        event.sig = signEvent(event, this.privateKey)

        let pub = relay.publish(event)
        pub.on('ok', () => {
          console.log(`${relay.url} has accepted our event`);
          this.$router.push({ path: '/dash' });
        })
        pub.on('failed', reason => {
          console.log(`failed to publish to ${relay.url}: ${reason}`)
        })
      },
    },
    created() {
        this.windowHeight = window.innerHeight + 'px'
        this.privateKey = generatePrivateKey();
        this.publicKey = getPublicKey(this.privateKey);
        const keys = { privateKey: this.privateKey, publicKey: this.publicKey, npub: nip19.npubEncode(this.publicKey) };
        localStorage.setItem("keys", JSON.stringify(keys));
    },
    mounted() {

    },
  };
  </script>
  
  <style scoped>
  :deep(.q-tab__label) {
    font-size: 1.5em;
  }
  .custom-select {
    font-size: 40px;
    font-weight: 300 !important;
  }
</style>
  