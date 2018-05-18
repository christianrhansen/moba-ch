<template lang="pug">

  .row.text-grey-3
    .col-xs-2.col-sm-1
      backButton(
        :target="targetBack"
        )

    .col-11.row.q-pl-lg.q-mb-xl(style="border-left: 1px solid white;")
      .col-9
        h5.no-margin
          .text-grey-8
            slot(name="title-secondary")

          div
            slot(name="title-primary")

</template>

<script>
import { backButton } from './'
export default {
  components: {
    backButton
  },
  props: ['targetBack']
  // name: "edit-header"
}
</script>

<style scoped>

</style>
