const { StorageClient } = require('@supabase/storage-js');
const CONST = require('../utils/constant');

const storageClient = new StorageClient(CONST.SUPABASE_STORAGE_URL, {
  apiKey: CONST.SUPABASE_SERVICE_KEY,
  Authorization: `Bearer ${CONST.SUPABASE_SERVICE_KEY}`,
});

module.exports = storageClient;
