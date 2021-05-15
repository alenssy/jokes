import {favJokesBlock} from './index.js';
import {Joke} from './joke.js';

export class Favourites{
    static getFavJokes(){
        favJokesBlock.innerHTML = ``;
        let favJokes = localStorage.getItem('favJokes');

        if(favJokes){
            favJokes = JSON.parse(favJokes);

            for(let key in favJokes){
                new Joke(favJokes[key].joke)
            }
        }
    }
}