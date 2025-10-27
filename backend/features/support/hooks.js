const { Before, After, BeforeAll, AfterAll } = require('@cucumber/cucumber');
const database = require('./helpers/database');

// Executar antes de todos os testes
BeforeAll(async function () {
  console.log('\n🧪 Iniciando testes Cucumber...\n');
  await database.connect();
});

// Executar antes de cada cenário
Before(async function () {
  // Limpar usuários de teste antes de cada cenário
  await database.clearTestUsers();
});

// Executar depois de cada cenário
After(async function (scenario) {
  if (scenario.result.status === 'failed') {
    console.log(`❌ Cenário falhou: ${scenario.pickle.name}`);
  }
});

// Executar depois de todos os testes
AfterAll(async function () {
  console.log('\n✅ Testes concluídos!\n');
  await database.close();
});
