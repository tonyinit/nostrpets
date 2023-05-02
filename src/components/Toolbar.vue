<template>
  <q-toolbar class="q-px-none">
    <q-img :src="imageSrc" style="width: 20px;" />
    <div v-if="$q.screen.gt.sm"
      class="toolbar-white-plain q-mr-xl q-gutter-md text-body2 text-weight-light row items-center no-wrap">
      <q-item-label class="text-h6 text-weight-light q-ml-lg">NostrPets</q-item-label>
    </div>

    <q-btn label="Community" class="text-weight-light" no-caps flat>
      <q-icon class="q-ml-xs q-mt-xs" name="fa-solid fa-angle-down" size="12px"></q-icon>
      <q-menu fit>
        <q-item dense clickable>
          <q-item-section>Nostr</q-item-section>
        </q-item>
        <q-item dense clickable>
          <q-item-section disabled>YouTube</q-item-section>
        </q-item>
      </q-menu>
    </q-btn>

    <q-btn label="Merch" class="text-weight-light" no-caps flat>
      <q-icon class="q-ml-xs q-mt-xs" name="fa-solid fa-angle-down" size="12px"></q-icon>
      <q-menu fit>
        <q-item dense clickable>
          <q-item-section disabled>Merch Shop</q-item-section>
        </q-item>
        <q-item dense clickable>
          <q-item-section disabled>Merch Partners</q-item-section>
        </q-item>
      </q-menu>
    </q-btn>

    <q-space />
    <q-btn label="Contact" class="text-weight-light" no-caps flat />
    <q-btn label="Support" class="text-weight-light" no-caps flat />
    <q-btn class="q-ml-lg q-px-lg" size="md" color="primary" label="Get Started" @click="navigateTo('create')" />
  </q-toolbar>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'Toolbar',
  setup () {
    return {
      imageSrc: '/assets/nostrichlogo.png'
    };
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    }
  },
  async mounted(){},
}
</script>