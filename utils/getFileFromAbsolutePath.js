const path = require("path");

const getFileFromAbsolutePath = (catalog, fileWithFormat) => {
  const rootFileDir = __dirname;

  if (!fileWithFormat) {
    return path.join(rootFileDir, catalog);
  }

  return path.join(rootFileDir, catalog, fileWithFormat);
};

module.exports = getFileFromAbsolutePath;
