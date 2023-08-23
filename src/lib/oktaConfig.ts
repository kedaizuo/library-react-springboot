export const oktaConfig={
    clientId:'0oaapjyq9kqA0timR5d7',
    issuer:'https://dev-27540031.okta.com/oauth2/default',
    redirectUri:'http://localhost:3000/login/callback',
    scopes:['openid', 'profile', 'email'],
    pkce:true,
    disableHttpsCheck:true,
}