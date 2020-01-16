function getUsersURI(userName){
    return getGithubApiPath(`users/${userName}`);
}

function getGithubApiPath(relativePath){
    const githubApiUrl = process.env.GITHUB_API;
    return `${githubApiUrl}/${relativePath}`;
}
 
module.exports = { getUsersURI };