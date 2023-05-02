<template>
  <q-layout>
    <q-page-container>
      <q-page v-if="this.npub" class="column">

        <!-- start nostrpet indicators -->
        <q-linear-progress size="25px" :value="eatEvents.length/3" color="#460C77">
          <div class="absolute-full flex flex-center">
            <q-badge color="transparent" text-color="accent" label="😋" style="font-size: 24px" />
          </div>
        </q-linear-progress>
        <q-linear-progress class="q-mt-sm" size="25px" :value="playEvents.length/3" color="#460C77">
          <div class="absolute-full flex flex-center">
            <q-badge color="transparent" text-color="accent" label="😄" style="font-size: 24px" />
          </div>
        </q-linear-progress>
        <!-- end nostrpet indicators -->

        <!-- start nostrpet information -->
        <div class="q-pt-sm">
          <div>Name: {{ '???' }}</div>
          <div>Type: {{ '???' }}</div>
          <div>Age: {{ '???' }}</div>
        </div>
        <!-- end nostrpet information -->

        <!-- start nostrpet display -->
        <div class="mobile_nostrich">
          <img class="mobile_nostrich_spritesheet pixelart" :src="img"/>
        </div>
        <!-- end nostrpet display -->

        <!-- start game buttons -->
        <div class="row justify-between q-pa-xl">
          <q-btn round color="accent" size="xl" icon="fa-solid fa-utensils" @click="eatsDialog=true" />
          <q-btn round color="accent" size="xl" icon="fa-solid fa-table-tennis-paddle-ball" @click="gleeDialog=true" />
          <q-btn round color="accent" size="xl" icon="fa-solid fa-history" @click="historyDialog=true" />
        </div>
        <!-- end game buttons -->

        <!-- start tooltips -->
        <div v-if="healthTooltip">
          <q-tooltip v-model="healthTooltip" class="bg-accent">{{ healthMessage }}</q-tooltip>
        </div>
        <div v-if="activityTooltip">
          <q-tooltip v-model="activityTooltip" class="bg-accent">you and your pet {{ activity }}!</q-tooltip>
        </div>
        <div v-if="feedTooltip">
          <q-tooltip v-model="feedTooltip" class="bg-accent">you fed your pet some {{ food }}!</q-tooltip>
        </div>
        <div v-if="otherTooltip">
          <q-tooltip v-model="otherTooltip" class="bg-accent">{{ message }}!</q-tooltip>
        </div>
        <!-- end tooltips -->

        <!-- start dialogs -->
        <q-dialog v-model="eatsDialog">
          <q-card class="column full-width" style="width: 300px">
            <q-card-section class="row q-py-lg q-px-lg justify-between">
              <q-btn round class="option" style="font-size: 40px; min-width: 2em; min-height: 2em" @click="feed('🥬');eatsDialog=false;food='leafy greens';displayFeedTooltip();">🥬</q-btn>
              <q-btn round class="option" style="font-size: 40px; min-width: 2em; min-height: 2em" @click="feed('🍇');eatsDialog=false;food='grapes';displayFeedTooltip();">🍇</q-btn>
              <q-btn round class="option" style="font-size: 40px; min-width: 2em; min-height: 2em" @click="feed('🦗');eatsDialog=false;food='crickets';displayFeedTooltip();">🦗</q-btn>
            </q-card-section>
          </q-card>
        </q-dialog>

        <q-dialog v-model="gleeDialog">
          <q-card class="column full-width" style="width: 300px">
            <q-card-section class="row q-py-lg q-px-lg justify-between">
              <q-btn round class="option" style="font-size: 40px; min-width: 2em; min-height: 2em" @click="play('🎳');gleeDialog=false;activity='went bowling';displayActivityTooltip();">🎳</q-btn>
              <q-btn round class="option" style="font-size: 40px; min-width: 2em; min-height: 2em" @click="play('🎮');gleeDialog=false;activity='played video games';displayActivityTooltip();">🎮</q-btn>
              <q-btn round class="option" style="font-size: 40px; min-width: 2em; min-height: 2em" @click="play('🛹');gleeDialog=false;activity='went skateboarding';displayActivityTooltip();">🛹</q-btn>
            </q-card-section>
          </q-card>
        </q-dialog>

        <q-dialog v-model="historyDialog">
          <q-card class="column full-width" style="width: 300px">
            <q-card-section class="row q-py-lg q-px-lg justify-between">
              <q-timeline color="secondary">

                <!-- <q-timeline-entry
                  subtitle="1682430028"
                  body="ate some crickets"
                  icon="🦗"
                /> -->

              </q-timeline>
            </q-card-section>
          </q-card>
        </q-dialog>
        <!-- end dialogs -->
        
      </q-page>
    </q-page-container>
  </q-layout>
</template>
  
<script>
import {
  relayInit,
  getEventHash,
  signEvent,
  validateEvent
} from 'nostr-tools'
import '../assets/style.scss'

export default {
  setup() {
    return {
      egg: 'assets/egg-spritesheet.png',
      nostrich: 'assets/spritesheet.png',
      img: '',
      genesisId: '',
    }
  },
  name: "Dash",
  props: [],
  components: {},
  data() {
    return {
      relay: 'wss://relay.damus.io', //wss://nos.lol
      key: 0,
      npub: '',
      birth: '',
      hatch: '',
      hatched: false,
      eatsDialog: false,
      gleeDialog: false,
      historyDialog: false,
      healthTooltip: false,
      healthMessage: '',
      activityTooltip: false,
      activity: '',
      feedTooltip: false,
      food: '',
      otherTooltip: false,
      message: '',
      eatEvents: [],
      playEvents: [],
    };
  },
  computed: {},
  watch: {},
  methods: {

    async play(activity) {
      if(!this.hatched) {
        return;
      }
      const relay = relayInit(this.relay);
      await relay.connect();
      let event = {
        kind: 9133,
        pubkey: this.publicKey,
        created_at: Math.floor(Date.now() / 1000),
        tags: [],
        content: activity
      }
      event.id = getEventHash(event)
      event.sig = signEvent(event, this.privateKey)
      
      let pub = relay.publish(event)
      pub.on('ok', () => {
        // console.log(`${relay.url} has accepted our event`)
        relay.close();
      })
      pub.on('failed', reason => {
        // console.log(`failed to publish to ${relay.url}: ${reason}`)
        relay.close();
      })
    },

    async feed(food) {
      if(!this.hatched) {
        return;
      }
      const relay = relayInit(this.relay);
      await relay.connect();
      let event = {
        kind: 3475,
        pubkey: this.publicKey,
        created_at: Math.floor(Date.now() / 1000),
        tags: [],
        content: food
      }
      event.id = getEventHash(event);
      event.sig = signEvent(event, this.privateKey);

      let pub = relay.publish(event);
      pub.on('ok', () => {
        // console.log(`${relay.url} has accepted our event`)
        relay.close();
      })
      pub.on('failed', reason => {
        // console.log(`failed to publish to ${relay.url}: ${reason}`)
        relay.close();
      })
    },

    forceRerender() {
      this.key++;
    },

    async getEvents() {
      if(!this.hatched) {
        this.findGenesisEvent();
      } else {
        this.glee = 0;
        this.eats = 0;
        const relay = relayInit(this.relay);
        await relay.connect()
        let sub = relay.sub([
          {
            kinds: [9133, 3475],
            authors: [this.publicKey],
            since: Math.floor((new Date() - 24 * 60 * 60 * 1000) / 1000),
            limit: 100,
          }
        ]);
        relay.on('connect', () => {
          // console.log(`connected to ${relay.url}`)
        })
        sub.on('event', async event => {
          switch (event.kind) {
            case 9133:
              if(!this.playEvents.includes(event.id)) {
                this.playEvents.push(event.id)
              }
              break;
            case 3475:
              if(!this.eatEvents.includes(event.id)) {
                this.eatEvents.push(event.id)
              }
              break;
            default:
              break;
          }
        });
        this.checkMeters();
      }
    },

    async findGenesisEvent() {
      const relay = relayInit(this.relay);
      await relay.connect()
      let sub = relay.sub([
        {
          kinds: [5663],
          authors: [this.publicKey],
          limit: 1,
        }
      ]);

      sub.on('event', async event => {
        relay.close();
        if(this.validateGenesis(event)) {
          this.getLifeStage(event.created_at);
        }
      });
    },

    async validateGenesis(event) {
      if (event.content === '🥚') {
        return true;
      }
      return false;
    },

    async getLifeStage(unixTimestamp) {
      this.birth = unixTimestamp;
      this.hatch = this.birth + 1 * 60;
      const currentTime = Math.floor(Date.now() / 1000);
      if(this.hatch > currentTime) {
        this.img = this.egg;
        this.message = "this egg seems like it will hatch soon.."
        this.otherTooltip = true;
        setTimeout(() => {
          this.otherTooltip = false;
        }, 5000); 
      } else {
        this.hatched = true;
        this.img = this.nostrich;
        this.getEvents();
      }
      this.forceRerender();
    },

    checkMeters() {
      setTimeout(() => {
        if(this.eatEvents.length < 2) {
          this.healthMessage = 'your pet is getting hungry!';
          this.healthTooltip = true;
          setTimeout(() => {
            this.healthTooltip = false;
          }, 3000);
        }
        if(this.playEvents.length < 2) {
          this.healthMessage = 'your pet is getting bored!';
          this.healthTooltip = true;
          setTimeout(() => {
            this.healthTooltip = false;
          }, 3000);
        }
      }, 5000);
    },

    displayFeedTooltip() {
      if(this.hatched) {
        this.feedTooltip = true;
        setTimeout(() => {
          this.feedTooltip = false;
        }, 5000); 
      } else {
        this.message = "eggs don't eat food!"
        this.otherTooltip = true;
        setTimeout(() => {
          this.otherTooltip = false;
        }, 5000); 
      }
    },
    
    displayActivityTooltip() {
      if(this.hatched) {
        this.activityTooltip = true;
        setTimeout(() => {
          this.activityTooltip = false;
        }, 3000);
      } else {
        this.message = "eggs don't play games!"
        this.otherTooltip = true;
        setTimeout(() => {
          this.otherTooltip = false;
        }, 3000); 
      }
    }
  },
  created() {
    setInterval(this.getEvents, 60000);
  },
  async mounted() {
    // retrieve keys from localStorage and parse as object
    const storedKeys = JSON.parse(localStorage.getItem("keys"));

    // access npub property of storedKeys object
    this.npub = storedKeys.npub || '';
    
    if(this.npub) {
      this.publicKey = storedKeys.publicKey || '';
      this.privateKey = storedKeys.privateKey || '';
      this.findGenesisEvent();
      this.getEvents();
    }
  }
};
</script>
  
<style scoped>
.option { 
  min-height: 2em;
  min-width: 2em;
  font-size: 40px;
}
</style>
  