const m = require('mithril');

import user from './user';

const usersList = {
    oninit: user.loadList,
    view: function() {
        return m(".Users",
            m(".Users-list", user.list.map(function(user) {
                return m("li.Users-listItem", user.name)
            }))
        )
    }
};

module.exports = usersList;