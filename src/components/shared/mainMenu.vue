<template lang="pug">

  div
    div.text-white
      q-list.q-px-sm(no-border, link)
        q-item.q-py-lg.moba-font-size-13(@click.native="$router.push('/mosys/')")
          q-item-main(label="Mosys")

        q-item.q-py-lg.moba-font-size-13.moba-border-top(@click.native="$router.push('/piecemaker/')")
          q-item-main(label="Piecemaker")

        q-item.q-py-lg.moba-font-size-13.moba-border-top(@click.native="openURL('https://github.com/quasarframework/')")
          q-item-main(label="Manage Account")

        q-item.q-py-lg.moba-font-size-13.moba-border-top(@click.native="openURL('https://github.com/quasarframework/')")
          // q-item-side(icon="code")
          q-item-main(label="Logout")

        q-item.q-py-lg.moba-font-size-13.moba-border-top(@click.native="openURL('./')")
          // q-item-side(icon="code")
          q-item-main(label="Help")




    q-list.q-px-sm.text-white(no-border, link)

      q-item.moba-font-size-13.q-mt-xl(@click.native="openURL('http://motionbank.org/de/content/impressum')")
        q-item-main(label="Imprint")

      q-item.moba-font-size-13(@click.native="openURL('http://forum.quasar-framework.org')")
        // q-item-side(icon="record_voice_over")
        q-item-main(label="Contact")

      q-item.moba-font-size-13(@click.native="openURL('https://twitter.com/quasarframework')")
        q-item-main(label="Terms")

      q-item.moba-font-size-13(@click.native="openURL('https://github.com/quasarframework/')")
        q-item-main(label="GitHub", sublabel="UI Version:: v1.0.0License: MIT")

      q-item.moba-font-size-13()
        q-item-main(sublabel="Copyright 2018 Motion Bank")

</template>

<script>
import { QList, QItem, QItemMain } from 'quasar'
export default {
  components: {
    QList,
    QItem,
    QItemMain
  }
  // name: "back-button"
}
</script>

<style scoped>
</style>
