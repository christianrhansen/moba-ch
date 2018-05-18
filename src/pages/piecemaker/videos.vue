<template lang="pug">

  q-page(padding)

    // modal "add new video"

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
            ) Add new video to this timeline
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

    .row.text-grey-3.q-mb-xl
      .col-1
        backButton(
          :target="targetBack"
          )

      .col-11.row.q-pl-lg(style="border-left: 0px solid white;")
        .col-9
          .q-headline.text-grey-8 All videos in timeline
          .q-headline Codarts 2018, Workshop 27.02.2018

        .col-3.text-right
          a.cursor-pointer(
            v-bind:class="{ inactive : view === 'cards'}",
            color="black",
            label="list view",
            icon="view_headline",
            inverted,
            rounded,
            @click="view = 'list'",
            no-ripple
            ) <!--list view--> list

          a.cursor-pointer.q-ml-md(
            v-bind:class="{ inactive : view === 'list'}",
            color="black",
            label="card view",
            icon="view_column",
            inverted,
            rounded,
            @click="view = 'cards'",
            no-ripple
            ) <!--card view--> cards


    // .row
      .col-6
        q-btn.col-xs-12.col-sm-auto.q-my-lg.q-py-sm(
          color="grey-9",
          icon="add",
          label="add video",
          inverted,
          rounded,
          @click="opened = true"
          )


    // card view

    div.text-right.q-mb-md(v-if="view === 'cards'")

      // dropdown "jump to"

      q-btn-dropdown(
        label="jump to",
        color="dark",
        no-ripple, flat
        )
        q-list(separator, link)
          q-item(v-for="entry in tableData", v-bind:key="entry.title") {{ entry.title }}

    // desktop view

    .row(v-if="$q.platform.is.desktop")

      q-table.col-12.no-shadow(
        :columns="columns",
        :data="tableData",
        :pagination.sync="pagination",
        :filter="filter",
        row-key="title",
        hide-bottom,
        dark,
        v-if="view === 'list'"
        )

        // button "add new video"

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
            ) add new video

        // search area

        template.row.text-white.gutter-lg(
          slot="top-right",
          slot-scope="props"
          )
          q-search.col-xs-12.text-white.q-mb-sm(
            hide-underline,
            v-model="filter",
            style="border-bottom: 1px solid #444;"
            )

            // dropdown desktop

            // .gt-sm.col-md-auto.text-white.text-right
              q-btn-dropdown.text-black.full-width.q-my-xs(label="Search all columns", color="grey-8", inline)
                q-list.no-padding(separator, link)
                  q-item All columns
                  q-item Video Title

          // dropdown mobile

          // .lt-md.col-lg-12.text-white.text-right
            q-btn-dropdown.text-black.full-width.q-my-xs(label="Search all columns", color="grey-8", inline)
              q-list.no-padding(separator, link)
                q-item All columns
                q-item Video Title

        q-td.text-right(
          slot="body-cell-buttons",
          slot-scope="props",
          :props="props",
          style="white-space: nowrap;"
          )
          q-btn.q-ml-xs(
            v-for="button in buttons",
            key="title",
            size=".65em",
            @click="onAction(button.type)"
            ) {{ button.title }}



      // div.q-py-lg.col-11.offset-1.row(
        v-if="view === 'cards'"
        )
      div.q-py-lg(
        style="min-width: 300px; white-space: nowrap; overflow-x: scroll;",
        v-if="view === 'cards'"
        )
        q-card.col-6.no-shadow(
          v-for="card in tableData",
          style="display: inline-block;",
          v-bind:key="card.title"
          )
          iframe.shadow-10(
            height="315",
            src="https://www.youtube.com/embed/_9a0kvOhnNg?rel=0",
            frameborder="0",
            allow="autoplay; encrypted-media",
            allowfullscreen,
            style="width: 100%;"
            )
          q-list(separator).text-white
            q-item
              q-item-side Title
              q-item-main {{ card.title }}
            q-item
              q-item-side Description
              q-item-main(style="width: 300px; white-space: normal;") {{ card.desc }}
            q-item
              q-item-side Created
              q-item-main {{ card.created }}
            q-item
              q-item-side Last update
              q-item-main {{ card.updated }}
            div.q-mt-md
              q-btn.q-ma-xs(
              v-for="button in buttons",
              v-bind:key="button.title",
              v-bind:icon="button.icon",
              v-bind:label="button.title",
              @click="onAction(button.type)",
              size="sm"
              )

    // mobile view

    div(v-if="$q.platform.is.mobile")
      q-search.bg-grey-8.text-white.q-my-md.q-pa-xs(color="white")

      q-card.q-mb-lg.no-shadow(
        v-for="card in tableData",
        v-bind:key="card.title",
        color="none"
        )
        q-list
          q-item.row(
            v-for="(cardRow, index) in card",
            v-bind:key="cardRow.title"
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
import {
  QTable,
  QTr,
  QTd,
  QSearch,
  QModal,
  QBtnDropdown,
  QList,
  QItem,
  QCard,
  QScrollArea,
  QInput,
  QPageSticky
  } from 'quasar'
import backButton from '../../components/shared/backButton'
export default {
  components: {
    QTable,
    QTr,
    QTd,
    QSearch,
    QModal,
    QBtnDropdown,
    QList,
    QItem,
    QCard,
    QScrollArea,
    QInput,
    QPageSticky,
    backButton
  },
  methods: {
    onAction (type) {
      const _this = this
      switch (type) {
        case 'annotate':
          return _this.$router.push( '/piecemaker/annotate' )
        case 'edit':
          return _this.$router.push( '/piecemaker/edit-video' )
        case 'sync':
          return _this.$router.push( '/piecemaker/sync' )
      }
    }
  },
  data () {
    return {
      iconModal: 'clear',
      opened: false,
      targetBack: 'piecemaker',
      view: 'list',
      pagination: {
        sortBy: null,
        descending: false,
        page: 1,
        rowsPerPage: 0
      },
      buttons: [{
        title: 'annotate',
        type: 'annotate',
        icon: 'clear'
      }, {
        title: 'edit',
        type: 'edit',
        icon: 'mode_edit'
      }, {
        title: 'sync',
        type: 'sync',
        icon: 'stop'
      }, {
        title: 'delete',
        type: '',
        icon: 'clear'
      }],
      columns: [
        {
          name: 'title',
          required: true,
          label: 'Video title',
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
          label: 'Last update',
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
          name: 'buttons',
          required: true,
          // label: 'Buttons',
          align: 'left',
          field: 'buttons',
          sortable: false
        }
      ],
      tableData: [
        {
          title: 'Title 2',
          desc: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
          created: 129,
          updated: 6.0,
          author: 'Christian Hansen',
          description: 'bbb'
        },        {
          title: 'Title vsdcsdc',
          created: 19,
          updated: 6.02,
          author: 'ch',
          description: 'bbb'
        },        {
          title: 'bla',
          created: 9,
          updated: 6.0,
          author: 'ch',
          description: 'bbb'
        },
        {
          title: 'etc.',
          created: 1529,
          updated: 6.0,
          author: 'ch',
          description: 'cds vcgdjs sd'
        },
        {
          title: 'vscsdcdscsadcsdcd svdsdc',
          created: 29,
          updated: 6.0,
          author: 'ch',
          description: 'bbb'
        },
        {
          title: 'Title 2',
          desc: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
          created: 129,
          updated: 6.0,
          author: 'Christian Hansen',
          description: 'bbb'
        },        {
          title: 'Title vsdcsdc',
          created: 19,
          updated: 6.02,
          author: 'ch',
          description: 'bbb'
        },        {
          title: 'bla',
          created: 9,
          updated: 6.0,
          author: 'ch',
          description: 'bbb'
        },
        {
          title: 'etc.',
          created: 1529,
          updated: 6.0,
          author: 'ch',
          description: 'cds vcgdjs sd'
        },
        {
          title: 'vscsdcdscsadcsdcd svdsdc',
          created: 29,
          updated: 6.0,
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
  /* .inactive {
    opacity: .5;
  } */
</style>
