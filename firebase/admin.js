var admin = require("firebase-admin");

var serviceAccount = require("./service-account-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://customer-management-7e55e.firebaseio.com"
});
module.exports = admin