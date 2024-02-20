const uuid = require('uuid').v4;
const sessions = {}

const auth = {
    validateUsername: function (username) {
        if (!username || username == 'dog' || !/^[a-zA-Z0-9]+$/.test(username)) {
            return false
        }
        return true;
    },

    createUserSession: function (username) {
        const sid = uuid();
        sessions[sid] = { username };
        return sid;
    },

    validateSession: function (sid, username) {
        return sessions[sid]["username"] === username;
    },

    getUsernameFromSid(sid) {
        return sessions[sid]["username"];
    },

    checkValidSid: function (sid) {
        if (sessions[sid]) {
            return true
        }
        return false
    },

    removeSession: function (sid) {
        if (auth.checkValidSid(sid)) {
            delete sessions[sid];
        }
    }
}

module.exports = auth;