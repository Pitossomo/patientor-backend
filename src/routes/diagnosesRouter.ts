import express from 'express'
import diagnosesService from '../services/diagnosesService'

const router = express.Router()

router.get('/', (_req, res) => {
  const diagnoses = diagnosesService.getDiagnoses()

  console.log('Fetching all diaries')
  res.send(diagnoses)
})

export default router