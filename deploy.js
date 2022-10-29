const path = require("path");
const FtpDeploy = require("ftp-deploy");
const ftpDeploy = new FtpDeploy();

const config = {
  user: "j14949nefe",
  // Password optional, prompted if none given
  password: "rZ!8?f3HD*",
  host: "ftp.babatchas.com",
  port: 21,
  localRoot: path.normalize(path.join(__dirname + "/dist")),
  remoteRoot: "/httpdocs",
  // remoteRoot: "/test",
  include: ["*", "**/*"],      // this would upload everything except dot files
  // include: ["*.php", "dist/*", ".*"],
  // e.g. exclude sourcemaps, and ALL files in node_modules (including dot files)
  exclude: [
    "dist/**/*.map",
    "node_modules/**",
    "node_modules/**/.*",
    ".git/**",
  ],
  // delete ALL existing files at destination before uploading, if true
  deleteRemote: false,
  // Passive mode is forced (EPSV command is not sent)
  forcePasv: true,
  // use sftp or ftp
  sftp: false,
};


ftpDeploy.on("uploading", (data) => {
  console.log(`${data.transferredFileCount}/${data.totalFilesCount}\t${Math.floor(data.transferredFileCount * 100 / data.totalFilesCount)}%`)
});

ftpDeploy.on("upload-error", (data) => {
  console.log(data.err); // data will also include filename, relativePath, and other goodies
});

ftpDeploy
  .deploy(config)
  .then((res) => console.log("finished:", res))
  .catch((err) => console.log(err))
