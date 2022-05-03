import patientsData from '../data/patients.json'
import { Patient } from '../types'

const getPatients = (): Array<Omit<Patient, 'ssn'>> => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => {
    return {
      id,
      name,
      dateOfBirth,
      gender,
      occupation
    }
  })
}

export default { getPatients }