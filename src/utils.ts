import { EntryWithoutId, Gender, HealthCheckRating, NewPatient } from "./types"

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String
}

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date))
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(param)
}

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name')
  }

  return name
}

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing date: ${date}`)
  }

  return date
}

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender: ${gender}`)
  }

  return gender
}

const parseSSN = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error(`Incorrect or missing ssn: ${ssn}`)
  }

  // TODO - check for valid SSN

  return ssn
}

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error(`Incorrect or missing occupation: ${occupation}`)
  }

  return occupation
}

const parseString = (stringToCheck: unknown, variableLabel: string): string => {
  if (!stringToCheck || !isString(stringToCheck)) {
    throw new Error(`Invalid or incorrect ${variableLabel}: ${stringToCheck}`)
  }

  return stringToCheck
}

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (!rating || !isHealthCheckRating(rating)) {
    throw new Error(`Incorrect or missing health check rating: ${rating}`)
  }

  return rating
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewHealthCheck = (params: any): EntryWithoutId => {
  const newEntry: EntryWithoutId = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    type: params.type,
    description: parseString(params.description, `description`),
    date: parseDate(params.date),
    specialist: parseString(params.specialist, `specialist`),
    healthCheckRating: parseHealthCheckRating(params.healthCheckRating)
  }

  return newEntry
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewOccupationalHealthcare = (params: any): EntryWithoutId => {
  const newEntry: EntryWithoutId = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    type: params.type,
    description: parseString(params.description, 'description'),
    date: parseDate(params.date),
    specialist: parseString(params.specialist, 'specialist'),
    employerName: parseString(params.employerName, 'employer name')
  }

  return newEntry
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewHospitalEntry = (params: any): EntryWithoutId => {
  const newEntry: EntryWithoutId = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    type: params.type,
    description: parseString(params.description, 'description'),
    date: parseDate(params.date),
    specialist: parseString(params.specialist, 'specialist'),
    discharge: {
      date: parseString(params.discharge.date, 'discharge date'),
      criteria: parseString(params.discharge.criteria, 'discharge criteria'),
    }
  }

  return newEntry
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewEntry = (params: any): EntryWithoutId | null => {

  if (!params.type || !isString(params.type)) return null

  switch (params.type) {
    case "HealthCheck":
      return toNewHealthCheck(params)
    case "OccupationalHealthcare":
      return toNewOccupationalHealthcare(params)
    case "Hospital":
      return toNewHospitalEntry(params)
    default:
      return null
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewPatient = ({ name, dateOfBirth, gender, ssn, occupation }: any): NewPatient => {
  const newPatient: NewPatient = {
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    gender: parseGender(gender),
    ssn: parseSSN(ssn),
    occupation: parseOccupation(occupation),
    entries: []
  }

  return newPatient
}