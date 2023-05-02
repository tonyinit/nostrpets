<template>
  <q-layout>

    <!-- start mobile layout -->
    <MobileToolbar v-if="$q.platform.is.mobile" />
    <q-page-container v-if="$q.platform.is.mobile" class="page-container">
      <q-page class="column items-center">
        <div class="q-px-xl q-pt-lg q-pb-sm text-h3 text-weight-medium text-center">Decentralized Virtual Pets</div>
        <div class="q-px-xl text-h6 text-weight-regular text-grey-7 text-center">Eating and playing on the Nostr protocol</div>
        <div class="mobile_nostrich">
          <img class="mobile_nostrich_spritesheet pixelart" :src="nostrich"/>
        </div>
        <q-btn class="q-mx-lg" color="primary" size="lg" label="Get Started" no-caps @click="goTo('create')" />
      </q-page>
    </q-page-container>
    <!-- end mobile layout -->
    
    <!-- start desktop layout -->
    <q-page-container v-if="!$q.platform.is.mobile" class="page-container">
      <q-page class="q-pt-md q-px-xl column">
        <Toolbar />
        <div class="row">
          <div class="fill-height column q-pt-xl" style="max-width: 50%; min-height: 70vh">
            <div class="text-h1 text-weight-medium q-mt-xl q-pb-lg">Decentralized Virtual Pets</div>
            <div class="text-h5 text-weight-regular text-grey-7 q-pb-lg">Eating and playing on the Nostr protocol</div>
            <div class="">
              <q-btn class="q-px-lg" color="primary" size="lg" label="Learn more" no-caps />
              <q-btn class="q-ml-lg q-px-lg" size="lg" color="black" label="Get a quick tour" icon="fa-solid fa-circle-play" no-caps flat />
            </div>
          </div>
          <div class="column" style="width: 50%;">
            <div class="nostrich">
              <img class="nostrich_spritesheet pixelart" :src="nostrich"/>
            </div>
          </div>
        </div>
        <div class="column" style="width: 45%">
          <div class="row">
            <div class="col q-pb-xl">
              <div class="row">
                <span class="text-h6 text-weight-bold">+500k</span>
              </div>
              <div class="row">
                <span class="text-body1 text-grey-7">NostrPets created</span>
              </div>
            </div>
            <div class="col">
              <div class="row">
                <span class="text-h6 text-weight-bold">+20k</span>
              </div>
              <div class="row">
                <span class="text-body1 text-grey-7">food sent</span>
              </div>
            </div>
            <div class="col">
              <div class="row">
                <span class="text-h6 text-weight-bold">+5k</span>
              </div>
              <div class="row">
                <span class="text-body1 text-grey-7">played with</span>
              </div>
            </div>
          </div>
        </div>
      </q-page>
    </q-page-container>
    <!-- end desktop layout -->

  </q-layout>
</template>

<script>
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import MobileToolbar from '../components/MobileToolbar.vue'
import Toolbar from '../components/Toolbar.vue'
import '../assets/style.scss'

export default {
  setup () {
    const $q = useQuasar()

    return {
      tab: ref('')
    }
  },
  name: "Home",
  props: [],
  components: {
    MobileToolbar,
    Toolbar
  },
  data() {
    return {
      nostrich: 'assets/spritesheet.png'
    }  
  },
  computed: {},
  watch: {},
  methods: {
    goTo(route) {
      this.$router.push(route);
    }
  },
  created() {},
  mounted() {
    // get a reference to the element
    const spritesheet = document.querySelector('.mobile_nostrich_spritesheet');

    // define a variable to keep track of whether the sprite is paused or not
    let paused = false;

    // set an interval to toggle the "paused" class every 3 seconds
    setInterval(() => {
      paused = !paused; // toggle the paused variable
      if (paused) {
        spritesheet.classList.add('paused');
      } else {
        spritesheet.classList.remove('paused');
      }
    }, 3000);
  },
};
</script>

<style scoped>
:deep(.q-tab__label) {
  font-size: 1.5em;
}
.fill-height {
  flex: 1;
}
</style>
