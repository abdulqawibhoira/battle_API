function define(name, value) {
    Object.defineProperty(exports, name, {
        value: value,
        enumerable: true
    });
}

//HTTP STATUS CODES
define("BAD_REQUEST", 400);
define("UNAUTHORISED", 401);
define("NOT_FOUND", 404);
define("INTERNAL_SERVER_ERROR", 500);
define("FORBIDDEN", 403);



//Internal server error message
define("INTERNAL_SERVER_ERROR_MESSAGE", "Something went wrong. Please try again");