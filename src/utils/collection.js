import _ from 'lodash'

const searchBy = (collection, filter, filters) => {
  if (filter.length === 0) {
    return collection
  }

  filter = _.toLower(filter)

  return collection.filter(model => {
    let fileds = _.values(_.pick(model, filters))

    return fileds.filter(field => _.toLower(field).indexOf(filter) !== -1).length > 0
  })
}

export {
  searchBy
}
