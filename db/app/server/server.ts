import * as express from "express";
import * as fs from "fs";

const   pathToPublic = `${__dirname}/../public`;

let app = express(),
    port: number = process.env.PORT || 1234,
    indexContent: string | undefined;
app.use(express.static(pathToPublic));
app.get("/", (req, res) => {
    if (indexContent) {
        res.send(indexContent);
    } else {
        indexContent = fs.readFileSync(`${pathToPublic}/index.html`, "UTF-8");
        res.send(indexContent);
    }
});
app.listen(port, () => {
    console.log(`Listening port ${port}`);
});