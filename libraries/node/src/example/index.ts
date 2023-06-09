import * as express from 'express'
import { authgJwt } from '../'

const app = express()

const jwt = authgJwt({
    secret: "04ca023b39512e46d0c2cf4b48d5aac61d34302994c87ed4eff225dcf3b0a218739f3897051a057f9b846a69ea2927a587044164b7bae5e1306219d50b588cb1",
    algorithms: ["HS512"],
    audience: 'http://localhost:5000',
    issuer: 'http://8080-victorgomez09-authg-9nlcliyhlbt.ws-eu98.gitpod.io'
})

app.get("/", (_req, res) => {
    res.json({ "data": "Hello world index" })
})

app.get("/protected", jwt, (_req, res) => {
    res.json({ "data": "Hello world protected" })
})

app.get("/protected2", jwt, (_req, res) => {
    res.json({ "data": "Hello world protected 2" })
})

app.listen(5000, () => console.log('server on port 5000'))