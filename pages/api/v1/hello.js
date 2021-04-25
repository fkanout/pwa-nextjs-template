// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const redis = require("redis");
const client = redis.createClient({
  host: 'eu1-immortal-ferret-31790.upstash.io',
  port: '31790',
  password: '8447d921a22640c3a4be219b67620c05',
  tls: {}
});
client.on("error", function (err) {
  throw err;
});


export default (req, res) => {
  client.get("channels").then((channelsData) => {
    res.status(200).json(channelsData)
  })

}
