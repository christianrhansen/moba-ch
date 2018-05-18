<template lang="pug">

  q-page(padding)

    // modal "add user to grid"

    q-modal(v-model="opened")
      div.row.q-pa-xl.text-white.moba-bg-grey.moba-border
        .row.col-12.q-pb-md(
        style="border-bottom: 0px solid #ccc;"
        )

          .q-headline.col-12.no-margin(
          style="border-left: 0px solid #ccc;"
          )
            span Add user to grid
            xButton.text-grey-8.float-right

        q-input.col-12.q-mb-sm.q-my-lg(
          float-label="Enter Name",
          color="white",
          dark
          )

        q-input.col-12.q-mb-sm.q-my-lg(
          float-label="Enter email address",
          color="white",
          dark
          )

        div.col-12.text-center

          q-btn.moba-border-brighter(
          @click="opened = false",
          flat
          )
            q-icon.q-mr-sm(name="add")
            | Add



    // headline

    // q-page-sticky(
      position="top-left"
      style="padding: 3em 4rem;"
      )
      backButton.q-mr-lg(
      //:target="targetMosys"
      )
      backButton(
      //:target="targetBack"
      )

    .row.text-grey-3
      .col-xs-2.col-sm-1.gt-xs
        backButton(
          :target="targetMosys"
          )

      .col-xs-2.col-sm-1
        backButton(
          :target="targetBack"
          )

      .col-xs-10.col-sm-10
        .q-headline.q-pb-lg
          // div
            span.text-grey-8 Manage user
            span &nbsp;
            | Michael Jackson
          // div.text-grey-8 in "My private grid for me and my lovely friends <3 (this is a longer test title)"
          .text-grey-8 Manage user&nbsp;
            span.text-white Michael Jackson
          .text-grey-8 in My private grid for me and my lovely friends <3 (this is a longer test title)


      //
      // content wrap
      //

      // div.col-12.row.q-pb-lg(
        style="white-space: nowrap; overflow-x: scroll; display: inline-block;"
        )
      .col-8.offset-2.q-pb-lg

        //
        // general user information
        //

        // q-card.q-mt-lg.moba-border.moba-bg-cards

          q-collapsible(
            label="General user information",
            sublabel="Name, mail address, comments. Changes here have no impact on the user's account and are only visible for you.",
            header-class="q-pa-lg moba-collapsible-header",
            no-ripple
            )

            // .q-headline.text-grey-8.q-mb-xl General user information

            .border-top
              q-list.q-pa-lg.q-mt-sm(no-border)
                q-item.q-mb-xl.no-padding(v-for="gi in generalInformation", :key="gi.val")
                  q-item-main.moba-border-bottom-brighter.q-pb-sm
                    q-input.text-white.col-12(
                      // :float-label="gi.label",
                      // :value="gi.val",
                      color="white",
                      dark, hide-underline
                      )

            // button "update"

            .text-center.q-mb-lg
              q-btn.moba-border(
                flat, no-ripple
                )
                q-icon.q-mr-sm(name="done")
                | Update

        //
        // Rights on this grid
        //

        q-card.q-mt-lg.moba-border.moba-bg-cards

          //q-collapsible(
            label="Rights on this grid",
            sublabel="Active on this grid only",
            header-class="q-pa-lg moba-collapsible-header",
            no-ripple, opened
            )

          .q-subheading.q-pa-md Rights on this grid

          .moba-border-top.text-grey-8.q-pa-md
            div This user can...

            q-list.col-7.no-border.no-padding.margin-bottom

              q-item.item-hover
                q-item-main ...is allowed to add videos to this timeline.
                q-item-side.text-white
                  q-toggle(v-model="toggle")

              q-item.item-hover
                q-item-main ...is allowed to edit this timeline.
                q-item-side.text-white
                  q-toggle(v-model="toggle")

              q-item.item-hover
                q-item-main ...is allowed to delete this timeline.
                q-item-side.text-white
                  q-toggle(v-model="toggle")
              q-item.item-hover
                q-item-main ...is allowed to live annotate this timeline.
                q-item-side.text-white
                  q-toggle(v-model="toggle")

            .moba-border-top
              q-list.col-7.no-border.no-padding.margin-bottom
                q-item.item-hover
                  q-item-main ...is allowed to add videos to this grid.
                  q-item-side.text-white
                    q-toggle(v-model="toggle")
                q-item.item-hover
                  q-item-main ...is allowed to edit this grid.
                  q-item-side.text-white
                    q-toggle(v-model="toggle")
                q-item.item-hover
                  q-item-main ...is allowed to delete this grid.
                  q-item-side.text-white
                    q-toggle(v-model="toggle")
                q-item.item-hover
                  q-item-main ...is allowed to live annotate this grid.
                  q-item-side.text-white
                    q-toggle(v-model="toggle")

            .moba-border-top

              q-list.col-7.no-border.no-padding.margin-bottom
                q-item.item-hover
                  q-item-main ...is allowed to add videos.
                  q-item-side.text-white
                    q-toggle(v-model="toggle")

                q-item.item-hover
                  q-item-main ...is allowed to videos.
                  q-item-side.text-white
                    q-toggle(v-model="toggle")

                q-item.item-hover
                  q-item-main ...is allowed to delete videos.
                  q-item-side.text-white
                    q-toggle(v-model="toggle")

                q-item.item-hover
                  q-item-main ...is allowed to annotate videos.
                  q-item-side.text-white
                    q-toggle(v-model="toggle")

            .moba-border-top

              q-list.col-7.no-border.no-padding.margin-bottom
                q-item.item-hover
                  q-item-main ...is allowed to add new users.
                  q-item-side.text-white
                    q-toggle(v-model="toggle")
                q-item.item-hover
                  q-item-main ...is allowed to add remove users.
                  q-item-side.text-white
                    q-toggle(v-model="toggle")

            // button "update"

            // .text-center
              q-btn.moba-border(flat)
                q-icon.q-mr-sm(name="done")
                | Update

</template>

<script>
import { QInput, QCard, QPageSticky, QChipsInput, QList, QItem, QItemMain, QTable, QTd, QModal, QToggle, QCollapsible, QBtn } from 'quasar'
import backButton from '../../components/shared/backButton'
export default {
  components: {
    QInput,
    QCard,
    QPageSticky,
    QChipsInput,
    QList,
    QItem,
    QItemMain,
    QTable,
    QTd,
    QModal,
    QToggle,
    QCollapsible,
    QBtn,
    backButton
  },
  data () {
    return {
      opened: false,
      targetBack: 'mosys/edit',
      targetMosys: 'mosys',
      tags: ['modern jazz', 'codarts', 'workshop 2018', 'ben'],
      toggle: '',
      columns: [
        {
          name: 'title',
          required: true,
          label: 'Name',
          align: 'left',
          field: 'title',
          sortable: true
        },
        {
          name: 'comments',
          required: true,
          label: 'Comments',
          align: 'left',
          field: 'comments',
          sortable: false
        },
        {
          name: 'buttons',
          required: true,
          // label: 'Buttons',
          align: 'right',
          field: 'buttons',
          sortable: false
        }
      ],
      buttons: [{
        title: 'Invite',
        type: '',
        icon: ''
      }, {
        title: 'Manage',
        type: 'manage_rights',
        icon: ''
      }, {
        title: 'Remove',
        type: 'remove_user',
        icon: ''
      }],
      generalInformation: [{
        label: 'Name',
        val: 'Christian Hansen'
      }, {
        label: 'Mail',
        val: 'info@christianhansen.net'
      }, {
        label: 'Comments',
        val: ''
      }],
      rights: [{
        grid: [{
          text: 'can add other users.'
        }, {
          text: '1234'
        }]
      }, {
        text: 'can delete other users.'
      }]
    }
  }
}
</script>

<style scoped>
  .moba-td-desc {
    min-width: 400px;
    max-width: 500px!important;
    white-space: normal;
    line-height: 1.2rem;
  }
</style>
