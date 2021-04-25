// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const Redis = require("ioredis");
let client = new Redis("rediss://:8447d921a22640c3a4be219b67620c05@eu1-immortal-ferret-31790.upstash.io:31790");

export default (req, res) => {
  client.get("channels").then((channelsData) => {
    res.status(200).json(JSON.parse(channelsData))
  })

}
