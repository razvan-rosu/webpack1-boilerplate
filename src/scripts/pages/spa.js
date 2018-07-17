const m = require('mithril');

 /** 
  * Index Page
 */

import header from '../components/header';
import usersList from '../components/userList';
import footer from '../components/footer';

const index = { 
    view: () => m('.Spa', [
        m(header),
        m(usersList),
        m('div.Flex-gap'),
        m(footer)
    ])
}

 /** 
  * Hello Page
 */

import hello from '../components/hello';

 /**
  * Routing
  */

m.route.mode = 'hash';

m.route(document.getElementById("Spa-root"), '/', {
    "/": index,
    '/hello': {
        view: function() {
          return m(hello);
        }
    },
});
