import { Before, After, BeforeAll, AfterAll } from "@cucumber/cucumber";
import database from "./helpers/database.mjs";

BeforeAll(async function () {
  console.log("\n🧪 Iniciando testes Cucumber...\n");
  await database.connect();
});

Before(async function () {
  await database.clearTestUsers();
});

After(async function (scenario) {
  if (scenario.result.status === "failed") {
    console.log(`❌ Cenário falhou: ${scenario.pickle.name}`);
  }
});

AfterAll(async function () {
  console.log("\n✅ Testes concluídos!\n");
  await database.close();
});
