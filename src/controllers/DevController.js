const axios = require('axios');
const githubApiUtils = require('../utils/githubApiUtils');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const websocket = require('../websocket');
module.exports = {
    async index(req,resp) {
        let devs = await Dev.find();
        return resp.json(devs);
    },
    async store(req,resp) {
        const { github_username, techs, longitude, latitude } = req.body;
        let dev = await Dev.findOne({ github_username });
        if(!dev){
            const techsArray = parseStringAsArray(techs);
            const githubApiResponse = await axios.get(githubApiUtils.getUsersURI(github_username));
            const { avatar_url, bio } = githubApiResponse.data;
            const name = githubApiResponse.data.name != null ? githubApiResponse.data.name : githubApiResponse.data.login;
            const location = {
                type: "Point",
                coordinates: [longitude, latitude]
            }

            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            })
            const sendTo = websocket.findConnections({ latitude, longitude }, techsArray);
            if(sendTo.length > 0){
                websocket.sendMessage(sendTo, 'new-dev', dev);
            }
            
        }
       
        return resp.json(dev);
    },
    async update(req,resp) {
        const { github_username, techs, longitude, latitude, sync_github } = req.body;
        let dev = await Dev.findOne({ github_username });
        if(dev){
            if(sync_github){
                const githubApiResponse = await axios.get(githubApiUtils.getUsersURI(github_username));
                if(githubApiResponse.data.avatar_url.name){
                    dev.name = githubApiResponse.data.avatar_url.name;
                }
                dev.avatar_url = githubApiResponse.data.avatar_url;
                dev.bio  = githubApiResponse.data.bio;
            }

            const techsArray = parseStringAsArray(techs);
           
            const location = {
                type: "Point",
                coordinates: [longitude, latitude]
            }
            dev.techs = techsArray;
            dev.location = location;
            await dev.save();
        }
       
        return resp.json(dev);
    },
    async destroy(req,resp) {
        const { github_username } = req.body;
        await Dev.findOneAndDelete({ github_username });
        return resp.json({ status: "The dev was deleted successfully"});
    }
}