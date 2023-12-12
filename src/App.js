import { useState } from "react";

function VideoPlayer({ videoUrl }) {
  return (
    <video className="video" controls autoPlay>
      <source src={videoUrl} type="video/mp4" />
    </video>
  );
}

function Loader() {
  return (
    <div>
      <p>Loading...</p>
    </div>
  );
}

export default function App() {
  const [videoUrl, setVideoUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const corsProxy = "https://warm-cove-12906-2904f00bb499.herokuapp.com/";

  async function fetchData() {
    try {
      setIsLoading(true);
      const res = await fetch(
        `${corsProxy}https://api.thedailyshitpost.net/random`
      );
      const { url } = await res.json();
      setVideoUrl(url);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  function handleClick() {
    fetchData();
  }

  // useEffect(function () {
  //   async function fetchData() {
  //     try {
  //       const res = await fetch(
  //         "https://cors-anywhere.herokuapp.com/https://api.thedailyshitpost.net/random"
  //       );
  //       const { url } = await res.json();
  //       setVideoUrl(url);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   }
  //   fetchData();
  // }, []);

  return (
    <div className="container">
      {!isLoading && videoUrl && <VideoPlayer videoUrl={videoUrl} />}
      {isLoading && <Loader />}
      {!isLoading && (
        <button className="btn" onClick={handleClick}>
          <p className="words">Click me!</p>
        </button>
      )}
    </div>
  );
}
