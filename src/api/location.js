import _ from 'lodash'
import locations from '@/mocks/locations'

const fetchAll = (params) => {
  return new Promise((resolve, reject) => {
    resolve(_.filter(locations, params))
  })
}

export default {
  fetchAll
}
