import { useState } from 'react';
import Head from 'next/head'
import channels from '../../api/channels'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import axios from 'axios'
const humanizeDuration = require("humanize-duration");
// const initSqlJs = require('sql.js');

const chunk = (chunkSize, array) => {
  return [].concat.apply([],
    array.map(function (elem, i) {
      return i % chunkSize ? [] : [array.slice(i, i + chunkSize)];
    })
  );
};
const getResults = (podcasts, page) => {
  const pages = chunk(20, podcasts)
  console.log(page)
  return pages[page]
}

const Podcasts = (data) => {

  const [page, setPage] = useState(0)
  const [title, setTitle] = useState("أيام الله")
  // const [results, setResults] = useState(getResults(data.podcasts.values, page))
  const [url, setUrl] = useState('');
  const [playingTitle, setPlayingTitle] = useState('');
  const audioPlayerHeader = () => (<div className="font-bold text-xl mb-2" > {playingTitle}</div>)
  if (!data.podcasts) {
    return (<h1>No data</h1>)
  }
  console.log(data.podcasts)
  return (
    <div className="w-full h-full bg-black mt-16">
      <Head>
        <title>{title}</title>
        {/* <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />   */}
      </Head>
      {data.podcasts.items.map((podcast) => (

        <div key={podcast.id} className="flex mb-5 align-middle rounded-xl pl-2 pr-2">
          <button className="flex-shrink-0 rounded-full h-12 w-12 mr-4 ml-4 self-center flex items-center justify-center text-green-500 focus:outline-none transition-colors duration-150 border border-green-500 focus:shadow-outline hover:bg-green-500 hover:text-white"
            onClick={async () => {
              const urlHost = `https://days-of-allah.herokuapp.com/audio/${podcast.id}`


              const { data: audio } = await axios(urlHost);

              setUrl(audio.url)
              setTitle(podcast.title)
              setPlayingTitle(podcast.title)
            }}>

            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAjElEQVRIie3UsQ3CMBBGYZtNkNgEJEbJCOzHHCAowgIg6o+CiigoWD6jFHmlJfvd6c5/SguzBTtccEOHHC04++SITaRgjCcOWLUSxHUzIajv5gdBXTcFArhjP/bO19WDwpquOef18LB+GyaIEjxSSl3RjTkMuemaNvtooVFxCq96INh6x3WvRVwv/I0X45q9tZAyZ4sAAAAASUVORK5CYII=" />
          </button>
          <img className="self-center w-12 h-12 rounded mr-3" src={podcast.thumbnails[0].url} />
          <div className="self-center">
            <div className=" text-l text-gray-300">
              {podcast.title}
            </div>
            {/* <div className="text-xs text-gray-400">
              Published {podcast[5]}
            </div> */}
            <div className="text-xs text-gray-500">
              {podcast.duration}
            </div>
          </div>


        </div>
      ))}
      <div onClick={() => {
        setResults([...results, ...getResults(data.podcasts.values, page + 1)])
        setPage(page + 1)
      }} className={"mb-10 mt-10 "}>
        <h1 className={"text-red-400 justify-center text-2xl"}>Load more</h1>

      </div>

      <div className="absolute bottom-0 sticky">
        <AudioPlayer
          autoPlay
          header={audioPlayerHeader()}
          src={url}
          onPlay={e => console.log("onPlay")}
        // other props here
        />
      </div>
    </div >

  )
}

export async function getStaticPaths() {
  // Call an external API endpoint to get posts



  // Get the paths we want to pre-render based on posts
  const paths = channels.map((channel) => ({
    params: { id: channel.channelId },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}


export async function getStaticProps(context) {
  console.log("called");
  let podcasts = [];
  console.log(context.params.id)
  try {
    const res = await fetch(`https://doa.kanout.com/api/v1/channels/${context.params.id}`)
    podcasts = await res.json()

  }
  catch (error) {
    console.log('error', error)
  }

  console.log(podcasts)
  return {
    props: { podcasts }, // will be passed to the page component as props
  }


}

export default Podcasts