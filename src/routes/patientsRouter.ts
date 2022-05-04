import express from 'express'
import patientsService from '../services/patientsService'

const router = express.Router()

router.get('/', (_req, res) => {
  const patients = patientsService.getPatients()

  console.log('Fetching all patients')
  res.json(patients)
})

router.post('/', (req, res) => {
  const newPatient = req.body

  const result = patientsService.addPatient(newPatient)

  console.log('Saving a patient', result)
  res.json(result)
})


export default router