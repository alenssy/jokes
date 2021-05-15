import {Form} from './form.js';
import {Favourites} from './favourites.js';

export let jokesBlock = document.querySelector(`#jokesBlock`),
    favJokesBlock = document.querySelector(`#favJokesblock`);

let jokeForm = new Form(`jokeForm`, `https://api.chucknorris.io/jokes/`);
Favourites.getFavJokes();