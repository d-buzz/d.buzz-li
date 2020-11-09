const utils = require('../../services/utils')

const shortenUrl = (req,res) => {
    return res.json(utils.jsonResponse(null,'pagwait ra'));
    
}

const getOrigUrl = (req,res) => {
    return res.json(utils.jsonResponse(null,'pagwait ra'));
    // return res.redirect('https://d.buzz');
}

module.exports = {
    shortenUrl,
    getOrigUrl
}