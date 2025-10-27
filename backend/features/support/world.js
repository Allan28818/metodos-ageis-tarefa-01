const { setWorldConstructor, Before, After } = require('@cucumber/cucumber');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

class CustomWorld {
  constructor() {
    this.expect = chai.expect;
    this.requestData = {};
    this.response = null;
    this.baseUrl = 'http://localhost:3000';
    this.database = null;
    this.userId = null;
    this.token = null;
  }

  async makeRequest(method, path, data = null) {
    const request = chai.request(this.baseUrl);

    switch (method.toUpperCase()) {
      case 'POST':
        this.response = await request.post(path).send(data);
        break;
      case 'GET':
        this.response = await request.get(path);
        break;
      case 'PUT':
        this.response = await request.put(path).send(data);
        break;
      case 'DELETE':
        this.response = await request.delete(path);
        break;
      default:
        throw new Error(`Método HTTP não suportado: ${method}`);
    }

    return this.response;
  }
}

setWorldConstructor(CustomWorld);

// Hooks para limpar dados entre testes
Before(function () {
  this.requestData = {};
  this.response = null;
  this.userId = null;
  this.token = null;
});

After(function () {
  // Limpeza após cada cenário se necessário
});
