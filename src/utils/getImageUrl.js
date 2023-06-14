const CONST = require('./constant');

/**
 *
 * @param {String} bucket supabase storage bucket name
 * @param {String} filename uploaded file name
 * @returns {String} imageUrl
 */
const getImageUrl = ({ bucket, filename }) => `${CONST.SUPABASE_HOST}/storage/v1/object/public/${bucket}/${filename}`;

module.exports = getImageUrl;
