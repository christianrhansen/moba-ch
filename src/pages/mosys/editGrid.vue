<template lang="pug">

  q-page(padding)

    //
    // modal "add user to grid"
    //

    q-modal(v-model="openModal")
      div.row.q-pa-xl.text-white.moba-bg-grey.moba-border
        .row.col-12.q-pb-md(
          style="border-bottom: 0px solid #ccc;"
          )

          .q-headline.col-12.no-margin(
            style="border-left: 0px solid #ccc;"
            )
            span Add user to grid
            xButton.float-right

        // q-input.col-12.q-mb-sm.q-my-lg(
          v-model="newUser.name",
          float-label="Enter Name",
          color="white",
          dark
          )

        q-input.col-12.q-mb-sm.q-my-lg(
          v-model="newUser.mail",
          float-label="Enter email address",
          color="white",
          dark
          )

        div.col-12.text-center

          q-btn.moba-border-brighter(
            @click="openModal = false, handlerAddUser()",
            flat, no-ripple
            )
            q-icon.q-mr-sm(name="done")
            | Ok


    //
    // headline
    //

    // q-page-sticky(
      position="top-left"
      style="padding: 3em 4rem;"
      )
      backButton(
      // :target="targetBack"
      )

    .row.text-grey-3
      .col-xs-2.col-sm-1
        backButton(
          :target="targetBack"
          )

      .col-xs-10.col-sm-11
        .q-headline.q-mb-lg
          div.text-grey-8 Edit grid details for
          div(v-model="gridDetails") {{ gridDetails.title }}


        // q-btn.q-mt-lg(
          @click="$router.push( '/mosys/grid-editor' )",
          style="margin-top: 6px;",
          flat
          )
          // q-icon.flip-horizontal.q-pa-xs(
            name="keyboard backspace",
            style="border-radius: 100%;"
            )
          q-icon.flip-horizontal.q-mr-sm.bg-white.text-black.q-pa-xs(
            name="grid_on",
            style="border-radius: 100%;"
            )
          | visit Grid

      //
      // content wrap
      //

      // div.col-12.row.q-pb-lg(
        style="white-space: nowrap; overflow-x: scroll; display: inline-block;"
        )
      .col-xs-12.col-sm-10.col-lg-8.q-pb-lg.moba-gt-xs-offset-1

        //
        // general information
        //

        // q-card.col-xs-10.offset-1.col-sm-6.q-pa-md.q-mr-lg.q-mt-lg.moba-border(
          style="display: inline-block;"
          )
        q-card.q-mt-lg.moba-border.moba-bg-cards(
          v-model="gridDetails"
          )

          // .q-headline.text-grey-8 General
            .q-subheading.text-grey-8.moba-font-size-13.q-mb-xl It will not affect the user's data in his own account.

          q-collapsible(
            label="General",
            sublabel="Title, description, visibility/status",
            header-class="q-pa-md moba-collapsible-header",
            no-ripple
            )

            .moba-border-top.q-pa-lg
              q-list(no-border)

                q-item.q-mb-xl.no-padding
                  q-item-main.moba-border-bottom-brighter.q-pb-sm
                    q-input.text-white.col-12(
                      v-model="gridDetails.title",
                      float-label="Video title",
                      color="white",
                      dark, hide-underline
                      )

                q-item.q-mb-xl.no-padding
                  q-item-main.moba-border-bottom-brighter.q-pb-sm
                    q-input.text-white.col-12(
                      v-model="gridDetails.desc",
                      float-label="Video description",
                      color="white",
                      dark, hide-underline
                      )

                q-item.q-mb-xl.no-padding
                  q-item-main.moba-border-bottom-brighter.q-pb-sm
                    q-input.text-white.col-12(
                      v-model="gridDetails.status",
                      float-label="Video status",
                      color="white",
                      dark, hide-underline
                      )

              .text-center
                q-btn.moba-border
                  q-icon.q-mr-sm(name="done")
                  | Update

        //
        // tags
        //

        q-card.q-mt-lg.moba-border.moba-bg-cards

          // .q-headline.text-grey-8 Tags
            .q-subheading.text-grey-8.moba-font-size-13.q-mb-xl Useful for filtering etc

          q-collapsible(
            label="Tags",
            sublabel="Add tags to make this grid discoverable.",
            header-class="q-pa-md moba-collapsible-header",
            no-ripple
            )

            .moba-border-top.q-pa-lg
              q-chips-input(
                v-model="tags",
                placeholder="Add new tag",
                chips-bg-color="transparent",
                color="white",
                add-icon="done",
                hide-underline, dark, square
                )

        //
        // users
        //

        // q-card.q-pa-md.q-mr-lg.q-mt-lg.moba-border(
          style="display: inline-block;"
          )

        q-card.q-mt-lg.moba-border.moba-bg-cards

          // .q-headline.text-grey-8 Users
            .q-subheading.text-grey-8.moba-font-size-13.q-mb-xl This options will only affect this grid.

          q-collapsible(
            label="Users",
            sublabel="Add to and remove users from this grid, and mange their administrative rights here.",
            header-class="q-pa-md moba-collapsible-header",
            no-ripple
            )

            .q-pa-lg.moba-border-top

              q-btn.q-px-md.q-py-sm.q-mb-sm.no-shadow.text-white.cursor-pointer.moba-border(
                @click="openModal = true",
                no-caps, no-ripple, rounded
                )
                q-icon.q-mr-sm(
                  name="add"
                  )
                .q-pr-xs add user to grid

              q-card.q-pa-sm.q-mt-sm.no-shadow.moba-font-size-13(
                v-for="user in users",
                :key="user.id"
                )
                .row
                  div.col-8.row
                    | {{ user.mail }}
                    span.col-xs-12.col-sm-6.text-grey-7(v-if="user.name") &nbsp; ({{ user.name }})
                    span.col-xs-12.col-sm-6.text-red-4(v-else) &nbsp; confirmation pending
                  div.col-4.text-right
                    q-btn.q-ml-xs.rounded.moba-bg-button(
                      v-for="(button, index) in buttons",
                      :key="button.title",
                      size=".65em",
                      @click="onAction(button.type, index)",
                      flat
                      ) {{ button.title }}


              // q-table.no-shadow(
                // :columns="columns",
                // :data="tableData",
                // :pagination.sync="pagination",
                // :filter="filter",
                row-key="title",
                hide-bottom, dark, hide-header
                )

                // button "invite"

                template(
                  slot="top-left",
                  slot-scope="props",
                  link
                  )
                  q-btn.q-px-md.q-py-sm.q-mb-sm.no-shadow.text-white.cursor-pointer.moba-border(
                    @click="openModal = true",
                    no-caps, no-ripple, rounded
                    )
                    q-icon.q-mr-sm(
                      name="add"
                      )
                    .q-pr-xs add user to grid

                // row "comments"

                q-td.moba-td-desc(slot="body-cell-comments", slot-scope="props", :props="props")
                  | {{ props.value }}

                // row buttons

                q-td.text-right(
                  slot="body-cell-buttons",
                  slot-scope="props",
                  // :props="props",
                  style="white-space: nowrap;"
                  )

                  q-btn.q-ml-xs.rounded.moba-bg-button(
                    v-for="button in buttons",
                    key="title",
                    size=".65em",
                    @click="onAction(button.type)"
                    ) {{ button.title }}

</template>

<script>
import { QInput, QCard, QPageSticky, QChipsInput, QList, QItem, QItemMain, QTable, QTd, QModal, QCollapsible, QBtn, QIcon } from 'quasar'
import backButton from '../../components/shared/backButton'
import xButton from '../../components/shared/xButton'
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
    QCollapsible,
    QBtn,
    QIcon,
    backButton,
    xButton
  },
  methods: {
    handlerAddUser () {
      this.users.push(this.newUser)
      this.sortUsers()
      this.newUser = {
        author: '',
        comments: '',
        created: '',
        id: '',
        updated: '',
        mail: '',
        name: ''
      }
    },
    handlerRemoveUser (val) {
      this.users.splice( val, 1 )
      console.log( 'delete geht: ' + val )
    },
    onAction (type, index) {
      const _this = this
      switch (type) {
        case 'manage_rights':
          return _this.$router.push('/mosys/manage-user')
        case 'edit':
          return _this.$router.push('/mosys/edit')
        case 'remove':
          this.handlerRemoveUser(index)
        // case 'videos':
        // return _this.$router.push( '/piecemaker/videos' )
      }
    },
    sortUsers () {
      this.users.sort(function(a, b) {
        var valA = a.mail.toUpperCase()
        var valB = b.mail.toUpperCase()
        if (valA < valB) {
          return -1
        }
        if (valA > valB) {
          return 1
        }
      })
      return 0
    }
  },
  mounted () {
    this.sortUsers()
  },
  data () {
    return {
      openModal: false,
      targetBack: 'mosys',
      tags: ['modern jazz', 'codarts', 'workshop 2018', 'ben'],
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
          name: 'mail',
          required: true,
          label: 'Mail',
          align: 'left',
          field: 'mail',
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
        title: 'manage',
        type: 'manage_rights',
        icon: ''
      }, {
        title: 'Remove',
        type: 'remove',
        icon: ''
      }],
      gridDetails: {
        title: 'My private grid for me and my lovely friends <3 (this is a longer test title)',
        desc: 'Beschreibungstext',
        status: '1'
      },
      users: [
        {
          author: 'ch',
          comments: 'Hier steht ein etwas längerer Text, um die Zellenbreite sowie das passende Verhalten der Tabelle zu prüfen. bchdsa cbdhsackdsva bcsdhuacads  bcahdcw dcw dAEIXEWC ASVCHADCAW bhskcbadsc cbdsha.',
          created: '2017–09–01',
          id: '43412',
          updated: '2017–11–14',
          mail: 'ccccccc@abc.de',
          name: 'Michael Jackson'
        },
        {
          author: 'ch',
          comments: 'bbb',
          created: 29,
          id: '87654',
          updated: 6.0,
          mail: 'abc@abc.de',
          name: ''
        },
        {
          author: 'ch',
          comments: 'bbb',
          created: 29,
          id: '12341',
          updated: 6.0,
          mail: 'mm@abc.de',
          name: 'Michael Müller'
        }
      ],
      newUser: {
        author: '',
        comments: '',
        created: '',
        id: '',
        updated: '',
        mail: '',
        name: ''
      }
    }
  }
}
</script>

<style scoped>
@media (max-width: 574px) {
  .moba-lt-sm-full-width {
    width: 100%!important;
    }
}
@media (min-width: 575px) {
  .moba-gt-xs-offset-1 {
    margin-left: 8.3333%!important;
    }
}
</style>
