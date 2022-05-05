import patientsData from '../data/patients.json'
import { NewPatient, NonSensitiveDataPatient, Patient } from '../types'
import { v1 as uuid } from 'uuid'

const removeSensitiveData = ({ id, name, dateOfBirth, gender, occupation }: Patient): NonSensitiveDataPatient => {
  return {
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }
}

const getPatients = (): Array<NonSensitiveDataPatient> => {
  return patientsData.map((patient) => {
    return removeSensitiveData(patient)
  })
}

const addPatient = (patient: NewPatient): NonSensitiveDataPatient => {
  const newPatient = {
    id: uuid(),
    name: patient.name,
    dateOfBirth: patient.dateOfBirth,
    ssn: patient.ssn,
    gender: patient.gender,
    occupation: patient.occupation
  }

  patientsData.push(newPatient)

  return removeSensitiveData(newPatient)
}

export default { getPatients, addPatient }