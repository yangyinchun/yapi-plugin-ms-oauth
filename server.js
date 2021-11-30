const request = require('request');
const controller = require('./controller');
const jwt_decode = require('jwt-decode');

module.exports = function (options) {
  this.bindHook('third_login', (ctx) => {
    let token = ctx.request.body.token || ctx.request.query.token;
    user_info = jwt_decode(token);
    console.log(user_info);
    let ret = {
      email: user_info.email,
      username: user_info.name
    }
    return Promise.resolve(ret);
  });

  this.bindHook('add_router', function(addRouter) {
    addRouter({
      controller: controller,
      method: 'get',
      path: 'oauth2/callback',
      action: 'oauth2Callback'
    });
  });
}