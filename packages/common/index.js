const Yup = require("yup");

const formSchema = Yup.object({
  username: Yup.string()
    .required("Username required !!!")
    .min(6, "Username too short")
    .max(28, "Username too long!"),
  password: Yup.string()
    .required("Password required")
    .min(6, "Password too short")
    .max(28, "Password too long!"),
});

const addFriend = Yup.object({
  friendName: Yup.string()
    .required("Friend name required !!!")
    .min(6, "Friend name too short")
    .max(28, "Friend name too long!"),
});
module.exports = { formSchema, addFriend };
