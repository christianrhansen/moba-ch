<template lang="pug">

  q-page.flex.flex-center(padding)
    q-page-sticky(position="top-left", :offset="[12, 8]")
      q-btn(@click="$router.push('/mosys/')", icon="keyboard_backspace", round, color="black", size="md", dense)
    q-card.col-xs-12.col-sm-10.col-md-8.q-pa-xl(color="grey-10")
      h4.no-margin Create New Grid
      q-input(float-label="Add grid title")
      div.text-center.q-mt-xl
        q-btn(color="grey") Create
        // q-btn(color="grey") Abort
</template>

<script>
import { QInput, QCard } from 'quasar'
export default {
  components: {
    QInput,
    QCard
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>
</style>
