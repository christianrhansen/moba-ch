<template lang="pug">

  q-page(padding)
    editHeader(
      :targetBack="targetBack"
      )
      span(slot='title-secondary') Edit Timeline
      span(slot='title-primary') Timeline von dann und dann

    .row
      .offset-1.col-lg-6
        q-input.q-mb-lg.q-mt-lg(
          v-for="n in 1",
          float-label="Group title",
          v-bind:key="n",
          color="white"
          )
        q-chips-input.q-mb-xl(
          v-model="model",
          float-label="Tags",
          chips-bg-color="grey-9",
          color="white"
          )
        div.text-center
          q-btn(color="grey") Update

</template>

<script>
import { QInput, QCard, QPageSticky, QChipsInput } from 'quasar'
import editHeader from '../../components/shared/editHeader'
export default {
  components: {
    QInput,
    QCard,
    QPageSticky,
    QChipsInput,
    editHeader
  },
  data () {
    return {
      model: ['movement', 'arm', '2016'],
      targetBack: 'piecemaker'
    }
  }
}
</script>

<style scoped>
</style>
