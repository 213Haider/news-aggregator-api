const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

before((done) => {
  mongoose
    .connect("mongodb://localhost:27017/newsTestDB", {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => {
      console.log("Connected to mongo db");
      done();
    })
    .catch((error) => {
      console.log("failed to connect to the mongo db", error);
      done(error);
    });
});

beforeEach((done) => {
  console.log("Running before each unit case");
  mongoose.connection.collections.users.drop(() => {
    done();
  });
});

afterEach((done) => {
  console.log("Running after each unit case");
  mongoose.connection.collections.users.drop(() => {
    done();
  });
});
