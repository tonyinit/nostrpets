<template>
  <q-layout>
    <q-page-container>
      <q-page class="bg-primary row justify-center items-center">
        <div class="column items-center">
            <h5 class="text-h5 text-white q-my-md" @click="goTo('/')">NostrPets</h5>
            <q-card square class="q-pa-xl shadow-1 justify-center items-center">

              <!-- begin login form -->
              <q-form class="q-px-sm">
                <q-input outlined v-model="publicKey" label="public" class="q-pb-sm">
                  <template v-slot:prepend>
                    <q-icon name="fa-solid fa-lock" />
                  </template>
                </q-input>
                <span>or</span>
                <q-input outlined v-model="privateKey" label="private" class="q-pt-sm q-pb-sm">
                  <template v-slot:prepend>
                    <q-icon name="fa-solid fa-key" />
                  </template>
                </q-input>
              </q-form>
              <!-- end login form -->

              <q-card-actions class="q-px-md">
                <q-btn unelevated color="primary" size="lg" class="full-width" label="Login" @click="login" />
              </q-card-actions>

              <!-- don't have a nostrpet? create one -->
              <q-card-section class="text-center q-pa-none">
                <p class="text-grey-6 q-pt-sm">don't have a little friend? <u class="cursor-pointer" @click="goTo('/create')">create one</u></p>
              </q-card-section>

            </q-card>
          </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
  
<script>
import {
  relayInit,
  generatePrivateKey,
  getPublicKey,
  getEventHash,
  signEvent,
  nip19
} from 'nostr-tools'

export default {
  name: "Login",
  props: [],
  components: {
  },
  data() {
    return {
      publicKey: '',
      privateKey: '',
    };
  },
  computed: {},
  watch: {
    privateKey(value) {
      try {
        this.publicKey = getPublicKey(value);
        if(this.publicKey) {
          const keys = { privateKey: this.privateKey, publicKey: this.publicKey, npub: nip19.npubEncode(this.publicKey) };
          localStorage.setItem("keys", JSON.stringify(keys));
          this.goTo('/dash');
        }
      } catch (error) {
        // console.log(error);
      }
    }
  },
  methods: {
    goTo(route) {
      this.$router.push(route);
    },
    login() {
      // still need to
      // validate login inputs
      // must have public key (minimum)
      // if private key is entered, public key should be calculated and input automatically
      if(this.publicKey) {
        const keys = { publicKey: this.publicKey, npub: nip19.npubEncode(this.publicKey) };
        localStorage.setItem("keys", JSON.stringify(keys));
        this.goTo('/dash');
      }
    }
  },
  created() {},
  mounted() {},
};
</script>

<style scoped>
</style>
