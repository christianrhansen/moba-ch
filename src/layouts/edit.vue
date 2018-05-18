<template lang="pug">

  q-layout(view="LHh lpr lfr")

    q-layout-header

      // q-toolbar(color="primary", :glossy="$q.theme === 'mat'", :inverted="$q.theme === 'ios'")
      q-toolbar(color="black")

        q-btn(flat, dense, round, @click="leftDrawerOpen = !leftDrawerOpen", aria-label="Menu")
          q-icon(v-if="leftDrawerOpen" name="keyboard_backspace")
          q-icon(v-else="leftDrawerOpen" name="menu")

        q-breadcrumbs.q-ml-sm
          q-breadcrumbs-el.text-white(label="Motionbank", to="/")
          q-breadcrumbs-el.text-white(label="Mosys", to="/Mosys/")
          q-breadcrumbs-el.text-white(label="Piecemaker", to="/piecemaker/")

    edit-header

    q-layout-drawer(
      v-model="leftDrawerOpen",
      side="left",
      overlay,
      :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
      )
      mainMenu


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
  Platform,
  QBreadcrumbs,
  QBreadcrumbsEl
  } from 'quasar'
// import { annotationList } from '../components/annotationList'
import { mainMenu } from '../components/shared'
import { editHeader } from '../components/shared'

export default {
  components: {
    editHeader,
    QLayoutFooter,
    QTable,
    QTh,
    QTd,
    QInput,
    QBreadcrumbs,
    QBreadcrumbsEl,
    mainMenu
    // annotationList
  },
  name: 'LayoutDefault',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      rightDrawerOpen: !this.$q.platform.is.desktop,
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
