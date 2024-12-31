const { Router } = require("express");
const {
  changePasswordValidation,
  changeusernameValidation,
} = require("../middleware/validation.middleware");
const {
  changePassword,
  updateInformationUser,
  updateprofileImage,
} = require("../controllers/profile/profile.controller");
const profileRouter = Router();

profileRouter.patch(
  "/change-password",
  changePasswordValidation,
  changePassword
);
profileRouter.patch(
  "/change-username",
  changeusernameValidation,
  updateInformationUser
);
profileRouter.patch("/change-image", updateprofileImage);

module.exports = profileRouter;
