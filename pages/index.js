import React from 'react'
import Link from 'next/link'
import Head from 'next/head'

export default function Main(data) {
  return (
    <div>
      <Head>
        <meta charset='utf-8' />
        <meta http-equiv='X-UA-Compatible' content='IE=edge' />
        <meta name='viewport' content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no' />
        <meta name='description' content='Description' />
        <meta name='keywords' content='Keywords' />
        <title>Days of Allah</title>
        <link rel='manifest' href='/manifest.json' />
        <link href='/favicon-16x16.png' rel='icon' type='image/png' sizes='16x16' />
        <link href='/favicon-32x32.png' rel='icon' type='image/png' sizes='32x32' />
        <link rel='apple-touch-icon' href='/icon-192x192.png'></link>
        <meta name='theme-color' content='#317EFB' />
      </Head>
      <div>
        {
          data.channels.map(channel => {
            return (
              <Link
                key={channel.channelId}
                href={{
                  pathname: '/podcasts/[id]',
                  query: { id: channel.channelId },
                }}
              >
                <div >
                  <div>
                    {channel.channelName}
                  </div>
                  <img src={"data:image/jpg;base64, " + channel.avatar} />
                </div>
              </Link>
            )
          })
        }
      </div >
    </div>
  )
}
export async function getStaticProps(context) {
  let channels = [];
  try {
    const res = await fetch(`https://doa.kanout.com/api/v1/channels`)
    channels = await res.json()
  }
  catch (error) {
    console.log('error', error)
  }
  return {
    props: { channels }, // will be passed to the page component as props
  }
}
