import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://meme-api.com/gimme";

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    try {
        const result = await axios.get(`${API_URL}`);
        res.render("index.ejs", { image: result.data.url, user: result.data.author, title: result.data.title, sub: result.data.subreddit });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching memes");
    }
});

app.post("/", async (req, res) => {
    try {
        const subreddit = req.body.subreddit;
        const result = await axios.get(`${API_URL}/${subreddit}`);
        res.render("index.ejs", { image: result.data.url, user: result.data.author, title: result.data.title, sub: result.data.subreddit });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching memes");
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });