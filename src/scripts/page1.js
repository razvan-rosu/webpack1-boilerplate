console.log('Hello page1.js');

// Include mithril
const m = require('mithril');

const User = {
    list: [],
    loadList: function() {
        return m.request({
            method: "GET",
            url: "https://jsonplaceholder.typicode.com/users",
            withCredentials: true,
        })
        .then(function(result) {
            User.list = result
        });
    }
};

const UsersList = {
    oninit: User.loadList,
    view: function() {
        return m(".Users",
            m(".Users-list", User.list.map(function(user) {
                return m("li.Users-listItem", user.name)
            }))
        )
    }
};

const Header = {
    view: function() {
        return m('header.Header',
            m('h1.Header-title', 'Page 1: List of users')
        )
    }
};

/*
 * modal
 */

const modal = {
    _attrs: null,
    _component: null,

    show: function(component, attrs) {
        this._component = component;
        this._attrs = attrs;

        // If there is a callback argument we wrap it in a function that will hide the popup
        if (typeof this._attrs.callback === "function") {
            var callback = this._attrs.callback;
            this._attrs.callback = function() {
                callback.apply(null, arguments);
                this.hide();
            }.bind(this);
        }
    },

    hide: function() {
        this._attrs = null;
        this._component = null;
    },

    view: function(ctrl) {
        if (this._component === null) {
            return m("");
        }

        return m(".modal-container", [
            m(".modal", [
                m(".modal-header", [
                    m("button[type='button']", {onclick: this.hide.bind(this)}, "×"),
                    m("h4.modal-title", this._component.title ? this._component.title(this._attrs) : "")
                ]),
                m(".modal-body", m(this._component, this._attrs))
            ])
        ]);
    }
};

const message = {
    title: function(attrs) {
        return "Lorem ipsum";
    },
    view: function(ctrl, attrs) {
        return m("h2", "Dialog title");
    }
};

const Dialog = {
    view: function(ctrl) {
        return [
            m("footer.Footer",
                m("button[type='button'].Footer-dialog",
                    {onclick: modal.show.bind(modal, message)},
                    "This will display a reusable component in a popup"
                )
            ),
            m(modal)
        ];
    }
};

/*
 * Compose components into one page
 */

const Page = {
    view: function() {
        return m('div', [
            m(Header),
            m(UsersList),
            m('div.Flex-gap'),
            m(Dialog)
        ])
    }
}

m.mount(document.getElementById('Page1'), Page);