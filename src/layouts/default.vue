<template lang="pug">

  q-layout(view="LHh lpr lfr")

    q-layout-header
      // q-toolbar(color="primary", :glossy="$q.theme === 'mat'", :inverted="$q.theme === 'ios'")
      q-toolbar.moba-border-bottom(
        color="black",
        style="background-color: #252324!important;"
        )
        q-btn(
          no-ripple, flat, dense, round,
          @click="leftDrawerOpen = !leftDrawerOpen",
          aria-label="Menu"
          )
          q-icon(
            v-if="leftDrawerOpen",
            name="keyboard_backspace"
            )
          q-icon(
            v-else="leftDrawerOpen",
            name="menu"
            )

        // q-toolbar-title.text-weight-regular.uppercase
          a(@click="$router.push('/')") Motionbank
          | : Piecemaker
          // div(slot="subtitle") Running on Quasar v{{ $q.version }}

        q-breadcrumbs.q-ml-xs
          q-breadcrumbs-el.text-white(label="Motionbank", to="/")
          q-breadcrumbs-el.text-white(v-if="$q.platform.is.desktop", label="Mosys", to="/Mosys/")
          q-breadcrumbs-el.text-white(v-if="$q.platform.is.desktop", label="Piecemaker", to="/piecemaker/")

        // q-btn(
          flat, dense,
          @click="rightDrawerOpen = !rightDrawerOpen",
          aria-label="Menu",
          icon="keyboard_arrow_left",
          label="show annotations",
          v-ripple="rippleEnabled")

    q-layout-drawer(
      v-model="leftDrawerOpen",
      side="left",
      overlay,
      :content-class="$q.theme === 'mat' ? 'moba-bg-grey' : null",
      style="border-right: 1px solid white!important;"
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

export default {
  components: {
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
