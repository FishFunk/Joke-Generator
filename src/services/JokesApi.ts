// **********
// Class for interfacing with the Jokes API
// Docs: https://github.com/15Dkatz/official_joke_api
// *********

import { Joke } from "../interfaces/joke";

class JokesApi {

    private randomJokeEndpoint = "https://official-joke-api.appspot.com/random_joke";

    public async fetchRandomJoke(): Promise<{ status: string, data?: Joke, message?: string }>{
        try{
            const resp = await fetch(this.randomJokeEndpoint);
            const json = await resp.json();
            return { status: 'OK', data: json };
        } catch (ex){
            console.error(ex);
            return { status: 'Error', message: ex.message ? ex.message : 'Failed to fetch joke' };
        }
    }
}

const instance = new JokesApi();
export default instance;

