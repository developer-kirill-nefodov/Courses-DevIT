import axios from 'axios';

import { apiPrefix } from '../../config.json';

export default {
    listHeroes() {
        return axios.get(`${apiPrefix}/users`);
    },

    updateHero(id, data){
        return axios.patch(`${apiPrefix}/users/${id}`, data);
    },

    createHero(data) {
        return axios.post(`${apiPrefix}/users`, data);
    },

    deleteHero(id) {
        return axios.delete(`${apiPrefix}/users/${id}`);
    }
}