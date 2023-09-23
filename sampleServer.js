const express = require("express")
const cors = require("cors")
const fetch = require("cross-fetch")

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: `Swiggy's API wrapper is working ✔`,
    })
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})
app.post("/api/restaurants", async (req, res) => {
  const { latitude, longitude } = req.body

  console.log(req.body)

  const url = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${latitude}&lng=${longitude}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`

  fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      return response.json()
    })
    .then((data) => {
      console.log(data)
      res.json(data)
    })
    .catch((error) => {
      console.error(error)
      res.status(500).send("An error occurred")
    })
})
app.get("/api/restaurants/:id", async (req, res) => {
  const { id } = req.params
  // console.log(id)
  const url = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=20.275845&lng=85.776639&restaurantId=${id}&catalog_qa=undefined&submitAction=ENTER`

  fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      return response.json()
    })
    .then((data) => {
      // console.log(data);
      res.json(data)
    })
    .catch((error) => {
      console.error(error)
      res.status(500).send("An error occurred")
    })
})
app.listen(3000, () => {
  console.log(`Server running...`)
})
