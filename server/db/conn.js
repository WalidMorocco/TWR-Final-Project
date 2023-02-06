var mongoose = require("mongoose");

module.exports = {
  connectToServer: function () {
    console.log(process.env.ATLAS_URI);
    mongoose
      .connect(process.env.ATLAS_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(function () {
        console.log("mongodb connected");
      })
      .catch(function (err) {
        console.log(err);
      });
  },
};
