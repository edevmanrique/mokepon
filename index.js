const express = require("express")
const cors = require("cors")

const app = express()
app.use(express.static('public'))
app.use(cors())
app.use(express.json())

const players = []

class Player {
    constructor(id) {
        this.id = id;
    }

    setMokepon(mokepon) {
        this.mokepon = mokepon;
    }

    updatePosition(x, y){
        this.x = x;
        this.y = y;
    }
}

class Mokepon {
    constructor(name) {
        this.name = name;
    }
}

app.get("/join", (req, ans) => {
    const id = `${Math.ceil(Math.random() * 1000)}`
    const player = new Player(id);
    players.push(player);

    ans.setHeader("Access-Control-Allow-Origin", "*")

    ans.send(id)
})

app.post("/mokepon/:playerId", (req, ans) => {
    const playerId = req.params.playerId || ""
    const mokeponName = req.body.mokepon || ""
    const mokepon = new Mokepon(mokeponName)

    const playerIndex = players.findIndex((player) => playerId === player.id)

    if (playerIndex >= 0) {
        players[playerIndex].setMokepon(mokepon);
    }

    ans.end()
})

app.post("/mokepon/:playerId/position", (req, ans) => {
    const playerId = req.params.playerId || ""
    const x = req.body.x || 0
    const y = req.body.y || 0

    const playerIndex = players.findIndex((player) => playerId === player.id)

    if (playerIndex >= 0) {
        players[playerIndex].updatePosition(x, y);
    }

    const enemies = players.filter((player) => playerId !== player.id)

    ans.send({
        enemies
    })
})

app.listen(8080, () => {
    console.log('Server active')
})