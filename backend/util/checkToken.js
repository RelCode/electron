const checkToken = (req) => {
    return req?.headers?.authorization?.replace('Bearer ','');
}

module.exports = checkToken;