<template lang="pug">

  q-btn.shadow-2.moba-border(
    @click="onAction",
    icon="keyboard backspace",
    color="grey-8",
    round, outline, dense, flat, no-ripple
    )
    // q-tooltip.bg-black.q-py-xs(
      delay="500"
      ) back to grid
    // q-icon(name="keyboard_backspace")
    // span.q-ml-sm back

</template>

<script>
import { QTooltip } from 'quasar'
export default {
  components: {
    QTooltip
  },
  // name: "back-button"
  methods: {
    onAction () {
      switch (this.target) {
        case 'mosys':
          return this.$router.push('/mosys/')
        case 'mosys/edit':
          return this.$router.push('/mosys/edit')
        case 'piecemaker':
          return this.$router.push('/piecemaker/')
        case 'piecemaker/videos':
          return this.$router.push('/piecemaker/videos')
      }
    }
  },
  props: [ 'target', 'tooltip' ]
}
</script>

<style scoped>

</style>
