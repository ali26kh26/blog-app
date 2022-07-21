const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongodb_username: "ali26kh26",
        mongodb_password: "AZBY1928",
        mongodb_clustername: "cluster0",
        mongodb_database: "contacts",
      },
    };
  }
  return {
    env: {
      mongodb_username: "ali26kh26",
      mongodb_password: "AZBY1928",
      mongodb_clustername: "cluster0",
      mongodb_database: "contacts",
    },
  };
};
