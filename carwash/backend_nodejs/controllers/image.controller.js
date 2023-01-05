var path = require("path");
// Retrieve all Tutorials from the database.
exports.getimage = function (req, res) {
    var filename = req.params.filename;
    var image = path.join(__dirname, "../uploads/images/" + filename);
    res.sendFile(image);
};
