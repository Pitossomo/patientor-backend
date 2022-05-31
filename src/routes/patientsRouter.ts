import express from 'express'
import patientsService from '../services/patientsService'
import { toNewEntry, toNewPatient } from '../utils'

const router = express.Router()

router.get('/', (_req, res) => {
  const patients = patientsService.getPatients()

  console.log('Fetching all patients')
  res.json(patients)
})

router.get('/:id', (req, res) => {
  console.log('Fetching the required patient')
  const patient = patientsService.getPatient(req.params.id)

  res.json(patient)
})

router.post('/:id/entries', (req, res) => {
  try {
    const newEntry = toNewEntry(req.body)

    if (!newEntry) throw new Error(`Invalid or missing entry type: ${req.body.type}`)

    const result = patientsService.addEntry(req.params.id, newEntry)

    console.log('Saving a new entry', result)
    res.json(result)

  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.'
    if (error instanceof Error) errorMessage += ' Error ' + error.message
    res.status(400).send(errorMessage)
  }
})

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body)
    const result = patientsService.addPatient(newPatient)

    console.log('Saving a patient', result)
    res.json(result)

  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.'
    if (error instanceof Error) errorMessage += ' Error ' + error.message
    res.status(400).send(errorMessage)
  }
})

export default router