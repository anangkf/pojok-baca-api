const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const {
  SUPABASE_HOST,
  SUPABASE_SERVICE_KEY,
  PG_HOST,
  PG_USER,
  PG_PASSWORD,
  PG_DB_NAME,
  PG_SCHEMA_PROD,
  PG_SCHEMA_DEV,
  PG_HOST_TEST,
  PG_USER_TEST,
  PG_PASSWORD_TEST,
  PG_DB_NAME_TEST,
  PG_SCHEMA_TEST,
  DB_DIALECT,
  NODE_ENV,
  JWT_SECRET,
  JWT_RT_SECRET,
} = process.env;

const DATE_REGEXP = /^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$/;

let PG_SCHEMA;
switch (process.env.NODE_ENV) {
case 'production':
  PG_SCHEMA = PG_SCHEMA_PROD;
  break;
case 'test':
  PG_SCHEMA = PG_SCHEMA_TEST;
  break;
default:
  PG_SCHEMA = PG_SCHEMA_DEV;
}

const SUPABASE_STORAGE_URL = `${SUPABASE_HOST}/storage/v1`;

module.exports = {
  SUPABASE_HOST,
  SUPABASE_STORAGE_URL,
  SUPABASE_SERVICE_KEY,
  PG_HOST,
  PG_USER,
  PG_PASSWORD,
  PG_DB_NAME,
  PG_HOST_TEST,
  PG_USER_TEST,
  PG_PASSWORD_TEST,
  PG_DB_NAME_TEST,
  PG_SCHEMA,
  DB_DIALECT,
  DATE_REGEXP,
  NODE_ENV,
  JWT_SECRET,
  JWT_RT_SECRET,
};
