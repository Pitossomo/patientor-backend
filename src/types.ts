export interface Diagnosis {
  code: string,
  name: string,
  latin?: string
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  id: string,
  name: string,
  dateOfBirth: string,    // Why not to use Date type?
  gender: string,
  ssn: string,
  occupation: string
}

export type NewPatient = Omit<Patient, 'id'>

export type NonSensitiveDataPatient = Omit<Patient, 'ssn'>