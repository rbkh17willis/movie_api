const express = require("express");
const app = express();

let myTopTenMovies = [
    {
       title:      "Inception",
       year:       2010,
       director:   ["Christopher Nolan"],
    },
    {
       title:      "10 Things I Hate About You",
       year:       1999,
       director:   ["Gil Junger"],
    },
    {
       title:      "Crazy Rich Asians",
       year:       2018,
       director:   ["Jon M. Chu"],
    },
    {
       title:      "Blazing Saddles",
       year:       1974,
       director:   ["Mel Brooks"],
    },
    {
       title:      "Better Off Dead",
       year:       1985,
       director:   ["Savage Steve Holland"],
    },
    {
       title:      "Tarzan",
       year:       1999,
       director:   ["Chris Buck, Kevin Lima"],
    },
    {
       title:      "The Dark Knight",
       year:       2008,
       director:   ["Christopher Nolan"],
    },
    {
       title:      "Split",
       year:       2016,
       director:   ["M Night Shyamalan"],
    },
    {
       title:      "Shutter Island",
       year:       2010,
       director:   ["Martin Scorsese"],
    },
    {
       title:      "Fantastic Mr. Fox",
       year:       2009,
       director:   ["Wes Anderson"],
    }
 ];
 
 const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'})
app.use(express.static("public"));

app.use(morgan('combined', {stream: accessLogStream}));

app.use((err, req, res, next) => {
   console.error(err.stack);
   res.status(500).send('An error has occurred');
 });

app.get("/movies", (req, res) => {
   res.json(myTopTenMovies);
 });
 app.get("/", (req, res) => {
   res.send("This is a secret url with super top-secret content.");
 });
 app.listen(8080, () => {
   //console.log("Your app is listening on port 8080.");
 });