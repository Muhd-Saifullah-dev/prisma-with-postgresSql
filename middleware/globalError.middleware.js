const {handleError}=require("../utils/handler.utils")

const globaleErrorMiddleware =  (error,req,res,next) => {
  const message = error.message ?? "Something went wrong";
  const status = error.status ?? 500;
  return handleError(res, status, message, null);
};

module.exports = {
  globaleErrorMiddleware,
};
