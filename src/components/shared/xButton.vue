<template lang="pug">

  q-btn.moba-border(
    round, outline, dense, no-ripple,
    color="grey-3"
    )
    q-icon(name="clear")

</template>

<script>
import { QBtn, QIcon } from 'quasar'
export default {
  components: {
    QBtn,
    QIcon
  },
  data () {
    return {
      icn: this.icon
    }
  },
  props: ['icon'],
  methods: {
  }
  // name: "back-button"
}
</script>

<style scoped>
</style>
