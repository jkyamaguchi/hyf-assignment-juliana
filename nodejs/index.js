import express from "express";
import fs from "fs";

const app = express();

app.use(express.json());

const txtFilePath = "C:/Users/Juliana/HYF/hyf-assignment-juliana/nodejs/week1";

app.get("/", (request, response) => {
    console.log("hello");

    const fileContent = fs.readFileSync(txtFilePath, "utf-8");
    response.send(fileContent);
});

app.post("/write", (req, res) => {
    const text = req.body.text;
    const name = req.body.name;
    if (!text) {
        res.send("not today");
    } else {
        const message = `\n'${name}' said: '${text}'`;
        fs.appendFileSync(txtFilePath, message);
        res.send("query page");
    }
});

app.listen(3000, () => {
    console.log("ready");
});