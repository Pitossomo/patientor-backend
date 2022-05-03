import pingRouter from './routes/pingRouter'
import diagnosesRouter from './routes/diagnosesRouter'

import express from 'express'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())

const PORT = 3000

app.use('/api/ping', pingRouter)
app.use('/api/diagnoses', diagnosesRouter)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})