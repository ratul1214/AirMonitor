/**************************

***************************/

//STOP ALL other apps listening on port 80
// -> TODO

//Publish /root/ohioh/public/ to the web on port 80

node cert-request-server.js

// Get new Certs for the domains. 

certbot certonly --webroot -w /root/ohioh/public -d app.ohioh.de -d ohioh.app

// Renew existing certs
certbot renew 

// Kill node cert-request-server.js somehow again.

//START ALL other apps listening on port 80
// -> TO DO
