const { Pool } = require('pg');

class AuthenticationService {
  constructor() {
    this._pool = new Pool();
  }
}

module.exports = AuthenticationService;
