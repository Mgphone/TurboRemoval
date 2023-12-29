const fs = require("fs");
const path = require("path");

const logPath = path.join(__dirname, "..", "logs");
fs.existsSync(logPath) || fs.mkdirSync(logPath);

// Construct the file path for the log file
const emailLogFilePath = path.join(logPath, "email.log");

// Create write stream with the 'a' (append) flag
const emailLogStream = fs.createWriteStream(emailLogFilePath, {
  flags: "a",
});

module.exports = { emailLogStream };
