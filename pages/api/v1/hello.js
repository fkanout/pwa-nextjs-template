// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const Redis = require("ioredis");
const client = new Redis({
  port: 31790, // Redis port
  host: "eu1-immortal-ferret-31790.upstash.io", // Redis host
  password: "8447d921a22640c3a4be219b67620c05",
});
client.on("error", function (err) {
  throw err;
});

export default (req, res) => {
  client.get("channels").then((channelsData) => {
    res.status(200).json(JSON.parse(channelsData))
  })

}
