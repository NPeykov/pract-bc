const morgan = require("morgan");

module.exports = morgan(":method :url :status :body", {
  skip: function (req, res) {
    return req.method !== "POST";
  },
});

morgan.token("body", function postBodyReq(req) {
  return JSON.stringify(req.body);
});
