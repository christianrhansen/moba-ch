<template lang="pug">

  q-page.row(padding)
    .col-xs-12.col-md-9.col-lg-6
      h4.no-margin.text-grey-3.q-pb-md(style="border-bottom: 1px solid black;")
        q-btn(
        @click="$router.push('/piecemaker/')",
        icon="keyboard_backspace",
        round, outline, dense,
        color="grey-3",
        size="md"
        )
        span &nbsp;&nbsp;Create New Timeline

      .row
        q-input.text-white.q-my-xl.col-12(
          float-label="New timeline title",
          type="textarea"
          )
        .col-xs-12.col-sm-auto
          q-btn.full-width(
            color="grey-9",
            icon="check",
            label="Create",
            rounded
            )

  // q-page.flex.flex-center(padding)
    q-page-sticky(position="top-left", :offset="[12, 8]")
      q-btn(@click="$router.push('/piecemaker/')", icon="keyboard_backspace", round, color="black", size="md", dense)
    q-card.col-xs-12.col-sm-10.col-md-8.q-pa-xl(color="grey-10")
      h4.no-margin Create New Group
      q-input(float-label="New group title")
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
