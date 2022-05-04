export interface Diagnosis {
  code: string,
  name: string,
  latin?: string
}

export type gender = "male" | "female" | "other"

export interface Patient {
  id: string,
  name: string,
  dateOfBirth: string,    // Why not to use Date type?
  gender: string,
  ssn: string,
  occupation: string
}

export type newPatient = Omit<Patient, 'id'>

export type NonSensitiveDataPatient = Omit<Patient, 'ssn'>