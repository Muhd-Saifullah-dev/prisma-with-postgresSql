const { Router } = require("express");
const {
  changePasswordValidation,
  changeusernameValidation,
} = require("../middleware/validation.middleware");
const {verifyToken }=require("../middleware/auth.middleware")
const {
  changePassword,
  updateInformationUser,
  updateprofileImage,
} = require("../controllers/profile/profile.controller");
const profileRouter = Router();



profileRouter.patch(
  "/change-password",
  verifyToken,
  changePasswordValidation,
  changePassword
);
profileRouter.patch(
  "/change-username",
  verifyToken,
  changeusernameValidation,
  updateInformationUser
);
profileRouter.patch("/change-image",verifyToken, updateprofileImage);

module.exports = profileRouter;
