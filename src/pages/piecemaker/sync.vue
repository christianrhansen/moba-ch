<template lang="pug">

  q-page(padding)
    // q-page-sticky(position="top-left", :offset="[12, 8]")
      q-btn(@click="$router.push('/piecemaker/')", icon="keyboard_backspace", round, color="black", size="md", dense)

    .row.text-grey-3.q-mb-xl
      .col-1
        backButton(
          :target="targetBack"
          )
      .col-11.row.q-pl-lg(style="border-left: 1px solid white;")
        .col-9
          h5.no-margin
            span.text-grey-8 Video synchronisation:
            br
            | Modern class Codarts 2017

    div(style="border: 0px solid red;")
      // h4.no-margin.text-grey-3.q-pb-md(style="border-bottom: 1px solid black;")
        q-btn(
          @click="$router.push('/piecemaker/videos/')",
          icon="keyboard_backspace",
          round, outline, dense,
          color="grey-3",
          size="md"
          )
        span &nbsp;&nbsp;Video Sync
      .row.gutter-x-md
        .q-pb-lg.q-mt-lg.col-sm-12.col-lg-6.text-grey-3
          .font-size-13 Video to be synchronized:
            p(style="min-height: 2.5rem;") Modern class Codarts 2017
          iframe(
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/rCCHpbJ_IUc?rel=0"
            frameborder="0"
            allow="autoplay; encrypted-media"
            allowfullscreen
            style="background-color: white;"
            )
          div.text-center.q-mt-sm
            q-btn(color="grey-9", size="sm") Set marker



        .q-pb-lg.q-mt-lg.col-sm-12.col-lg-6

          .row.text-grey-3
            .font-size-13.col-8 Synchronize with:
              p(style="min-height: 2.5rem;") Modern class Codarts 2017 anderer Blickwinkel

            .col-4.text-right
              q-btn-dropdown.text-black.col-4(label="select", color="white", inline)
                q-list.no-padding(separator, link)
                  q-item Video aus der Gruppe, Codarts 2017 anderer Blickwinkel v2
                  q-item noch ein Video

          iframe(
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/rCCHpbJ_IUc?rel=0"
            frameborder="0"
            allow="autoplay; encrypted-media"
            allowfullscreen
            style="background-color: white;"
            )
          div.text-center.q-mt-sm
            q-btn(color="grey-9", size="sm") Set marker

      div.text-center
        q-btn(color="grey-9") Apply synchronization

</template>

<script>
import { QInput, QCard, QCardMedia, QBtnDropdown, QList, QItem } from 'quasar'
import backButton from '../../components/shared/backButton'
export default {
  components: {
    QInput,
    QCard,
    QCardMedia,
    QBtnDropdown,
    QList,
    QItem,
    backButton
  },
  data () {
    return {
      targetBack: 'piecemaker/videos'
    }
  }
}
</script>

<style scoped>
</style>
