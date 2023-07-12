const chai = require("chai");
const chaihttp = require("chai-http");
chai.use(chaihttp);
const server = require("../../index");
const expect = require("chai").expect;

describe("fetching the news", () => {
  let jwtToken = "";
  beforeEach((done) => {
    const signupBody = {
      firstName: "Test",
      lastName: "User",
      fullName: "Test User",
      email: "testuser123@gmail.com",
      password: "test123",
    };
    chai
      .request(server)
      .post("/register")
      .send(signupBody)
      .end((err, res) => {
        const signInBody = {
          email: "testuser123@gmail.com",
          password: "test123",
        };
        chai
          .request(server)
          .post("/signin")
          .send(signInBody)
          .end((err, signInRes) => {
            jwtToken = signInRes.body.accessToken;
            done();
          });
      });
  });

  it("Signin validates the token and fetches the news", (done) => {
    chai
      .request(server)
      .get("/news")
      .set("authorization", `JWT ${jwtToken}`)
      .end((err, res) => {
        expect(res.status).equal(200);
        expect(res.body).to.be.an("array");
        done();
      });
  }).timeout(10000);
});
