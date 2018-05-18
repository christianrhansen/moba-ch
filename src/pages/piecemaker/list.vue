<template lang="pug">

  q-page(padding)

    // modal "add new timeline"

    q-modal(v-model="opened")
      div.q-pa-xl.text-white.row(
        style="background-color: #252324;"
        )
        .row.col-12.q-pb-md(
          style="border-bottom: 0px solid #ccc;"
          )
          // div.col-2(@click="opened = false")
            xButton(:icon="iconModal")

          h5.col-12.no-margin(
            style="border-left: 0px solid #ccc;"
            ) Add new timeline
              xButton.text-grey-8.float-right(:icon="iconModal")

        q-input.col-12.q-mb-sm.q-my-lg(
          float-label="Enter title",
          color="white",
          dark
          )

        div.col-12.text-center
          q-btn.q-mx-xs(
            @click="opened = false",
            label="add",
            flat
            )
          // q-btn.q-mx-xs(
            @click="opened = false",
            label="cancel"
            )


    // headline

    .row.q-mb-xl
      h5.col-9.no-margin.text-grey-3
        div Hi Christian,
        div these are the timelines you have access to.

    // desktop view

    div.row(v-if="$q.platform.is.desktop")

      // table

      q-table.no-shadow.col-12(
        :columns="columns",
        :data="tableData",
        :pagination.sync="pagination",
        :filter="filter",
        row-key="title",
        hide-bottom, dark
        )

        // add button

        template.row.gutter-lg(
          slot="top-left",
          slot-scope="props",
          link
          )
          q-icon.text-white.q-mr-sm(name="add")
          a.text-white.cursor-pointer(
            color="grey-9",
            label="add new timeline",
            inverted,
            rounded,
            @click="opened = true",
            no-ripple
            ) add new timeline

        // search area

        template.text-white.gutter-lg(
          slot="top-right",
          slot-scope="props"
          )
          q-search.text-white.q-mb-sm(
            hide-underline,
            v-model="filter",
            style="border-bottom: 1px solid #444;",
            dark
            )

          // dropdown large screen

          // .text-white.text-right
            q-btn-dropdown.text-black.full-width.q-my-xs(
              label="all",
              color="grey-8",
              inline, flat
              )
              q-list.no-padding(separator, link)
                q-item All columns
                q-item Video Title

          // dropdown small screen

          // .lt-md.col-lg-12.text-white.text-right
            q-btn-dropdown.text-black.full-width.q-my-xs(label="Search all columns", color="grey-8", inline)
              q-list.no-padding(separator, link)
                q-item All columns
                q-item Video Title

        // row "description"

        q-td.moba-td-desc(
          slot="body-cell-description",
          slot-scope="props",
          :props="props"
          )
          | {{ props.value }}

        // row "buttons"

        q-td.text-right(
          slot="body-cell-buttons",
          slot-scope="props",
          :props="props",
          style="white-space: nowrap;"
          )
          q-btn.q-ml-xs.rounded(
            v-for="button in buttons",
            key="title",
            size=".65em",
            @click="onAction(button.type)"
            ) {{ button.title }}


    // mobile view

    div(v-if="$q.platform.is.mobile")
      q-search.bg-grey-8.text-white.q-my-md.q-pa-xs(color="white")

      q-card.q-mb-lg.outline(
        v-for="card in tableData",
        v-bind:key="card.title",
        color="none"
        )
        q-list

          q-item.row(
            v-for="(cardRow, index) in card",
            v-bind:key="cardRow.title",
            separator
            )
            q-item-main
              q-item-tile.text-grey-6.q-mb-xs.capitalize {{ index }}
              q-item-tile {{ cardRow }}

          q-item.q-mt-sm
            q-item-main
              q-btn.q-ma-xs(
                v-for="button in buttons",
                v-bind:key="button.title",
                v-bind:icon="button.icon",
                v-bind:label="button.title",
                @click="onAction(button.type)",
                outline
                )
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
    onAction (type) {
      const _this = this
      switch (type) {
        case 'live-annotate':
          return _this.$router.push( '/piecemaker/live-annotate' )
        case 'edit':
          return _this.$router.push( '/piecemaker/edit-timeline' )
        case 'videos':
          return _this.$router.push( '/piecemaker/videos' )
      }
    }
  },
  data () {
    return {
      iconModal: 'clear',
      opened: false,
      pagination: {
        sortBy: null,
        descending: false,
        page: 1,
        rowsPerPage: 0
      },
      buttons: [{
        title: 'live annotate',
        type: 'live-annotate',
        icon: 'add_to_queue'
      }, {
        title: 'videos',
        type: 'videos',
        icon: 'list'
      }, {
        title: 'edit',
        type: 'edit',
        icon: 'mode_edit'
      }, {
        title: 'delete',
        type: '',
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
      tableData: [
        {
          title: 'Timeline 1',
          created: '2018–01–17',
          updated: '2018–01–20',
          author: 'Christian Hansen',
          description: 'Hier steht ein Text, lorem olores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr.'
        },        {
          title: 'Timeline 2',
          created: 129,
          updated: 6.0,
          author: 'Christian Hansen',
          description: 'bbb'
        },        {
          title: 'Timeline vsdcsdc',
          created: 19,
          updated: 6.02,
          author: 'ch',
          description: 'white-space: nowrap ist hier schlecht.'
        },        {
          title: 'bla',
          created: 9,
          updated: 6.0,
          author: 'ch',
          description: 'bbb'
        },
        {
          title: 'etc.',
          created: '2017–09–01',
          updated: '2017–11–14',
          author: 'ch',
          description: 'Hier steht ein etwas längerer Text, um die Zellenbreite sowie das passende Verhalten der Tabelle zu prüfen.'
        },
        {
          title: 'vscsdcdscsadcsdcd svdsdc',
          created: 29,
          updated: 6.0,
          author: 'ch',
          description: 'bbb'
        },
        {
          title: 'abc def',
          created: 222,
          updated: 6.0,
          author: 'ch',
          description: 'bbb'
        },
        {
          title: 'hhhkkk',
          created: 'sddsdasda',
          updated: 6.0,
          author: 'ch',
          description: 'bbb'
        },
        {
          title: 'vfvadfs',
          created: 'c',
          updated: 3234,
          author: 'ch',
          description: 'bbb'
        },
        {
          title: 'sddas',
          created: 'vvvfd',
          updated: 6.4,
          author: 'ch',
          description: 'bbb'
        }
      ]
    }
  }
  // name: "list"
}
</script>

<style scoped>
</style>
