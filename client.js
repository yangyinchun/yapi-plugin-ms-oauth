import React from 'react'

module.exports = function (options) {
  const handleLogin = () => {
    const { hostscheme, hostname, redirectUri, authPath, appId } = options;
    let ret = encodeURIComponent(redirectUri);
    let redirectURL = hostscheme + "://" + hostname + authPath  + '?client_id=' 
      + appId + '&response_type=code&response_mode=query&prompt=&state=123&redirect_uri=' + ret + '&scope=openid%20email%20profile%20user.read';
    location.href = redirectURL;
  }

  const MSOauthComponent = () => (
    <button onClick={handleLogin} className="btn-home btn-home-normal" >Microsoft登录</button>
  )

  this.bindHook('third_login', MSOauthComponent);
};










