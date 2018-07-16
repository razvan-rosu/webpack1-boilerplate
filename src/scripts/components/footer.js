const m = require('mithril');

import modal from './modal';

const message = {
    title: function(attrs) {
        return "Lorem ipsum";
    },
    view: function(ctrl, attrs) {
        return m("h2", "Dialog title");
    }
};

const footer = {
    view: function(ctrl) {
        return [
            m("footer.Footer",
                m("button[type='button'].Footer-button",
                    {onclick: modal.show.bind(modal, message)},
                    "This will display a reusable component in a popup"
                )
            ),
            m(modal)
        ];
    }
};

module.exports = footer;