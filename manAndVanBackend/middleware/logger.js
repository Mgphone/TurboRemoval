const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const logDirectory = path.join(__dirname, "..", "logs");
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
// create write stream
const accessLogStream = fs.createWriteStream(
  path.join(logDirectory, "access.log"),
  { flags: "a" }
);
const accessLogger = morgan(
  ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"',
  { stream: accessLogStream }
);
module.exports = { accessLogger };
