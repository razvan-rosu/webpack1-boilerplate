const m = require('mithril');

const user = {
  list: [],

  loadList: function() {
    return m.request({
      method: "GET",
      url: "/users",
      withCredentials: true,
    })
    .then(function(result) {
      user.list = result
    });
  }
};

module.exports = user;
