function loadModule(filename, module, require) {
  const wrappedSrc = `(function (module, exports, require) {
  ${fs.readFileSync(filename, "utf8")}
  })(module, module.exports, require)`;
  eval(wrappedSrc);
  // eval will execute the code in wrappedSrc
  // wrappedSrc is self invoking function
  // contains the code of the module (filename/fileId) that passed to loadModule
  // the function get three arguments: module, exports, require
  // require so that if module has dependencies, it can load them
  // module which is {exports: {}, id}
  // exports which is an empty object
  // module.exports = anyThing; this the main export of the module
  // exports.abc = anyThing; we modify the exports object with properties
}

function require(moduleName) {
  console.log(`Require invoked for module: ${moduleName}`);
  const id = require.resolve(moduleName); // (1)
  if (require.cache[id]) {
    // (2)
    return require.cache[id].exports;
  }
  // module metadata
  const module = {
    // (3)
    exports: {},
    id,
  };
  // Update the cache
  require.cache[id] = module; // (4)
  // load the module
  loadModule(id, module, require); // (5)
  // return exported variables
  return module.exports; // (6)
}
require.cache = {};
require.resolve = (moduleName) => {
  /* resolve a full module id from the moduleName */
};
