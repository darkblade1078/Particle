import { dogData } from 'src/interfaces';
import superagent from 'superagent';

export default class miscApis {

    async randomDogApi(): Promise<dogData> {

        try {
            return (await superagent.get(`https://dog.ceo/api/breeds/image/random`)).body;
        }
        catch(err) {

            return {
                message: `Failed to get dog: ${err}`,
                status: 'Failed'
            };
        }
    }
}