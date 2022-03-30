
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const usersRouter = require('./routers/users.js');
const cohortsRouter = require('./routers/cohorts.js');
const coursesRouter = require('./routers/courses.js');

const app = express();
app.use(cors())
app.use(express.json())

app.use('/users', usersRouter)
app.use('/cohorts', cohortsRouter)
app.use('/courses', coursesRouter)


app.get('/', (req, res) => {
  res.send('Welcome to my server!')
})

const port = process.env.PORT || 4000

app.listen(port, () => {
console.log(`Server listening on port ${port}!`)
})