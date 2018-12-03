const controller = require("../controller/userController");
const methods = require("../controller/Methods");

test("it is test for user login", async () => {
  const req = {
    body: { firstname: "ahmad", lastname: "noor",email: "ahmadnoor2@gmails.com", password: "fffesffewef"}
  };
  const res = { json: jest.fn() };
  await controller.user_signUp(req, res);
  expect(req.body).toEqual({ firstname: "ahmad", lastname: "noor",email: "ahmadnoor2@gmails.com", password: "fffesffewef"});
  expect(req.body.password && req.body.email).toBeDefined();
  expect(methods.newUser(req.body.firstname,req.body.lastname,req.body.email, req.body.password)).toBeFalsy();
});
