import axios from 'axios';

export default {
    getAll() {
        return axios.get('/api').then((data) => {
            return data.data;
        });
    },
    getData(id) {
        return axios.get(`/api/${id}`).then((data) => {
            return data.data;
        });
    }
}
