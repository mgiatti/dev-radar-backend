const axios = require('axios');
const githubApiUtils = require('../utils/githubApiUtils');
const Dev = require('../models/Dev');

module.exports = {
    async index(req,resp) {
        let devs = await Dev.find();
        return resp.json(devs);
    },
    async store(req,resp) {
        const { github_username, techs, longitude, latitude } = req.body;
        let dev = await Dev.findOne({ github_username });
        if(!dev){
            const techsArray = techs.split(",").map(tech => tech.trim());
            const githubApiResponse = await axios.get(githubApiUtils.getUsersURI(github_username));
            const { name = login, avatar_url, bio } = githubApiResponse.data;
            const location = {
                type: "Point",
                coordinates: [longitude, latitude]
            }
            console.log(location);
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            })
        }
       
        return resp.json(dev);
    }
}