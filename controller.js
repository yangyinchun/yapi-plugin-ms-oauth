const baseController = require('controllers/base.js');
const yapi = require('yapi.js');
const https = require('https');
const querystring = require('querystring');

class oauth2Controller extends baseController {
  constructor(ctx) {
    super(ctx);
    this.$auth = true;
  }

  /**
   * oauth2回调
   * @param {*} ctx 
   */
  async oauth2Callback(ctx) {
    try {
      // 获取code和state  
      let oauthcode = ctx.request.query.code;
      if (!oauthcode) {
        return (ctx.body = yapi.commons.resReturn(null, 400, 'code不能为空'));
      }
      let oauthstate = ctx.request.query.state;
      if (!oauthstate) {
        return (ctx.body = yapi.commons.resReturn(null, 400, 'state不能为空'));
      }
      let ops = yapi.findPluginOptions('ms-oauth');
      // 通过code获取token
      let data = querystring.stringify({
        grant_type: 'authorization_code', 
        client_id: ops.appId,
        code: oauthcode,
        redirect_uri: ops.redirectUri,
        client_secret: ops.appSecret
      });
      let tokenResult = await this.requestInfo(ops, ops.tokenPath, 'POST', data).then(function(res) {
        let jsonRes = JSON.parse(res);
        ctx.redirect('/api/user/login_by_token?token=' + jsonRes.id_token);
      }).catch(function(rej) {
        return {
          status_code: rej.statuscode,
          message: rej.statusMessage
        };
      });
      return ctx.body = yapi.commons.resReturn(tokenResult, 401, "授权失败");
    } catch (err) {
      ctx.body = yapi.commons.resReturn(null, 400, err.message);
    }
  }

  /**
   * 请求封装
   * @param {*} host 
   * @param {*} port 
   * @param {*} path 
   */
  requestInfo(ops, path, method, data) {
    return new Promise((resolve, reject) => {
      let req = '';
      let https_client = https.request(
        {
          host: ops.hostname,
          path: path,
          //host: '127.0.0.1',
          //port: 5000,
          //path: '/1x1.jpg',
          method: method,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': data.length
          }
        },
        function(res) {
          res.on('error', function(err) {
            reject(err);
          });
          res.setEncoding('utf8');
          if (res.statusCode != 200) {
            reject({statuscode: res.statusCode, statusMessage: res.statusMessage});
          } else {
            res.on('data', function(chunk) {
              req += chunk;
            });
            res.on('end', function() {
              resolve(req);
            });
          }
        }
      );
      https_client.write(data);
      https_client.on('error', (e) => {
        reject({message: 'request error'});
      });
      https_client.end();
    });
  }
}

module.exports = oauth2Controller;