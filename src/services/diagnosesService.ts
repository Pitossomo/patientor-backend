import diagnosesData from '../data/diagnoses.json'
import { Diagnosis } from '../types'

const getDiagnoses = (): Array<Diagnosis> => {
  return diagnosesData
}

export default { getDiagnoses }