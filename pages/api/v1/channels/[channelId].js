// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const Redis = require("ioredis");
let client = new Redis("rediss://:8447d921a22640c3a4be219b67620c05@eu1-immortal-ferret-31790.upstash.io:31790");

export default (req, res) => {
  const { channelId } = req.query
  if (channelId) {
    client.get(channelId).then((channelsData) => {
      return res.status(200).json(JSON.parse(channelsData))
    })
  }
  res.status(404)
}
