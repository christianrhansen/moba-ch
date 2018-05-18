<template lang="pug">

  div

    // "add cell" modal
    q-modal.bg-transparent(
      v-model="touchModal",
      position="top"
      )
      // .bg-black
      div(style="background-color: #252324;")
        // xButton.q-ma-md(:icon="iconModal", @click="touchAddCell()")
        .row.text-white.text-center
          // q-btn.col-2(@click="touchAddCell()", icon="clear", flat)
          h5.no-margin.full-width
            .q-my-md Add new cell
        drawerGrid
        q-input.q-ma-md.bg-grey-9.q-pa-xs(
          color="white",
          dark,
          value="",
          v-model="inputAddCell"
          )
        // div.bg-red(v-for="n in 100") test
        .text-center
          q-btn.text-white.text-center.q-ma-md(@click="addCell(inputAddCell)", round)
            q-icon(name="done")


    q-page-sticky.layout-padding(
      position="top-left"
      )
      backButton(
        :target="targetBack"
        )

    .grid-wrap

      .cell-grid(
        :style="gridStyle",
        :class="{ mobaNoBackgroundImage : !editMode }"
        )

        // .cell-item-temp(
          // :style="cellTempStyle",
          ) temp


        // assistant cell
        .cell-item-shadow.assistant-cell(
          v-if="touchChangeGridSize",
          :class="{ rotate: !switchSide, deletemode: !gridMode }",
          :style="{ gridColumn: assistantCell.x + ' / span ' + assistantCell.width, gridRow: assistantCell.y + ' / span ' + assistantCell.height, display: assistantCell.display }"
          )


        // shadow cells
        .cell-item-shadow(
          v-if="$q.platform.is.mobile",
          v-for="shadowGridCell in shadowGridCells",
          :class="{ zindex: touchChangeGridSize, activeShadowCell: selectedShadowCell.id == shadowGridCell.id && touchChangeGridSize, addedCell: shadowGridCell.justAdded }",
          :style="{ gridColumn: shadowGridCell.x + ' / span 1', gridRow: shadowGridCell.y + ' / span 1'}",
          @click="selectedShadowCell = shadowGridCell, updateAssistantCell(), selectedCell = ''"
          )
          div.full-height.relative-position(
            v-if="selectedShadowCell.id == shadowGridCell.id && touchChangeGridSize",
            @click="gridResizeAxis = !gridResizeAxis"
            )
            q-icon.text-white.full-width.full-height.absolute-center(
              name="autorenew",
              size="2rem"
              )
          .full-height.text-center.relative-position.bg-positive(
            v-if="selectedShadowCell.id == shadowGridCell.id && editMode && !touchChangeGridSize",
            @click="gridResizeAxis = !gridResizeAxis, touchAddCell()"
            )
            q-btn.bg-positive.absolute-center(
              round, flat
              )
              q-icon.text-white.full-height(
                name="add",
                size="2rem"
                )


          // context menu shadow cells
          // q-context-menu.bg-transparent
            q-list.no-padding.no-border(separator)
              div(@click="touchAddCell(), touchChangeCellPosition = false")
                q-item(v-close-overlay)
                  .fit.text-center.q-py-sm.no-select add cell
              // div(@click="touchChangeCellSize = true, currentCell = cell.id")
                q-item(v-close-overlay)
                  .fit.text-center.q-py-sm.no-select add/remove row



        // defined cells
        .cell-item.font-size-13(
          v-for="cell in cells",
          draggable="true",
          :key="cell.id",
          :style="setCellPosition(cell)",
          :class="{ activecell : cell.id == selectedCell && editMode, editmode: editMode }",
          @drag="drag()",
          @dragstart="event => {dragStart(event, cell)}",
          @dragend="dragCellEnd(cell)",
          @click="currentCell = cell.id, selectedCell = cell.id, selectedShadowCell = ''"
          )


          // image cell
          .full-width.full-height(
            v-if="cell.type == 'image'",
            :style="{ background: 'url(' + cell.url + ') center' }"
            )
            // img(:src="cell.url", style="max-width: 100%, max-height: 100%;")
            // .full-width.full-height(
              )

          // headline cell
          .full-width.full-height.bg-black.text-white(
            v-if="cell.type == 'headline'"
            )
            .row.items-center.full-height.full-width.text-center
              .q-display-1.full-width.font-sm
                span(style="border-bottom: 1px solid white;") {{ cell.text }}


          // text cell
          .full-width.full-height.q-pa-sm.bg-grey-9.text-white(
            style="overflow-y: scroll;",
            v-if="cell.type == 'text'"
            )
            div
              .q-pa-sm
                | {{ cell.text }}


          // video cell
          .full-width.full-height(
            v-if="cell.type == 'video'"
            )
            .row.items-center.full-height.full-width.text-center.bg-grey-5
              .q-display-1.full-width
                // | {{ cell.text }}
                q-icon(name="play circle outline")


          // empty cell
          .full-width.full-height(
            v-if="cell.type == '' && editMode"
            )
            .full-width.full-height(
              :style="{ background: 'linear-gradient( -235deg, white, transparent)' }"
              )
              div {{ cell.text }}


          // "resize cell" icon
          .resize-icon(
            v-if="$q.platform.is.desktop",
            draggable="true",
            @dragstart="event => {handleCellResizerDragStart(event, cell)}",
            @dragend="event => {handleCellResizerDragEnd(event, cell)}"
            )
            div
              q-icon(name="network cell")


          // context menu
          q-context-menu.bg-transparent(
            @show="selectedCell = cell.id"
            )
            q-list.no-padding.no-border(separator)
              div(@click="")
                q-item(v-close-overlay)
                  .fit.text-center.q-py-sm.no-select edit
              div(@click="touchChangeCellPosition = true, currentCell = cell.id")
                q-item(v-close-overlay)
                  .fit.text-center.q-py-sm.no-select move
              div(@click="touchChangeCellSize = true, currentCell = cell.id")
                q-item(v-close-overlay)
                  .fit.text-center.q-py-sm.no-select resize
              div(@click="")
                q-item(v-close-overlay)
                  .fit.text-center.q-py-sm.no-select detail view
              div(@click="")
                q-item(v-close-overlay)
                  .fit.text-center.q-py-sm.no-select delete
              // br
              // div(@click="touchChangeGridSize = true, selectedCell = '', selectedShadowCell = ''")
                //q-item(v-close-overlay)
                q-item(v-close-overlay)
                  .fit.text-center.q-py-sm.no-select
                    span.on-left manipulate grid



    // "switch edit/view mode" button
    div.fixed-top-right.q-ma-sm.text-white(
      v-if="!touchModal",
      style="z-index: 10000;"
      )
      q-btn(
        ) edit grid information
      q-btn(
        :class="{ inactiveIcon: editMode }",
        @click="handlerEditMode()",
        flat, no-ripple
        )
        q-icon(
          name="remove red eye"
          )

      q-btn(
        :class="{ inactiveIcon: !editMode }",
        @click="handlerEditMode()",
        flat, no-ripple
        )
        q-icon(
          name="edit"
          )
      // q-page-sticky(
        v-if="!touchChangeGridSize && !touchChangeCellPosition && !touchChangeCellSize",
        position="bottom-right"
        )
      // q-btn(
        @click="touchChangeGridSize = true, selectedCell = '', selectedShadowCell = ''",
        flat, no-ripple
        )
        q-icon(
          name="grid on",
          color="white"
          )


    // "manipulate grid" button
    q-page-sticky(
      v-if="!touchChangeGridSize && !touchChangeCellPosition && !touchChangeCellSize",
      position="bottom-right"
      )
      q-btn.q-ma-md(
        v-if="editMode",
        @click="touchChangeGridSize = true, selectedCell = '', selectedShadowCell = ''",
        round,
        flat
        )
        q-icon(
          name="grid on",
          color="white"
          )


    // "insert before/after" button
    // "delete row/column" button
    //q-page-sticky.q-ma-lg.text-white(
    div.q-ma-xs.text-white.fixed-top-right(
      v-if="$q.platform.is.mobile && !touchChangeCellPosition && touchChangeGridSize",
      style="z-index: 100000;",
      @click="handlerGridMode()"
      )
      q-btn.text-white(
        @click="handlerSwitchSide()",
        round, flat, no-ripple
        )
        q-icon(
          :class="{ inactiveIcon : !gridMode }",
          name="add"
          )
      q-btn.text-white(
        @click="___handlerDeleteRowOrColumn()",
        round, flat, no-ripple
        )
        q-icon(
          :class="{ inactiveIcon : gridMode }",
          name="delete"
          )





    // "manipulate grid" buttons
    // q-page-sticky(
      v-if="$q.platform.is.mobile && !touchChangeCellPosition && touchChangeGridSize && gridResizeAxis && gridMode",
      position="top-right"
      )
      q-btn.q-ma-lg.text-white(
        @click="handlerAddRow(selectedShadowCell, 'top')",
        round, flat
        )
        q-icon(name="add")

    q-page-sticky(
      v-if="$q.platform.is.mobile && !touchChangeCellPosition && touchChangeGridSize && gridResizeAxis && gridMode",
      position="bottom-right"
      )
      q-btn.q-ma-lg.text-white.bg-positive(
        @click="handlerAddRow(selectedShadowCell, 'bottom')",
        round, flat, no-ripple
        )
        q-icon(name="add")

    // q-page-sticky(
      v-if="$q.platform.is.mobile && !touchChangeCellPosition && touchChangeGridSize && !gridResizeAxis && gridMode",
      position="bottom-left"
      )
      q-btn.q-ma-lg.text-white(
        @click="handlerAddColumn(selectedShadowCell, 'left')",
        round, flat
        )
        q-icon(name="add")

    q-page-sticky(
      v-if="$q.platform.is.mobile && !touchChangeCellPosition && touchChangeGridSize && !gridResizeAxis && gridMode",
      position="bottom-right"
      )
      q-btn.q-ma-lg.text-white.bg-positive(
        @click="handlerAddColumn(selectedShadowCell, 'right')",
        round, flat
        )
        q-icon(name="add")



    // "resize cell" buttons
    q-page-sticky(
      v-if="$q.platform.is.mobile && !touchChangeCellPosition && touchChangeCellSize",
      position="top"
      )
      q-btn.q-mt-lg.text-white(@click="cellResizeY(true)", round)
        q-icon(name="remove")

    q-page-sticky(
      v-if="$q.platform.is.mobile && !touchChangeCellPosition && touchChangeCellSize",
      position="bottom"
      )
      q-btn.q-mb-lg.text-white(@click="cellResizeY(false)", round)
        q-icon(name="add")

    q-page-sticky(
      v-if="$q.platform.is.mobile && !touchChangeCellPosition && touchChangeCellSize",
      position="left"
      )
      q-btn.q-ml-lg.text-white(@click="cellResizeX(true)", round)
        q-icon(name="remove")

    q-page-sticky(
      v-if="$q.platform.is.mobile && !touchChangeCellPosition && touchChangeCellSize",
      position="right"
      )
      q-btn.q-mr-lg.text-white(@click="cellResizeX(false)", round)
        q-icon(name="add")



    // "move cell" buttons
    q-page-sticky(
        v-if="$q.platform.is.mobile && touchChangeCellPosition",
        position="top"
        )
      q-btn.q-mt-lg.text-white(@click="touchChangeCellPositionY(true)", round)
        q-icon(name="keyboard_arrow_up")

    q-page-sticky(
      v-if="$q.platform.is.mobile && touchChangeCellPosition",
      position="bottom"
      )
      q-btn.q-mb-lg.text-white(@click="touchChangeCellPositionY(false)", round)
        q-icon(name="keyboard_arrow_down")

    q-page-sticky(
      v-if="$q.platform.is.mobile && touchChangeCellPosition",
      position="left"
      )
      q-btn.q-ml-lg.text-white(@click="touchChangeCellPositionX(true)", round)
        q-icon(name="keyboard_arrow_left")

    q-page-sticky(
      v-if="$q.platform.is.mobile && touchChangeCellPosition",
      position="right"
      )
      q-btn.q-mr-lg.text-white(@click="touchChangeCellPositionX(false)", round)
        q-icon(name="keyboard_arrow_right")


    // "delete" button
    q-page-sticky(
      v-if="$q.platform.is.mobile && !gridMode",
      position="bottom-right"
      )
      q-btn.q-ma-lg.text-white.bg-negative(@click="", round)
        q-icon(name="delete")


    // header overlay
    .fixed-top.bg-black.q-py-xs(
      v-if="$q.platform.is.mobile && touchChangeCellPosition || touchChangeCellSize || touchChangeGridSize",
      position="top",
      style="z-index: 10000;"
      )
      .absolute-center.text-white
        span(v-if="touchChangeCellPosition") Move cell
        span(v-if="touchChangeCellSize") Resize cell
        span(v-if="touchChangeGridSize") Grid Dimensions
      q-btn.on-right(
        @click="touchChangeCellPosition = false, touchChangeCellSize = false, touchChangeGridSize = false, selectedCell = '', selectedShadowCell = ''",
        round,
        color="black"
        )
        q-icon(name="clear")
      q-btn.on-left.float-right(
        v-if="!touchChangeGridSize",
        @click="touchChangeCellPosition = !touchChangeCellPosition, touchChangeCellSize = !touchChangeCellSize",
        round,
        color="black"
        )
        q-icon(name="repeat")
      // q-btn.on-left.float-right(
        v-if="touchChangeGridSize",
        round,
        color="black",
        @click="updateAssistantCell()"
        )
        | axis



</template>

<script>
import { QPageSticky, QBtn, QIcon, QModal, QContextMenu, QList, QItem, QInput } from 'quasar'
import { drawerGrid } from '../../components/mosys/'
import { xButton } from '../../components/shared/'
import backButton from '../../components/shared/backButton'
export default {
  components: {
    QPageSticky,
    QBtn,
    QIcon,
    QModal,
    QContextMenu,
    QList,
    QItem,
    QInput,
    drawerGrid,
    xButton,
    backButton
  },
  data () {
    return {
      assistantCell: {
        x: 1,
        y: 1,
        width: 1,
        height: 1,
        display: 'none'
      },
      cellTempStyle: { backgroundColor: 'blue', gridColumn: '0 / 0', gridRow: '0 / 0' },
      cellHeight: 0,
      currentCell: '',
      close: '',
      editMode: 'true',
      gridMode: true,
      gridDeleteMode: false,
      gridDimensions: { gridWidth: 0, gridHeight: 0, cellWidth: 0, cellHeight: 0 },
      gridResizeAxis: false,
      gridStyle: {},
      iconModal: 'clear',
      inputAddCell: '',
      overlay: '',
      ratio: 16 / 9,
      selectedCell: '',
      selectedShadowCell: {},
      shadowGridCells: [],
      spalten: 12,
      stickiesGrid: [{
        label: 'abc',
        visibility: this.gridResizeAxis,
        value: true,
        position: 'top'
      }, {
        label: 'def',
        visibility: this.gridResizeAxis,
        value: true,
        position: 'bottom'
      }],
      switchSide: true,
      targetBack: 'mosys',
      touchChangeCellPosition: false,
      touchChangeCellSize: false,
      touchChangeGridSize: false,
      touchModal: false,
      v: '',
      viewMode: 'false',
      zeilen: 8,
      cells: [{
        id: '1',
        type: 'headline',
        text: 'Hier steht eine Headline.',
        url: '',
        x: 1,
        y: 1,
        width: 3,
        height: 1,
        isActive: true
      }, {
        id: '2',
        type: 'image',
        text: 'title 2222222',
        url: 'https://assets.rbl.ms/9878994/origin.jpg',
        x: 4,
        y: 2,
        width: 2,
        height: 3,
        isActive: false
      }, {
        id: '3',
        type: 'image',
        text: 'abcdef',
        url: 'https://www.stuttgarter-ballett.de/content-images/ballettgaleriegross/38393/presse_forsythe_the_second_detail_002.jpg',
        x: 3,
        y: 4,
        width: 4,
        height: 3,
        isActive: false
      }, {
        id: '4',
        type: 'headline',
        text: 'Noch eine Headline.',
        x: 8,
        y: 6,
        width: 3,
        height: 2,
        isActive: false
      }, {
        id: '5',
        type: 'video',
        text: 'Video-Zelle, bis jetzt noch ohne Inhalt.',
        url: '',
        x: 2,
        y: 6,
        width: 3,
        height: 3,
        isActive: false
      }, {
        id: '6',
        type: 'text',
        text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est.',
        url: '',
        x: 1,
        y: 2,
        width: 2,
        height: 3,
        isActive: false
      }, {
        id: '7',
        type: 'text',
        text: 'Consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est. Consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est. Consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est.',
        url: '',
        x: 8,
        y: 2,
        width: 4,
        height: 2,
        isActive: false
      }, {
        id: '0',
        type: '',
        text: '',
        url: '',
        x: 10,
        y: 5,
        width: 3,
        height: 2,
        isActive: false
      }]
    }
  },
  mounted () {
    this.updateGridDimensions()
    this.shadowGrid()
  },
  methods: {
    handlerGridMode () {
      this.gridMode = !this.gridMode
    },
    handlerSwitchSide () {
      this.switchSide = !this.switchSide
      console.log(this.switchSide)
    },
    handlerEditMode () {
      this.editMode = !this.editMode
      console.log(this.editMode)
    },
    handlerDeleteRowOrColumn () {
      alert('delete: not yet')
    },
    updateAssistantCell (val) {
      if (this.gridResizeAxis) {
        this.assistantCell.x = 1
        this.assistantCell.y = this.selectedShadowCell.y
        this.assistantCell.width = this.spalten
        this.assistantCell.height = 1
      } else {
        this.assistantCell.x = this.selectedShadowCell.x
        this.assistantCell.y = 1
        this.assistantCell.width = 1
        this.assistantCell.height = this.zeilen
      }
      this.assistantCell.display = 'block'
      /* return this.assistantCell = {
        x: 1,
        y: 1,
        bg: 'rgba( 255, 255, 0, 1 )',
        shadow: ''
      } */
    },
    handlerAddColumn (val, dir) {
      console.log(this.selectedShadowCell.x)
      this.spalten += 1
      if(dir == 'right') {
        this.cells.map( cell => {
          if(cell.x > val.x) {
            cell.x += 1
          }
        })
      } else {
        this.selectedShadowCell.x += 1
        this.cells.map( cell => {
          if(cell.x >= val.x - 1) {
            cell.x += 1
          }
        })
      }
      this.updateGridDimensions()
      this.shadowGrid()
    },
    handlerAddRow (val, dir) {
      this.zeilen += 1
      if(dir == 'top') {
        this.selectedShadowCell.y += 1
        this.cells.map( cell => {
          if(cell.y >= val.y - 1) {
            cell.y += 1
          }
        })
      } else {
        this.cells.map( cell => {
          if(cell.y > val.y) {
            cell.y += 1
          }
        })
      }
      this.updateGridDimensions()
      this.shadowGrid('', val.y)
    },
    shadowGrid (val_col, val_row) {
      this.shadowGridCells = []
      let z
      let s
      let ja
      for(z = 1; z <= this.zeilen; z++) {
        for(s = 1; s <= this.spalten; s++) {
          if( z == val_row + 1 ) { ja = true }
          else { ja = false }
          this.shadowGridCells.push({ x: s, y: z, id: s + '-' + z, justAdded: ja })
        }
      }
    },
    setCellPosition (cell) {
      return {
        'grid-column': cell.x + ' / span ' + cell.width,
        'grid-row': cell.y + ' / span ' + cell.height
      }
    },
    getGridBackgroundSVG (cell) {
      return `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%'><defs><pattern id='smallGrid' width='${cell.width}' height='${cell.height}' patternUnits='userSpaceOnUse'><path d='M ${cell.width} 0 L 0 0 0 ${cell.height}' fill='none' stroke='gray' stroke-width='0.5'/></pattern></defs><rect width='100%' height='100%' fill='url(#smallGrid)' /></svg>")`
    },
    updateGridDimensions () {
      let elWidth = this.$el.offsetWidth
      let elHeight = this.$el.offsetHeight

      this.gridStyle = {
        'height': '100%',
        'width': elHeight / this.zeilen * this.ratio * this.spalten + 'px',
        'grid-template-columns': 'repeat(' + this.spalten + ', 1fr)',
        'grid-template-rows': 'repeat(' + this.zeilen + ', 1fr)',
        'background-image': this.getGridBackgroundSVG({ width: elHeight / this.zeilen * this.ratio, height: elHeight / this.zeilen }),
        'border': '0px solid yellow'
      }

      this.cellHeight = (this.$el.offsetHeight - 50) / this.zeilen
    },
    drag (cell) {
      // console.log(cell.x)
      this.cellTempStyle = {
        backgroundColor: 'orange',
        'grid-column': cell.x + ' / span ' + cell.width,
        'grid-row': cell.y + ' / span ' + cell.height
      }
    },
    dragStart (event, cell) {
      let elContainerBoundingBox = this.$el.getBoundingClientRect()
      let elBoundingBox = event.srcElement.getBoundingClientRect()
    },
    dragCellEnd (cell) {
      // let elContainerBoundingBox = this.$el.getBoundingClientRect()
      // let x = (event.clientX - elContainerBoundingBox.x) / this.spalten
      // let y = (event.clientY - elContainerBoundingBox.y) / this.zeilen
      let cellWidth = this.cellHeight * this.ratio
      cell.x = Math.ceil( event.clientX / cellWidth )
      cell.y = Math.ceil( event.clientY / this.cellHeight )
      this.drag(cell)
    },
    getGridPositionForEvent (event, cell) {
      // offset = {x: 0, y: 0} // TODO: remove quick fix
      let elContainerBoundingBox = this.$el.getBoundingClientRect()
      // let x = event.clientX + this.$el.scrollLeft - elContainerBoundingBox.x - offset.x
      // let y = event.clientY + this.$el.scrollTop - elContainerBoundingBox.y - offset.y
      let x = event.clientX + this.$el.scrollLeft - elContainerBoundingBox.x
      let y = event.clientY + this.$el.scrollTop - elContainerBoundingBox.y
      // x = Math.ceil(x / this.gridDimensions.full.cell.width)
      // y = Math.ceil(y / this.gridDimensions.full.cell.height)
      x = Math.ceil(x / this.gridDimensions.full.cell.width)
      y = Math.ceil(y / this.gridDimensions.full.cell.height)
      return {x: x, y: y}
    },
    handleCellResizerDragStart (event, cell) {
      // console.log('resize: ' + event + cell)
    },
    handleCellResizerDragEnd (event, cell) {
      event.stopPropagation()
      let elContainerBoundingBox = this.$el.getBoundingClientRect()
      // let x = event.clientX + this.$el.scrollLeft - elContainerBoundingBox.x
      // let x = (event.clientX - elContainerBoundingBox.x) / this.spalten
      let x = (event.clientX - elContainerBoundingBox.x) / this.spalten
      let y = (event.clientY - elContainerBoundingBox.y) / this.zeilen
      let cellWidth = this.cellHeight * this.ratio
      // let gridWidth = cellWidth * this.spalten
      // let newWidth = Math.ceil(gridWidth / cellWidth)
      // let position = this.getGridPositionForEvent(event, cell)
      // console.log(event.clientX / cellWidth )
      // cell.x2 = 'span ' + Math.ceil( x )
      // cell.x2 = Math.ceil( event.clientX / cellWidth )
      cell.width = Math.ceil( event.clientX / cellWidth ) - cell.x
      cell.height = Math.ceil( event.clientY / this.cellHeight ) - cell.y
      // cell.height = Math.max(1, 1 + position.y - cell.y)
      // cell.width = Math.max(1, 1 + position.x - cell.x)
      // cell.height = Math.max(1, 1 + position.y - cell.y)
      // this.cellUIStates[cell.uuid].beingResized = false
      // this.tmpCells = []
      // this.updateCellStore(cell)
    },
    addCell(val) {
      this.touchModal = !this.touchModal
      // console.log(this.assistantCell.x)
      // console.log(this.selectedShadowCell.y)
      this.cells.push({
        id: this.cells.length + 1,
        type: 'headline',
        text: val,
        x: this.assistantCell.x,
        y: this.selectedShadowCell.y,
        width: 1,
        height: 1,
        isActive: false
      })
      // console.log(this.cells)
      this.inputAddCell = ''
    },
    touchAddCell () {
      this.touchModal = !this.touchModal
    },
    touchChangeCellPositionX (val) {
      if(val) {
        this.cells.find(x => x.id === this.currentCell).x -= 1
      } else {
        this.cells.find(x => x.id === this.currentCell).x += 1
      }
    },
    touchChangeCellPositionY (val) {
      if(val) {
        this.cells.find(x => x.id === this.currentCell).y -= 1
      } else {
        this.cells.find(x => x.id === this.currentCell).y += 1
      }
    },
    cellResizeX (val) {
      if(val) {
        this.cells.find(x => x.id === this.currentCell).width -= 1
      } else {
        this.cells.find(x => x.id === this.currentCell).width += 1
      }
    },
    cellResizeY (val) {
      if(val) {
        this.cells.find(x => x.id === this.currentCell).height -= 1
      } else {
        this.cells.find(x => x.id === this.currentCell).height += 1
      }
    }
  }
  // name: "show"
}
</script>

<style scoped lang="stylus">


  .activeShadowCell
    // background black!important
    border 0!important
    // transform scale( .8 )

  .activecell
    // background #b8a581!important
    // background #ff6a44!important
    opacity 1!important
    z-index 1
    box-shadow 1rem 1rem 2rem 0 rgba( 0, 0, 0, .35 )
    // transform scale(1.2)

  .addedCell
    animation addedCell ease 750ms
    animation-iteration-count 1

  @keyframes addedCell {
    0% { background-color: #2DB84B; }
    100% { background-color: transparent; }
    }

  .assistant-cell
    border-right 1px solid white
    border-bottom 1px solid white
    // background linear-gradient(transparent 33%, rgba( 255, 255, 255, .5 ) )
    // background linear-gradient(to right, transparent 33%, rgba( 0, 0, 0, .2 ) )
    // background rgba( 0, 0, 0, .2 )!important
    z-index 2

  .deletemode
    background red!important
    opacity .2
    border 0

  .cell-grid
    display grid

    .cell-item-shadow
      background-color transparent

    .cell-item-shadow:hover
      border 0px solid rgba( 255, 255, 255, .25 )

    .cell-item
      // background linear-gradient( -235deg, red, white)
      // background linear-gradient( -235deg, white, transparent)
      // background linear-gradient( to right, white, transparent)
      overflow-y scroll
      // transition opacity ease 250ms
      position relative

      .resize-icon
        position absolute
        bottom 0
        right 0
        cursor pointer
        visibility hidden
        opacity .25
        width 3em
        height 3em
        background-color transparent

      .resize-icon div
        position absolute
        bottom 0
        right 2px

      .resize-icon:hover
        opacity 1

    .cell-item:hover
      // opacity 1
      z-index 1
      // background white

    .cell-item > div
      // display none

    .cell-item:hover .resize-icon
      visibility visible

    .cell-item-temp
      background-color red

    .editmode
      opacity .35

  .font-sm
    font-size 3vh

  .inactiveIcon
    opacity .35

  .no-select
    -webkit-touch-callout none
    -webkit-user-select none
    -khtml-user-select none
    -moz-user-select none
    -ms-user-select none
    user-select none

  .grid-wrap
    border 0px solid blue
    height calc(100vh - 50px)
    position relative

  .q-page-sticky
    z-index 3

  .rotate
    transform rotate(180deg)

  .zindex
    z-index 2
    // background rgba( 255, 255, 255, .2 )!important

  .mobaNoBackgroundImage
    background-image none!important
</style>
