import {Joke} from './joke.js'

export class Form{
    constructor(id, api){
        this.form = document.querySelector(`#${id}`);
        this.api = api;

        this.form.addEventListener('submit', this.submit.bind(this));
        this.getCategories();
        this.getRadio();
    }

    async submit(e){
        e.preventDefault();

        let type = document.querySelector(`input[name="joke_type"]:checked`);

        let url = this.api;

        let joke;
        let except = true;

        switch(type.value){
            case 'random':
                url += 'random';
            break;
            case 'categories':
                let category = document.querySelector('input[name=category]:checked');
                url += `random?category=${category.value}`;
			break;
            case 'search':
                let searchInput = document.querySelector(`#searchText`);
                if(searchInput.value){
                    url += `search?query=${searchInput.value}`;
                }else{
                    except = false;
                    searchInput.focus();
                    alert(`Enter search request`)
                }
            break;
        }

        if(except){
            joke = await this.request(url);

            if(joke.result && joke.result.length>0){
                joke = joke.result.map(joke => new Joke(joke))
            }else{
                joke = new Joke(joke)
            }
        }
    }

    

    async request(url){
		let xhr = await fetch(url),
			data = await xhr.json();

		return data;
	}

    async getCategories(){
        let categories = await this.request(`${this.api}categories`);
    
        categories = categories.map((category, index) => `<li>
            <label class="joke__category" data-set="${category}">
                <input type="radio" value="${category}" name="category" ${index===0 ? 'checked' : ''}>
                <span>${category}<span>
            </label>
        </li>`)
        .join('');

        let categoryList = document.querySelector(`#categoryList`);
        categoryList.innerHTML += categories;

    }

    getRadio(){
        let types = document.querySelectorAll(`input[name="joke_type"]`);

        types.forEach(type => type.addEventListener('click', this.displayFormEl));
    }

    displayFormEl(){
        let categoryBlock = document.querySelector('#categoryBlock');
        let searchField = document.querySelector('#searchText');
        
        switch(this.value){
            case 'random':
                categoryBlock.classList.remove('show');
                searchField.classList.remove('show');
            break;
            case 'categories':
                categoryBlock.classList.add('show');
                searchField.classList.remove('show');
            break;
            case 'search':
                searchField.classList.add('show');
                categoryBlock.classList.remove('show');
            break;
        }
    }
}