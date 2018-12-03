const controller = require("../controller/userController");
const methods = require("../controller/Methods");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const hashPassword = password => (password = bcrypt.hashSync(password, salt));

test("it is test for user login", async () => {
  const req = {
    body: { email: "ahmadnoor2@gmails.com", password: "fffesffewef" }
  };
  const res = { json: jest.fn() };
  await controller.user_login(req, res);
  expect(req.body).toEqual({
    email: "ahmadnoor@gmails.com",
    password: "fffesffewef"
  });

  expect(req.body.password && req.body.email).toBeDefined();
  expect(
    methods.validPassword(req.body.password, hashPassword(req.body.password))
  ).toBeTruthy();
  expect(methods.Empty(req.body.email, req.body.password)).toBeFalsy();
});

