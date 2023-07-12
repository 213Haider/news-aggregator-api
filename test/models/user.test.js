const User = require("../../src/models/user");
const expect = require("chai").expect;
const sinon = require("sinon");
const bcrypt = require("bcrypt");

describe("Creating documents in mongodb", () => {
  it("Creates a new user successfully", (done) => {
    const user = new User({
      firstName: "Test",
      lastName: "User",
      fullName: "Test User",
      email: "testuser123@gmail.com",
      password: bcrypt.hashSync("test123", 8),
    });
    expect(!user.isNew).equals(true);
    user
      .save()
      .then((user) => {
        expect(user.isNew).equals(true);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it("Validates the email", (done) => {
    const user = new User({
      firstName: "Test",
      lastName: "User",
      fullName: "Test User",
      email: "testuser@123@gmail.com",
      password: bcrypt.hashSync("test123", 8),
    });
    expect(user.isNew).equals(true);
    user
      .save()
      .then((user) => {
        expect(!user.isNew).equals(true);
        done();
      })
      .catch((err) => {
        expect(err._message).equals("User validation failed");
        done();
      });
  }).timeout(10000);
});

describe("Stubbing the tests for creating the documents in mongodb", () => {
  let saveStub;
  const user = new User({
    firstName: "Test",
    lastName: "User",
    fullName: "Test User",
    email: "testuser123@gmail.com",
    password: bcrypt.hashSync("test123", 8),
  });

  beforeEach(() => {
    saveStub = sinon.stub(User.prototype, "save");
  });

  afterEach(() => {
    saveStub.restore();
  });

  it("Should save the user", async (done) => {
    const mockUser = {
      firstName: "Test",
      lastName: "User",
      fullName: "Test User",
      email: "testuser123@gmail.com",
    };
    saveStub.resolves(mockUser);

    const result = await user.save();
    expect(result).to.deep.equal(mockUser);
    expect(saveStub.calledOnce).to.be.true;
    done();
  });

  it("Should handle the error", async (done) => {
    const mockError = new Error("Database error");
    saveStub.rejects(mockError);

    try {
      await user.save();
    } catch (error) {
      expect(error).to.equal(mockError);
      expect(saveStub.calledOnce).to.be.true;
      done();
    }
  }).timeout(10000);
});
