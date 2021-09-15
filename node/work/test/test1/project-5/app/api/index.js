const axios = require('axios')
const {apiPrefix} = require('../config.json')

function getActive(data) {
    return axios.get(`${apiPrefix}/active`, data)
}

function getConnect(data) {
    return axios.get(`${apiPrefix}/connect`, data)
}

function creatTunnel(data) {
    return axios.get(`${apiPrefix}/tunnel`, data)
}

function add(data) {
    return axios.get(`${apiPrefix}/add`, data)
}

module.exports = {
    getActive,
    getConnect,
    creatTunnel,
    add
}