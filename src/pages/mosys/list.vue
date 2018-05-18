<template lang="pug">

  q-page(padding)

    //
    // modal "add new grid"
    //

    q-modal(v-model="opened")
      div.row.q-pa-xl.text-white.moba-bg-grey.moba-border
        .row.col-12.q-pb-md(
          style="border-bottom: 0px solid #ccc;"
          )

          .q-headline.col-12.no-margin(
            style="border-left: 0px solid #ccc;"
            )
            span Add new grid
            xButton.float-right

        q-input.col-12.q-mb-sm.q-my-lg(
          v-model="newGrid.title",
          float-label="Enter title",
          color="white",
          dark
          )

        div.col-12.text-center
          //q-btn.q-mx-xs(
            @click="opened = false",
            label="add",
            flat, no-ripple
            )
          q-btn.moba-border(
            @click="opened = false, handlerAddGrid()",
            flat
            )
            q-icon.q-mr-sm(name="done")
            | Ok

          // q-btn.q-mx-xs(
            @click="opened = false",
            label="cancel"
            )

    //
    // modal "delete grid"
    //

    q-modal(v-model="modalDelete")
      div.row.q-pa-xl.text-white.moba-bg-grey.moba-border
        .row.col-12.q-pb-md(
          style="border-bottom: 0px solid #ccc;"
          )

          .q-headline.col-12.no-margin(
            style="border-left: 0px solid #ccc;"
            )
            span Delete grid?
            xButton.float-right

        div.col-12.text-center
          q-btn.moba-border(
            @click="modalDelete = false",
            flat
            )
            q-icon.q-mr-sm(name="done")
            | Yes

          q-btn.moba-border(
            @click="modalDelete = false",
            flat
            )
            q-icon.q-mr-sm(name="done")
            | Cancel


          // q-btn.q-mx-xs(
            @click="opened = false",
            label="cancel"
            )

    //
    // headline
    //

    .row.q-mb-xl.q-pr-sm.text-grey-3
      .col-11
        .q-headline Hi Christian,
        // .q-headline these are the grids you have access to.
        .q-headline there are 6 grids you have access to.
      // .col-1.text-right
        q-btn.no-padding
          .q-headline
            q-icon(name="help outline")


    //
    // btn "add"
    // dropdown "order by"
    //

    .row
      .col-6
        q-btn.q-px-md.q-py-sm.q-mb-lg.no-shadow.text-white.rounded.cursor-pointer.moba-border(
          @click="opened = true",
          no-caps, no-ripple, rounded
          )
          q-icon.q-mr-sm(
            name="add"
            )
          .q-pr-xs add new grid

      .col-6.text-right
        q-btn-dropdown.q-py-sm.q-mb-lg.no-shadow.text-white.cursor-pointer.moba-border(
          :label="'Order by ' + orderBy"
          no-caps, no-ripple
          )
          div.q-px-md.q-py-sm.text-white.cursor-pointer.moba-bg-grey(
            v-for="item in dropdownOrderList",
            @click="orderBy = item.type, orderList(orderBy)"
            ) {{ item.label }}

    //
    // search area
    //

    // q-search.bg-grey-8.text-white.q-my-md.q-pa-xs(color="white")

    //
    // cards
    //

    .row.gutter-md

      .col-xs-12.col-md-6(
        v-for="(card, index) in tableData",
        v-bind:key="card.title"
        )

        q-card.q-px-lg.q-pt-lg.q-pb-md.q-pb-sm.text-white.moba-border.moba-bg-cards

          div {{ card.title }}

          .row
            .col-6.q-mt-sm.text-grey-7.moba-font-size-13 from {{ card.author }}
            .col-6.text-right.q-mt-sm.text-grey-7.moba-font-size-13 last update: {{ card.updated }}

          .q-mt-md.text-grey-7.moba-font-size-13.moba-line-height-xl {{ card.description }}

          .q-mt-lg.q-pt-sm.text-center.moba-border-top
            .row
              .col-xs-6.col-sm-3.text-left
                span(
                  v-for="(button, index) in buttons"
                  )
                  q-btn(
                    v-if="index == 0",
                    :key="button.title",
                    :icon="button._____icon",
                    :label="button._____title",
                    size="sm",
                    @click="onAction(button.type)",
                    style="margin-top: 6px;",
                    flat
                    )
                    q-icon.flip-horizontal.q-mr-sm.q-py-xs(
                      name="grid_on",
                      style="border-radius: 100%;"
                      )
                    | visit Grid

              .col-xs-6.col-sm-9.text-right
                span(
                  v-for="(button, index) in buttons"
                  )
                  q-btn(
                    v-if="index >= 1",
                    :key="button.title",
                    :icon="button._____icon",
                    :label="button.title",
                    size="sm",
                    @click="onAction(button.type, index)",
                    flat
                    )
                  .text-grey-8.gt-xs(
                    v-if="index >= 1 && index <= buttons.length - 2",
                    style="font-size: 150%; display: inline-block; transform: translateY( 3px );"
                    ) /

</template>

<script>
import { QTable,
  QTr,
  QTd,
  QBtn,
  QSearch,
  QModal,
  QBtnDropdown,
  QItem,
  QItemMain,
  QItemSide,
  QList,
  QCard,
  QCollapsible,
  QInput,
  QIcon
} from 'quasar'
import xButton from '../../components/shared/xButton'

export default {
  components: {
    QTable,
    QTr,
    QTd,
    QBtn,
    QSearch,
    QModal,
    QBtnDropdown,
    QItem,
    QItemMain,
    QItemSide,
    QList,
    QCard,
    QCollapsible,
    QInput,
    QIcon,
    xButton
  },
  methods: {
    handlerAddGrid () {
      const _this = this
      let currentTime = new Date()
      _this.newGrid.updated = currentTime
      _this.tableData.push(_this.newGrid)
      _this.newGrid = {
        author: 'Christian Hansen',
        created: '',
        updated: '',
        description: '',
        title: '',
        updated: ''
      }
      _this.orderList(_this.orderBy)
    },
    handlerRemoveGrid (val) {
      this.tableData.splice( val, 1 )
      console.log( 'delete geht: ' + val )
    },
    onAction (type, index) {
      const _this = this
      switch (type) {
        case 'add_cells':
          return _this.$router.push( '/mosys/grid-editor' )
        case 'edit':
          return _this.$router.push( '/mosys/edit' )
        case 'delete_grid':
          this.handlerRemoveGrid( index )
          // return _this.$router.push( '/mosys/edit' )
        // case 'videos':
          // return _this.$router.push( '/piecemaker/videos' )
      }
    },
    orderList (val) {
      console.log(val)
      switch (val) {

        case 'author':
          this.tableData.sort(function(a, b) {
            var valA = a.author.toUpperCase()
            var valB = b.author.toUpperCase()
            if (valA < valB) {
              return -1
            }
            if (valA > valB) {
              return 1
            }
          })
          return 0

        case 'updated':
          this.tableData.sort(function(a, b) {
            var valA = a.updated
            var valB = b.updated
            if (valA > valB) {
              return -1
            }
            if (valA < valB) {
              return 1
            }
          })
          return 0

        case 'title':
          this.tableData.sort(function(a, b) {
            var valA = a.title.toUpperCase()
            var valB = b.title.toUpperCase()
            if (valA < valB) {
              return -1
            }
            if (valA > valB) {
              return 1
            }
          })
          return 0
      }

    }
  },
  mounted () {
    this.orderList(this.orderBy)
  },
  data () {
    return {
      modalDelete: false,
      newGrid: {
        title: '',
        created: '',
        updated: '',
        author: 'Christian Hansen',
        description: ''
      },
      opened: false,
      orderBy: 'updated',
      pagination: {
        sortBy: null,
        descending: false,
        page: 1,
        rowsPerPage: 0
      },
      buttons: [{
        // title: 'enter grid',
        title: 'acces grid',
        // title: 'view grid',
        // title: 'go',
        type: 'add_cells',
        icon: 'keyboard_backspace'
      }, {
        title: 'manage grid',
        type: 'edit',
        icon: 'mode_edit'
      }, {
        title: 'delete grid',
        type: 'delete_grid',
        icon: 'clear'
      }],
      columns: [
        {
          name: 'title',
          required: true,
          label: 'Title',
          align: 'left',
          field: 'title',
          sortable: true
        },
        {
          name: 'created',
          required: true,
          label: 'Created',
          align: 'left',
          field: 'created',
          sortable: true
        },
        {
          name: 'updated',
          required: true,
          label: 'Updated',
          align: 'left',
          field: 'updated',
          sortable: true
        },
        {
          name: 'author',
          required: true,
          label: 'Author',
          align: 'left',
          field: 'author',
          sortable: true
        },
        {
          name: 'description',
          required: true,
          label: 'Description',
          align: 'left',
          field: 'description',
          sortable: true
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
      dropdownOrderList: [{
        label: 'Author',
        type: 'author'
      }, {
        label: 'Title (a to z)',
        type: 'title'
      }, {
        label: 'Updated',
        type: 'updated'
      }],
      tableData: [
        {
          title: 'Hier steht ein Grid-Titel. Zu Testzwecken ist dieser Titel besonders lang und jetzt sogar noch ein Stück länger.',
          created: '2013–09–01',
          updated: '2013–11–14',
          author: 'Christian Hansen',
          description: 'Hier steht ein etwas längerer Text, um die Zellenbreite sowie das passende Verhalten der Tabelle zu prüfen.'
        },
        {
          title: 'Irgendein Titel',
          created: '29',
          updated: '2018',
          author: 'Michael jackson',
          description: 'Dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam.'
        },
        {
          title: 'Hier steht auch was',
          created: '222',
          updated: '2016',
          author: 'Vorname Nachname',
          description: 'Sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit.'
        },
        {
          title: 'Langnese Flotte Biene Wildblütenhonig (27.07.2016)',
          created: 'sddsdasda',
          updated: '2016',
          author: 'Michael Müller',
          description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est.'
        },
        {
          title: 'Panasonic HS700 SD/HDD HYBRID',
          created: 'c',
          updated: '2016',
          author: 'CH',
          description: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.'
        },
        {
          title: 'Natürliches Mineralwasser, still. Ohne Zusatz von Kohlensäure!',
          created: 'vvvfd',
          updated: '2016',
          author: 'Christian Hansen',
          description: 'Est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nih.'
        }
      ]
    }
  }
  // name: "list"
}
</script>

<style scoped>
</style>
