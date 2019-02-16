const Bottle = require("bottlejs");
const ParseManager = require("./managers/ParseManager");

const bottle = new Bottle();

bottle.service("parseManager", ParseManager);

module.exports = bottle.container;
