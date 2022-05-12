import express from 'express'
import patientsService from '../services/patientsService'
import { toNewPatient } from '../utils'

const router = express.Router()

router.get('/', (_req, res) => {
  const patients = patientsService.getPatients()

  console.log('Fetching all patients')
  res.json(patients)
})

router.get('/:id', (req, res) => {
  const patient = patientsService.getPatients().filter(p => p.id === req.params.id)

  console.log('Fetching the required patient')
  res.json(patient)
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