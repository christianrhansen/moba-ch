<template lang="pug">

  q-page

    q-modal.text-white(
      v-model="opened",
      position="top"
      )
      .q-pa-lg(style="background-color: #252324;")
        back-button.rotate-90
        span.font-size-13.text-grey-8 07:32:934
        div.border-top

        q-input.font-size-13.q-mb-lg(
          hide-underline,
          dark
          )

        .row.border-top.q-pt-sm
          .col-6
            q-btn(@click="opened = !opened") abort
          .col-6.text-right
            q-btn(@click="opened = !opened") send


    q-page-sticky(
      v-if="$q.platform.is.desktop",
      position="top",
      :offset="[0, 20]"
      )
      q-input.bg-white.q-pa-xs(
        color="black"
        )


    q-page-sticky(
      v-if="$q.platform.is.desktop",
      position="bottom",
      :offset="[0, 50]"
      )
      q-list.no-padding.no-border
        q-item.bg-black.text-white.q-pa-xs.bg-white.font-size-13.q-px-sm.width-300 Lorem ipsum dolor sit amet, consectetur adipisicing elit.


    q-page-sticky(
      v-if="$q.platform.is.desktop",
      position="top-left",
      :offset="[10, 10]"
      )
      q-btn(
        @click="$router.push('/piecemaker/videos')",
        icon="keyboard_backspace",
        round,
        color="grey",
        inverted,
        size="md",
        dense)


    div(v-if="$q.platform.is.desktop")
      iframe(
        style="width: 100%; height: calc(100vh - 50px);",
        src="https://www.youtube.com/embed/032fDHswgSE?rel=0",
        frameborder="0",
        allow="autoplay; encrypted-media"
        )


    div(v-if="$q.platform.is.mobile")
      div.q-px-md
        .row.flex-center
          .col-6.text-white
            q-btn.full-width.q-py-sm(
              @click="$router.push('/piecemaker/videos')",
              icon="keyboard_backspace",
              inverted,
              size="md",
              flat,
              align="left",
              dense
              )

          .col-6.text-white
            q-btn.full-width.q-py-sm(
              @click="opened = true",
              inverted,
              flat,
              align="right",
              dense
              )
              | add annotation
              q-icon.q-ml-sm(
                name="add",
                size="md"
                )

      div.shadow-10(style="z-index: 100; position: relative;")
        iframe(
          style="width: 100%; height: 56vw",
          src="https://www.youtube.com/embed/032fDHswgSE?rel=0",
          frameborder="0",
          allow="autoplay; encrypted-media"
          )

      q-scroll-area(style="height: 53vh; z-index: 10; position: relative;")
        annotation-list

</template>

<script>
import {
  Platform,
  QPage,
  QInput,
  QList,
  QItem,
  QItemTile,
  QBtn,
  QScrollArea,
  QModal
} from 'quasar'
import { annotationList } from '../../components/piecemaker/'
import backButton from '../../components/shared/backButton'

export default {
  components: {
    QPage,
    QInput,
    QList,
    QItem,
    QItemTile,
    QBtn,
    QScrollArea,
    QModal,
    annotationList,
    backButton
  },
  data () {
    return {
      opened: false
    }
  },
  name: "annotate.vue"
}
</script>

<style scoped>
</style>
