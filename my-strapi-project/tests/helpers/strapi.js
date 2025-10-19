const { createStrapi } = require("@strapi/strapi");
const fs = require("fs");

let instance;

async function setupStrapi() {
  if (!instance) {
    const strapi = await createStrapi();
    await strapi.start();
  }
  return instance;
}

async function cleanupStrapi() {
  if (!instance) return;

  const dbSettings = instance.config.get("database.connection");

  // Stop Strapi
  await instance.destroy();

  //delete test database after all tests have completed
  if (dbSettings && dbSettings.connection && dbSettings.connection.filename) {
    const tmpDbFile = dbSettings.connection.filename;
    if (fs.existsSync(tmpDbFile)) {
      fs.unlinkSync(tmpDbFile);
    }
  }
}

module.exports = {
  setupStrapi,
  cleanupStrapi,
};
