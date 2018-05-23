<template lang="pug">

  q-page(padding)

    .row.text-grey-3

      .col-1
        backButton(
          :target="targetBack"
          )

      .offset-1.col-lg-8
        q-input.q-pl-lg.q-py-xl(
          @keyup.enter="handlerAddAnnotation()",
          v-model="newAnnotation.text",
          float-label="Live-Annotation: Press Enter two times for a new entry",
          color="white",
          dark, autofocus
          )

        q-list.no-padding(no-border)
          q-item.q-py-lg.items-start.moba-border-top(
            v-for="annotation in annotations",
            :key="annotation.id"
            )
            q-item-side.font-size-13 {{ annotation.timestamp }}
            q-item-main.font-size-13 {{ annotation.text }}
            q-item-side.font-size-13
              a(
                @click="handlerRemoveAnnotation()"
                ) delete

    // q-page-sticky(position="top")
      q-input(
        float-label="Press Enter two times for a new entry",
        color="white",
        dark
        )

    // q-page-sticky(position="top-left", :offset="[10, 10]")
      q-btn(
        @click="$router.push('/piecemaker/videos')",
        icon="keyboard_backspace",
        round,
        color="grey",
        inverted,
        size="md",
        dense)


</template>

<script>
import {
  Platform,
  QPage,
  QInput,
  QList,
  QItem,
  QItemSide,
  QItemMain,
  QBtn,
  QPageSticky
} from 'quasar'
import { backButton } from '../../components/shared'

export default {
  components: {
    QPage,
    QInput,
    QList,
    QItem,
    QItemSide,
    QItemMain,
    QBtn,
    backButton,
    QPageSticky
  },
  methods: {
    handlerAddAnnotation () {
      let currentTime = new Date()
      let _this = this

      _this.countEnter++

      if (_this.countEnter == 2) {
        _this.countEnter = 0

        _this.newAnnotation.timestamp = currentTime
        _this.annotations.push(_this.newAnnotation)
        _this.newAnnotation = {
          id: '',
          text: '',
          timestamp: ''
        }
      }
      // console.log(_this.countEnter)
      _this.sortAnnotations()
    },
    handlerRemoveAnnotation () {
      console.log('click')
    },
    sortAnnotations () {
      this.annotations.sort(function(a, b) {
        var valA = a.timestamp
        var valB = b.timestamp
        if (valA > valB) {
          return -1
        }
        if (valA < valB) {
          return 1
        }
      })
      return 0
    }
  },
  data () {
    return {
      countEnter: 0,
      newAnnotation: '',
      targetBack: 'piecemaker',
      newAnnotation: {
        id: '',
        text: '',
        timestamp: ''
      },
      annotations: []
    }
  },
  name: "annotate.vue"
}
</script>

<style scoped>

</style>
