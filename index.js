const express = require('express');
const app = express()
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const Path = require("path")

const PORT = process.env.PORT || 3000

app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser('koke0f0k3finvjjif3'))

app.get("/favicon.ico", (req, res) => {
    res.sendFile(Path.join(__dirname, './favicon.ico'))
})

app.get("/", (req, res) => {
    res.setHeader("Content-Type", "text/html; charset=utf-8")

    res.end(`
        <h1>Фёдоров App</h1>
        <h3>Напиши своё имя и фамилию, и ты узнаешь, насколько ты лучше Артёма</h3>
        <form action="/create_result/" method="POST">
            <label>Твоё Имя</label><input title="Разрешено использование только русских символов" pattern="^[А-Яа-яЁё\s]+$" autocomplete="off" type="text" name="your_name" style="margin-left: 20px"/> <br /> <br />
            <label>Твоя фамилия</label><input title="Разрешено использование только русских символов" pattern="^[А-Яа-яЁё\s]+$" autocomplete="off" type="text" name="your_sirname" style="margin-left: 20px"/> <br /> <br />
            <label>Любимая цитата</label><input autocomplete="off" type="text" name="your_blockquote" style="margin-left: 20px"/> <br /> <br />
            <input type="submit">
        </form>
    `)
})

app.post("/create_result/", (req, res) => {
    res.status(200)
    res.setHeader("Content-Type", "text/html; charset=utf-8")

    const recievedData = req.body
    const randomPercent = Math.round(Math.random() * 100)

    if (recievedData.your_name.toLowerCase() === "Артём".toLowerCase() || recievedData.your_sirname.toLowerCase() === "Фёдоров".toLowerCase()) {
        res.end("<h1>Артём, ты всё ещё ничтожество!</h1>")
    } else {
        res.end(`
            <h2 style="display: inline-block">${recievedData.your_name}</h2><strong>, вы лучше Артёма на целых ${randomPercent}%!</strong>
        `)
    }
})

app.listen(PORT, () => {
    console.log("The server has been listened")
})