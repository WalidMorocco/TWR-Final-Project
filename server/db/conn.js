import { connect, set } from "mongoose";

export function connectToServer() {
  set("strictQuery", false);
  connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(function () {
      console.log("mongodb connected");
    })
    .catch(function (err) {
      console.log(err);
    });
}
