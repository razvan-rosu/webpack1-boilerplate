const m = require('mithril');

import header from './components/header';

import usersList from './components/userList';

import footer from './components/footer';

const Page = {
    view: function() {
        return m('.Page1', [
            m(header),
            m(usersList),
            m('div.Flex-gap'),
            m(footer)
        ])
    }
}

m.mount(document.getElementById('Page1'), Page);
