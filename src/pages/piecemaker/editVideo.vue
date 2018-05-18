<template lang="pug">

  q-page(padding)

    .row.text-grey-3
      .col-1
        backButton(
          :target="targetBack"
          )
      .col-9.offset-1.row.q-pl-lg.q-mb-xl(style="border-left: 1px solid white;")
        .col-9
          h5.no-margin
            span.text-grey-8 Edit video information:
            br
            | Codarts 2018, Workshop 27.02.2018, Camera front

        // h5.col-9.no-margin
          | Edit video information:


        //q-list.col-6.q-pt-xl(no-border, separator)
      q-list.offset-2.col-xs-10.col-sm-6(no-border)
        // iframe.shadow-10(
          height="315",
          src="https://www.youtube.com/embed/_9a0kvOhnNg?rel=0",
          frameborder="0",
          allow="autoplay; encrypted-media",
          allowfullscreen,
          style="max-width: 100%; width: 100%;"
          )

        q-item.no-padding(v-for="n in 3", :key="n")
          q-input.q-mb-lg.q-mt-lg.text-white.col-12(
          float-label="Video title",
          value="Codarts Session January 2018, Camera Front",
          color="white",
          dark
          )

        q-item.no-padding
          q-chips-input.q-mb-xl(
          v-model="tags",
          float-label="Tags",
          chips-bg-color="grey-9",
          color="white",
          add-icon="done",
          dark
          )
        // q-btn(color="black")
        q-btn
          q-icon.flip-horizontal.q-mr-sm(name="keyboard_backspace", )
          | Update

  // q-page.flex.flex-center(padding)
    q-page-sticky(position="top-left", :offset="[12, 8]")
      q-btn(@click="$router.push('/piecemaker/')", icon="keyboard_backspace", round, color="black", size="md", dense)
    q-card.col-xs-12.col-sm-10.col-md-10.col-lg-8.q-pa-xl(color="grey-10")
      h4.no-margin Edit group
      q-input.q-mb-lg.q-mt-lg(
        v-for="n in 1",
        float-label="Group title",
        key="n",
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
import { QInput, QCard, QPageSticky, QChipsInput, QList, QItem } from 'quasar'
import backButton from '../../components/shared/backButton'
export default {
  components: {
    QInput,
    QCard,
    QPageSticky,
    QChipsInput,
    QList,
    QItem,
    backButton
  },
  data () {
    return {
      targetBack: 'piecemaker/videos',
      tags: ['modern jazz', 'codarts', 'workshop 2018', 'ben']
    }
  }
}
</script>

<style scoped>
</style>
