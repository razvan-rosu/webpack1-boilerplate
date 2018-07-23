const m = require('mithril');

const hello = {
    view: function() {
        return m('section.Hello', [
                m('h1.Hello-title', 'Hey! Howdy! Hi!'),
                m('p.Hello-text', 'This is component loaded as a page on a route change event...')
            ]
        )
    }
};

module.exports = hello;