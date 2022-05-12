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
  occupation: string,
  entries: Entry[]
}

export type NewPatient = Omit<Patient, 'id'>

//export type NonSensitiveDataPatient = Omit<Patient, 'ssn'>
//export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>
export type PublicPatient = Omit<Patient, 'ssn'>

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
}