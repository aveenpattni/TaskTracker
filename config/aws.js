if(process.env.NODE_ENV === "production") {
  module.exports = {
    AWS_SECRET_ACCESS: process.env.AWS_SECRET_ACCESS,
    AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
    REGION: process.env.REGION,
    DB: process.env.DB
  }
} else {
  module.exports = {
    AWS_SECRET_ACCESS: process.env.AWS_SECRET_ACCESS,
    AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
    REGION: process.env.REGION,
    DB: process.env.DB
  }
}