const jwt = require("jsonwebtoken");

exports.authen = async (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).send({ message: "Access Denied" });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        console.log(req.user);
        next();
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: "Invalid Token" });
    }
}
