const m = require('mithril');

const header = {
    view: function() {
        return m('header.Header',
            m('h1.Header-title', 'Page 1: List of users')
        )
    }
};

module.exports = header;