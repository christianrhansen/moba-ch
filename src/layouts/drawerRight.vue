<template lang="pug">

  q-layout(view="LHh lpr lfr")

    q-layout-header
      q-toolbar(color="black")
        q-btn(flat, dense, round, @click="leftDrawerOpen = !leftDrawerOpen", aria-label="Menu")
          q-icon(name="menu")

        q-toolbar-title
          q-breadcrumbs
            q-breadcrumbs-el.text-white(label="Motionbank", to="/")
            q-breadcrumbs-el.text-white(label="Mosys", to="/Mosys/")
            q-breadcrumbs-el.text-white(label="Piecemaker", to="/piecemaker/")

        div(v-if="$q.platform.is.desktop")
          q-btn(
            flat, dense, round, no-ripple,
            v-if="rightDrawerOpen",
            @click="rightDrawerOpen = !rightDrawerOpen",
            aria-label="Menu",
            icon="keyboard_arrow_right"
            )

          q-btn(
            flat, dense, round, no-ripple,
            v-if="!rightDrawerOpen",
            @click="rightDrawerOpen = !rightDrawerOpen",
            aria-label="Menu",
            icon="keyboard_arrow_left"
            )

        // div(v-if="$q.platform.is.desktop")
        div(
          v-if="$q.platform.is.desktop"
          )
          q-btn(
            flat, dense, round, no-ripple,
            v-if="rightDrawerOpenGrid",
            @click="rightDrawerOpenGrid = !rightDrawerOpenGrid",
            label="Menu",
            icon="keyboard_arrow_right"
            ) grid

          q-btn(
            flat, dense, round, no-ripple,
            v-if="!rightDrawerOpenGrid",
            @click="rightDrawerOpenGrid = !rightDrawerOpenGrid",
            label="Menu",
            icon="keyboard_arrow_left"
            ) grid

    q-layout-drawer(
      side="left",
      v-model="leftDrawerOpen",
      overlay,
      :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
      )
      mainMenu


    q-layout-drawer(
      side="right",
      v-if="$q.platform.is.desktop",
      v-model="rightDrawerOpen",
      :content-style="{opacity: 1, backgroundColor: 'black'}",
      :content-class="$q.theme === 'mat' ? 'bg-black' : null"
      )
      annotation-list


    q-layout-drawer(
      side="right",
      v-model="rightDrawerOpenGrid",
      :content-style="{opacity: 1, backgroundColor: 'black'}",
      :content-class="$q.theme === 'mat' ? 'bg-black' : null",
      overlay
      )
      drawer-grid

    q-page-container
      router-view


    // q-layout-footer
      q-toolbar(color="green") footer

</template>

<script>
import {
  openURL,
  QLayoutFooter,
  QTable,
  QTh,
  QTd,
  QInput,
  QBreadcrumbs,
  QBreadcrumbsEl,
  QTabs,
  QTab,
  QList,
  QItem,
  QItemMain,
  QItemSide,
  QIcon,
  Platform
  } from 'quasar'
import { mainMenu } from '../components/shared/'
import { annotationList } from '../components/piecemaker/'
import { drawerGrid } from '../components/mosys/'

export default {
  components: {
    QLayoutFooter,
    QTable,
    QTh,
    QTd,
    QInput,
    QBreadcrumbs,
    QBreadcrumbsEl,
    annotationList,
    QTabs,
    QTab,
    QList,
    QItem,
    QItemMain,
    QItemSide,
    QIcon,
    mainMenu,
    drawerGrid
  },
  name: 'LayoutDefault',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      rightDrawerOpen: !this.$q.platform.is.desktop,
      rightDrawerOpenGrid: this.$q.platform.is.desktop,
      rippleEnabled: false
    }
  },
  methods: {
    openURL
  }
}
</script>

<style>
</style>
