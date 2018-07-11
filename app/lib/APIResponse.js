const OK = (res, data) => res.status(200).json(getSuccessResponse(data));

const ERROR = (res, status, err) => res.status(status).json(getErrorResponse(err));

const getErrorResponse = err => ({ status: "FAIL", message: err.message });

const getSuccessResponse = data => ({ status: "SUCCESS", data: data });


module.exports = { OK, ERROR };
