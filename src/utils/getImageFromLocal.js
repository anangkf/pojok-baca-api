const fs = require('fs');
const httpStatus = require('http-status');
const ApiError = require('./ApiError');

/**
 *
 * @param {FileObject} file FormData shaped FileObject
 * @returns {File} image
 */
const getImageFromLocal = (file) => {
  const image = fs.readFileSync(file.path, (err, data) => {
    if (err) throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, `Error reading file at: ${file.path}`);
    return data;
  });

  return image;
};

module.exports = getImageFromLocal;
