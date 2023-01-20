const mongoose = require("mongoose");

const port = process.env.PORT;
const uri = process.env.MONGO_URI;

module.exports = async (app) => {
  try {
    await mongoose.connect(uri);
    app.listen(port, () => {
      console.log(`Listening... http://localhost:${port}`);
    });
  } catch (error) {
    console.error(error);
  }
};
