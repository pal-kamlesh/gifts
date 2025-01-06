const allowdInput = {
  add: ["name", "dob", "address", "phone", "location", "company", "info"],
  update: [
    "name",
    "dob",
    "address",
    "phone",
    "location",
    "gift1",
    "gift2",
    "gift3",
    "giftGiven",
    "recived",
    "company",
    "info",
  ],
  admin: [
    "name",
    "dob",
    "address",
    "phone",
    "location",
    "gift1",
    "gift2",
    "gift3",
    "giftGiven",
    "recived",
    "company",
    "info",
  ],
};

function shouldDisable(rights, name) {
  const trueKeys = Object.keys(rights).filter((key) => rights[key] === true);
  for (let i = 0; i < trueKeys.length; i++) {
    if (allowdInput[String(trueKeys[i])].includes(name)) {
      console.log(allowdInput[String(trueKeys[i])]);
      return false;
    } else {
      return true;
    }
  }
}

export { allowdInput, shouldDisable };
