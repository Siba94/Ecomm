const JWT_EXPIRE_TIME='24h'
const ROLES_ALLOWED = {
    USER: ['user'],
    ADMIN: ['admin'],
    ALL_USER: ['user', 'admin'] 
}

module.exports = {JWT_EXPIRE_TIME, ROLES_ALLOWED}