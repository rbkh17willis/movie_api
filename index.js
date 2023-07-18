const express = require('express'),
   morgan = require('morgan'),
   fs = require('fs'),
   bodyParser = require('body-parser'),
   path = require('path');
   uuid = require('uuid');
const app = express();
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'})

app.use(morgan('combined',{stream: accessLogStream}));
let users = [
{
   id: 1,
   name:"Kim",
   favoriteMovie: []
},
{
   id: 2,
   name: "Joe",
   favoriteMovie:[]
},
{
   id: 1,
   name:"Steve",
   favoriteMovie: []
},
]

let movies = [
    {
      title: "Inception",
      genres: {
          name: "Action",
          description: "fast-paced and include a lot of action like fight scenes, chase scenes, and slow-motion shots",
      },
      description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
      directors: {
          name: "Chirstopher Nolan",
          born: "July 30, 1970",
          bio: "British and American filmmaker. Known for his Hollywood blockbusters with complex storytelling"

      }
  },

  {
      title: "Fantastic Mr. Fox",
      genres: {
          name: "Comedy",
          description: "Comedy is a genre of fiction that consists of discourses or works intended to be humorous or amusing by inducing laughter",
      },
      description: "Mr Fox is an anthropomorphic, tricky, and clever fox who lives underground beside a tree with his wife and four children.",
      directors: {
          name: "Wes Anderson",
          born: "May 1, 1969 ",
          bio: "Wesley Wales Anderson is an American filmmaker. His films are known for their eccentricity, unique visual and narrative styles, and frequent use of ensemble casts."
      }
  },

  {
      title: "Split",
      genres: {
          name: "Thriller",
          description: "Thriller is a genre of fiction with numerous, often overlapping, subgenres, including crime, horror and detective fiction."
      },
      description: "The film follows a man with dissociative identity disorder who kidnaps and imprisons three teenage girls in an isolated underground facility.",
      directors: {
          name: "M. Night Shyamalan",
          born: "August 6, 1970 ",
          bio: "American film director, screenwriter, and producer. He is best known for making original films with contemporary supernatural plots and twist endings."
      }
  },
 ];


app.use(express.static("public"));

app.use(morgan('combined', {stream: accessLogStream}));

//GET 
let logger = (req, res, next) => {
   console.log(req.url);
   next();
};
 
app.use(logger);
app.get('/', (req, res) => {
   res.send('Welcome to myFlix!');
}); 
   
// CREATE
app.post('/users', (req, res) => {
   const newUser = req.body;
   
       if (newUser.name) {
           newUser.id = uuid.v4();
           users.push(newUser);
           res.status(201).json(newUser);
       } else {
           res.status(400).send('Name field required.');
       }
   });
   
// UPDATE
app.put('/users/:id', (req, res) => {
   const { id } = req.params;
   const updatedUser = req.body;
   
   let user = users.find(user => user.id == id);
   
       if (user) {
           user.name = updatedUser.name;
           res.status(200).json(user);
       } else {
           res.status(400).send('User not found.')
       }
   }); 
   
// CREATE
app.post('/users/:id/:movieTitle', (req, res) => {
   const { id, movieTitle } = req.params;
   
   let user = users.find(user => user.id == id);
   
       if (user) {
           user.favoriteMovie.push(movieTitle);
           res.status(200).send(`${movieTitle} has been added to user's favorites`);
       } else {
           res.status(404).send('User not found.')
       }
   }); 
   
// DELETE 
app.delete('/users/:id/:movieTitle', (req, res) => {
   const { id, movieTitle } = req.params;
   
   let user = users.find(user => user.id == id);
   
       if (user) {
           user.favoriteMovie = user.favoriteMovie.filter(title => title!==movieTitle)
           res.status(200).send(`${movieTitle} has been removed from user's favorites`);
       } else {
           res.status(404).send('User not found.')
       }
   }); 
   
// DELETE 
app.delete('/users/:id', (req, res) => {
   const { id } = req.params;
   
   let user = users.find(user => user.id == id);
   
       if (user) {
           users = users.filter(user => user.id != id);
           res.status(200).send(`User ${id} has been deleted`);
       } else {
           res.status(404).send('User not found.')
       }
   }); 
   
// READ
app.get('/movies', (req, res) => {
       res.status(200).json(movies);
   });
   
// READ
app.get('/movies/:title', (req, res) => {
   const { title } = req.params;
   const movie = movies.find(movie => movie.title === title);
   
       if (movie) {
           res.status(200).json(movie); 
       } else {
           res.status(404).send('Could not find that movie.');
       }
   });
   
// READ
app.get('/movies/genres/:genreName', (req, res) => {
   const { genreName } = req.params;
   const genre = movies.find(movie => movie.genres.name === genreName).genres;
   
       if (genre) {
           res.status(200).json(genre); 
       } else {
           res.status(404).send('Could not find that genre.');
       }
   });
   
// READ
app.get('/movies/directors/:directorName', (req, res) => {
   const { directorName } = req.params;
   const director = movies.find(movie => movie.directors.name === directorName).directors;
   
       if (director) {
           res.status(200).json(director); 
       } else {
           res.status(404).send('Could not find that genre.');
       }
   });
   
app.use(express.static('public'));
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Error!');
});
app.listen(8088, () => {
    console.log('Your app is listening on port 8088.');
});