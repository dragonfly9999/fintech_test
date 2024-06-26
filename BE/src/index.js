import express from "express";
import rootRoute from "./routers/rootRoute.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.listen(8080);

// app.get()

// yarn squelize-auto -h localhost -d db_fintech2 -u root -x 1234 -p 3308 --dialect mysql -o ./src/models -l esm

app.use(rootRoute);
