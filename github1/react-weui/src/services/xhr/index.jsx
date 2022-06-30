import axios from 'axios';
import Qs from 'qs'

const http = {};
http.get = (url, data, succ, err) => {
    axios.get(url, {params: data})
        .then((res) => {
            succ(res.data)
        })
        .catch((error) => {
            err ? err(error) : false
        })
}

http.post = (url, data, succ, set, err) => {

    let jsonData = set ? Qs.stringify(data) : data;

    axios.post(url, jsonData, set)
        .then((res) => {
            console.log(res)
            succ(res.data)
        })
        .catch((error) => {
            err ? err(error) : false
        })
}

http.put = (url, data, succ, err) => {
    axios.put(url, data)
        .then((res) => {
            succ(res.data)
        })
        .catch((error) => {
            err ? err(error) : false
        })
}

http.delete = (url, data, succ, err) => {
    axios.delete(url, data)
        .then((res) => {
            succ(res.data)
        })
        .catch((error) => {
            err ? err(error) : false
        })
}

export default http;
