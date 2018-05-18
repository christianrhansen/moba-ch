<template lang="pug">

  q-list(no-border)
    q-item(v-for="n in 20" :key="n", separator)
      q-item-main
        q-item-tile.row
          .col-6.text-grey-8.cursor-pointer.font-size-13 zeit {{ n }}
          .col-6.text-right
            a.text-grey-8.cursor-pointer.font-size-13 save
            a.text-grey-8.cursor-pointer.font-size-13.q-ml-sm delete
            // q-btn(size=".5rem", round, icon="done", color="grey", inverted)
            // q-btn(size=".5rem", round, icon="clear", color="grey", inverted)

        q-item-tile
          q-input.text-white.q-body-1.font-size-13(v-model="text", hide-underline, color="grey-6")
            | Lorem ipsum dolor sit amet, conse ctetur adipisicing elit.amet, con sectetur adipisicing elit.

</template>

<script>
import { QList, QItem, QItemMain, QItemTile, QInput} from 'quasar'
export default {
  components: {
    QList,
    QItem,
    QItemMain,
    QItemTile,
    QInput
  },
  data () {
    return {
      text: true
    }
  }
  // name: "annotation-list"
}
</script>

<style scoped>

</style>
