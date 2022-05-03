import diagnosesData from '../data/diagnoses.json'
import { diagnosis } from '../types'

const getDiagnoses = (): Array<diagnosis> => {
  return diagnosesData
}

export default { getDiagnoses }