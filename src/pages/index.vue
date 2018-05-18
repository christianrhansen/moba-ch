<template lang="pug">

  q-page.flex.flex-center
    div
      q-btn.text-white.q-mx-xs.q-pa-lg(
        @click="$router.push('/mosys/')"
        ) Mosys

      q-btn.text-white.q-mx-xs.q-pa-lg(
        @click="$router.push('/piecemaker/')"
        ) Piecemaker

</template>

<style>
</style>

<script>
import { QBtn } from 'quasar'
export default {
  components: {
    QBtn
  },
  name: 'PageIndex'
}
</script>
