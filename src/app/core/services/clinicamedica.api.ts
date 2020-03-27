export const CLINICA_MEDICA_API = `http://localhost:8080/clinicamedica/`;

export const CLINICA_MEDICA_API_LOGIN = `${CLINICA_MEDICA_API}api/auth`;
export const CLINICA_MEDICA_API_REFRESH = `${CLINICA_MEDICA_API}api/refresh`;

const headerContentType = { 'Content-Type': 'application/json' };
const headerAllowOrigin = { 'Access-Control-Allow-Origin': '*' };
const headerAllowMethods = { 'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE, PUT' };
const headerMaxAge = { 'Access-Control-Max-Age': '3600' };
const headerAllowHeaders = { 'Access-Control-Allow-Headers': 'x-requested-with, authorization, Content-Type, Authorization' };
