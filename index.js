const express = require("express")
const cors = require("cors")
const app = express()

require("dotenv").config()

app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 3000

app.get("/", (req, res) => {
  res.send("Hello from Sever")
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
