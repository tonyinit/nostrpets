<template>
    <q-toolbar class="q-pa-lg text-primary">
      <q-btn flat round dense icon="fa-solid fa-bars" />
      <q-toolbar-title>
        NostrPets
      </q-toolbar-title>
      <u @click="goTo('login')">Login</u>
    </q-toolbar>
  </template>
  
  <script>
  import { ref } from 'vue'
  
  export default {
    name: 'MobileToolbar',
    setup () {
      return {
        imageSrc: '/assets/nostrichlogo.png'
      };
    },
    methods: {
      goTo(route) {
        this.$router.push(route);
      }
    },
    async mounted(){},
  }
  </script>