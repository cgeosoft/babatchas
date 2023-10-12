#!/usr/bin/env node

const path = require("path");
const FtpDeploy = require("ftp-deploy");
const ftpDeploy = new FtpDeploy();

const config = {
  user: "j14949nefe",
  // Password optional, prompted if none given
  password: "mac9bvz5ofmay9jsjw4z5dzxs2ud65",
  host: "ftp.babatchas.com",
  port: 21,
  localRoot: path.resolve("dist"),
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

console.log(`Deploying to ${config.host} from ${config.localRoot}`);

ftpDeploy.on("uploading", (data) => {
  console.log(`${data.transferredFileCount}/${data.totalFilesCount}\t${Math.floor(data.transferredFileCount * 100 / data.totalFilesCount)}%`)
});

ftpDeploy.on("upload-error", (data) => {
  console.log(`Error: ${data.err}`);
});

ftpDeploy
  .deploy(config)
  .then((res) => console.log("finished:", res))
  .catch((err) => console.log(err))
