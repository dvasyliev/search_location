<template>
  <div class="index-page">
    <el-input
      v-model="filter"
      placeholder="Search"
      clearable/>
    <br><br>

    <el-alert
      :title="`Total currency: ${totalCurrencyFiltered}`"
      type="info"
      show-icon
      :closable="false"/>
    <br>

    <el-table
      class="index-page__locations"
      empty-text="Sorry, there is nothing to show..."
      :data="locationsFiltered">
      <el-table-column
        type="index"
        width="60"
        align="left"/>

      <el-table-column
        label="Name"
        width="200"
        align="left"
        sortable
        sort-by="name">
        <template slot-scope="scope">
          <el-input
            v-if="editing === scope.row.id"
            v-model="model.name"/>
          <span v-else>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="Location"
        width="200"
        align="left"
        sortable
        sort-by="location">
        <template slot-scope="scope">
          <el-input
            v-if="editing === scope.row.id"
            v-model="model.location"/>
          <span v-else>{{ scope.row.location }}</span>
        </template>
      </el-table-column>

      <el-table-column
        prop="currency"
        label="Currency"
        align="right"
        header-align="right"
        sortable
        sort-by="currency">
        <template slot-scope="scope">
          <el-input-number
            v-if="editing === scope.row.id"
            v-model="model.currency"/>
          <span v-else>{{ currencyFormat(scope.row.currency) }}</span>
        </template>
      </el-table-column>

      <el-table-column>
        <template slot-scope="scope">
          <el-button
            v-if="editing !== scope.row.id"
            type="primary"
            icon="el-icon-edit"
            size="mini"
            circle
            @click="onEdit(scope)"/>
          <el-button
            v-if="editing === scope.row.id"
            type="success"
            icon="el-icon-check"
            size="mini"
            circle
            @click="onSave(scope)"/>
          <el-button
            v-if="editing === scope.row.id"
            type="info"
            icon="el-icon-close"
            size="mini"
            circle
            @click="onCancel(scope)"/>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'IndexPage',

  data() {
    return {
      filter: '',
      filterBy: [
        'name',
        'location',
        'currency'
      ],
      editing: false,
      model: {}
    }
  },

  computed: {
    ...mapState('locations', { locations: 'results' }),

    locationsFiltered() {
      if (this.filter.length === 0) {
        return this.locations
      }

      const filter = _.toLower(this.filter)

      return this.locations.filter(location => {
        let fileds = _.values(_.pick(location, this.filterBy))

        if (_.includes(this.filterBy, 'currency')) {
          fileds.push(this.currencyFormat(location.currency))
        }

        return fileds.filter(field => _.toLower(field).indexOf(filter) !== -1).length > 0
      })
    },

    totalCurrencyFiltered() {
      const sum = this.locationsFiltered
        .reduce((sum, current) => sum + current.currency, 0)

      return this.currencyFormat(sum)
    }
  },

  methods: {
    ...mapActions('locations', [
      'fetchAllLocations',
      'updateLocation'
    ]),

    currencyFormatter(row, column) {
      return this.currencyFormat(row.currency)
    },

    currencyFormat(value) {
      return `$${(value).toFixed(0).replace(/(\d)(?=(\d{3})+$)/g, '$&,')}`
    },

    onEdit(scope) {
      this.model = Object.assign({}, scope.row)
      this.editing = scope.row.id
    },

    onSave(scope) {
      this.updateLocation(this.model)
      this.editing = false
    },

    onCancel(scope) {
      this.model = {}
      this.editing = false
    }
  },

  mounted() {
    this.fetchAllLocations()
  }
}
</script>

<style lang="scss" scoped>
.index-page {
  width: 100%;
}
</style>
