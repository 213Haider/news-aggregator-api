process.env.NODE_ENV = "test";
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const bcrypt = require("bcrypt");
const sinon = require("sinon");
const expect = require("chai").expect;
const server = require("../../index");
const { getMaxListeners } = require("process");
const user = require("../../src/models/user");

describe("verify the signup flow with actual calls to mongodb", () => {
  const signupBody = {
    firstName: "Test",
    lastName: "User",
    fullName: "Test User",
    email: "testuser123@gmail.com",
    password: "test123",
  };

  it("Successful signup", (done) => {
    chai
      .request(server)
      .post("/register")
      .send(signupBody)
      .end((err, res) => {
        expect(res.status).equal(200);
        expect(res.body.message).equal("User registered successfully");
        done();
      });
  });

  it("verifies signup flow failing bacause of email validation", (done) => {
    signupBody.email = "testuser@123@gmail.com";
    chai
      .request(server)
      .post("/register")
      .send(signupBody)
      .end((err, res) => {
        expect(res.status).equal(500);
        expect(res.body.message.message).equal(
          "User validation failed: email: Email provided is incorrect"
        );
        done();
      });
  });

  it("verifies the signup flow failing because of invalid firstname", (done) => {
    signupBody.email = "testuser123@gmail.com";
    signupBody.firstName = "";
    chai
      .request(server)
      .post("/register")
      .send(signupBody)
      .end((err, res) => {
        expect(res.status).equal(500);
        expect(res.body.message.message).equal(
          "User validation failed: firstName: Firstname not provided"
        );
        done();
      });
  });

  it("verifies the signup flow failing because of invalid lastname", (done) => {
    signupBody.email = "testuser123@gmail.com";
    signupBody.firstName = "Test";
    signupBody.lastName = "";
    chai
      .request(server)
      .post("/register")
      .send(signupBody)
      .end((err, res) => {
        expect(res.status).equal(500);
        expect(res.body.message.message).equal(
          "User validation failed: lastName: Lastname not provided"
        );
        done();
      });
  });

  it("verifies the signup flow failing because of invalid fullname", (done) => {
    signupBody.email = "testuser123@gmail.com";
    signupBody.firstName = "Test";
    signupBody.lastName = "User";
    signupBody.fullName = "";
    chai
      .request(server)
      .post("/register")
      .send(signupBody)
      .end((err, res) => {
        expect(res.status).equal(500);
        expect(res.body.message.message).equal(
          "User validation failed: fullName: Fullname not provided"
        );
        done();
      });
  });

  it("verifies the signup flow bacause of incomplete properties", (done) => {
    signupBody.email = "testuser123@gmail.com";
    signupBody.firstName = "Test";
    signupBody.lastName = "User";
    signupBody.fullName = "Test User";
    delete signupBody.firstName;
    chai
      .request(server)
      .post("/register")
      .send(signupBody)
      .end((err, res) => {
        expect(res.status).equal(500);
        expect(res.body.message.message).equal(
          "User validation failed: firstName: Firstname not provided"
        );
        done();
      });
  });
});

describe("verifies the signin flow with actual calls to mongodb", () => {
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
        done();
      });
  });
  it("Successful signin", (done) => {
    const signInBody = {
      email: "testuser123@gmail.com",
      password: "test123",
    };
    chai
      .request(server)
      .post("/signin")
      .send(signInBody)
      .end((err, res) => {
        expect(res.status).equal(200);
        expect(res.body).to.have.property("user");
        expect(res.body).to.have.property("message");
        expect(res.body).to.have.property("accessToken");
        expect(res.body.message).equal("Login Successfull");
        expect(res.body.user.firstName).equal("Test");
        expect(res.body.user.lastName).equal("User");
        expect(res.body.user.fullName).equal("Test User");
        expect(res.body.user.email).equal("testuser123@gmail.com");
        done();
      });
  });

  it("Signin fails because of incorrect password", (done) => {
    const signInBody = {
      email: "testuser123@gmail.com",
      password: "test1234",
    };
    chai
      .request(server)
      .post("/signin")
      .send(signInBody)
      .end((err, res) => {
        expect(res.status).equal(401);
        expect(res.body.accessToken).to.be.null;
        expect(res.body.message).equal("Invalid password");
        done();
      });
  });

  it("User does not exist and signin fails", (done) => {
    const signInBody = {
      email: "testuser1235@gmail.com",
      password: "test1234",
    };
    chai
      .request(server)
      .post("/signin")
      .send(signInBody)
      .end((err, res) => {
        expect(res.status).equal(404);
        expect(res.body.accessToken).to.be.null;
        expect(res.body.message).equal("User not found");
        done();
      });
  });
});
