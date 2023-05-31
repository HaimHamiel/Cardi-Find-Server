const cron = require("node-cron");
const { registerCreditCard } = require("../controllers/creditCardController");
const { registerBusiness } = require("../controllers/businessController");


  const startCronJob = () => {
    cron.schedule("0 10 * * 0-5", registerCreditCard);
    cron.schedule("0 10 * * 0-5", registerBusiness);
  };

module.exports = startCronJob;
