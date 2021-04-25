// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const Redis = require("ioredis");
let client = new Redis("rediss://:8447d921a22640c3a4be219b67620c05@eu1-immortal-ferret-31790.upstash.io:31790");

export default (req, res) => {
  const { channelId } = req.query
  const { page } = req.query;

  if (channelId) {
    client.get(channelId).then((podcastString) => {
      const podcast = JSON.parse(podcastString);
      const pageNumber = page && typeof page === 'string' ? parseInt(page) : 0;
      const pageSize = 30;
      const offset = pageNumber === 1 ? 0 : pageNumber * pageSize;
      const items = podcast.podcasts.slice(offset, offset + pageSize);
      return res.status(200).json(items)
    })
  }
  res.status(400)
}
