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

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthCareEntry extends BaseEntry {
  type: "OccupationalHealthcare",
  employerName: string;
  sickLeave: {
    startDate: string,
    endDate: string
  };
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: {
    date: string,
    criteria: string
  };
}

export type Entry = HospitalEntry | OccupationalHealthCareEntry | HealthCheckEntry

// Special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never
// Entry without id property
export type EntryWithoutId = UnionOmit<Entry, 'id'>