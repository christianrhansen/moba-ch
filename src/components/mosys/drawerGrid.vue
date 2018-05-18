<template lang="pug">

  div
    q-tabs.q-py-md(
      color="transparent",
      position="top",
      )
      q-tab.q-px-lg(
        slot="title",
        v-for="tab in tabs",
        :key="tab.title",
        @click="clickTest()"
        )
        q-icon(
          v-if="tab.icon !== ''",
          :name="tab.icon",
          size="1.2rem"
          )
        div(v-else) {{ tab.title }}

    q-list.no-padding.q-ma-md.no-border(
      v-if="$q.platform.is.desktop"
      )
      div(
        v-for="item in items",
        draggable="true",
        @click="$emit('emittest', 'hallo')"
        )
        q-item.item.font-size-13.q-pb-lg
          q-item-side
            q-icon(
              :name="item.icon",
              size="1.2rem"
              )

          q-item-main
            q-item-tile
              q-input(
                :float-label="item.label",
                dark,
                color="white",
                value=""
                )

            q-item-tile.text-grey-6(v-if="item.sublabel !== ''")
              | {{item.sublabel}}

    q-tabs.q-my-md(
      v-else,
      color="transparent",
      position="top",
      )
      q-tab.q-px-md(
        slot="title",
        v-for="tab in items",
        :key="tab.label",
        :label="tab.label",
        @click="clickTest()"
        )
        // q-icon(
          v-if="tab.icon !== ''",
          // :name="tab.icon",
          size="1.2rem"
          )
        // | {{ tab.label }}

</template>

<script>
import { QBtn, QTabs, QTab, QList, QItem, QItemSide, QItemMain, QItemTile, QIcon, QInput } from 'quasar'
export default {
  components: {
    QBtn,
    QTabs,
    QTab,
    QList,
    QItem,
    QItemSide,
    QItemMain,
    QItemTile,
    QIcon,
    QInput
  },
  data () {
    return {
      tabs: [{
        title: 'default',
        icon: 'add'
      }, {
        title: 'magic',
        icon: 'wb_iridescent'
      }, {
        title: 'Piecemaker',
        icon: ''
      }, {
        title: 'Vimeo',
        icon: ''
      }, {
        title: 'Youtube',
        icon: ''
      }, {
        title: 'test 1',
        icon: ''
      }, {
        title: 'test 2',
        icon: ''
      }, {
        title: 'test 3',
        icon: ''
      }
      ],
      items : [{
        label: 'Title Cell',
        icon: 'title',
        type: 'title'
      }, {
        label: 'Text Cell',
        icon: 'subject',
        type: 'text'
      }, {
        label: 'Video Cell',
        sublabel: 'Insert a URL to: a video file or a Vimeo / YouTube video page',
        icon: 'play_arrow',
        type: 'video'
      }, {
        label: 'Image Cell',
        sublabel: 'Insert a URL to an image file',
        icon: 'image',
        type: 'image'
      }, {
        label: 'Link Cell',
        sublabel: 'Insert a URL to a page in this system',
        icon: 'link',
        type: 'link'
      }, {
        label: 'IFrame Cell',
        sublabel: 'Insert some URL',
        icon: 'picture_in_picture',
        type: 'iframe'
      }]
    }
  },
  methods: {
    dragTest (val) {
      console.log(val)
    },
    dragStart (event, item) {
      // console.log('click geht')
      let ressourceCell = {
        type: item.type,
        x: 1,
        y: 1,
        width: 1,
        height: 1
      }
      console.log(ressourceCell)
    }
  }
  // name: "drawer-grid"
}
</script>

<style scoped lang="stylus">

  .q-item
    border 1px solid transparent

  .q-item:hover
    background-color rgba( 255, 255, 255, .1 )
    border 1px solid rgba( 255, 255, 255, .1 )

</style>
