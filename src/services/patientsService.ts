import patientsData from '../data/patients'
import { NewPatient, PublicPatient, Patient } from '../types'
import { v1 as uuid } from 'uuid'

const removeSensitiveData = ({ id, name, dateOfBirth, gender, occupation, entries }: Patient): PublicPatient => {
  return {
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }
}

const getPatient = (id: string): Patient | undefined => {
  const patient = patientsData.find((patient) => patient.id === id)

  if (!patient) return undefined
  return patient
}

const getPatients = (): Array<PublicPatient> => {
  return patientsData.map(patient => {
    return removeSensitiveData(patient)
  })
}

const addPatient = (patient: NewPatient): PublicPatient => {
  const newPatient = {
    id: uuid(),
    name: patient.name,
    dateOfBirth: patient.dateOfBirth,
    ssn: patient.ssn,
    gender: patient.gender,
    occupation: patient.occupation,
    entries: []
  }

  patientsData.push(newPatient)

  return removeSensitiveData(newPatient)
}

export default { getPatients, addPatient, getPatient }