import React, { FC, useEffect, useState } from "react";
import axios from "axios";

type Props = {
  videoUrl: string;
  title: string;
};

const CoursePlayer: FC<Props> = ({ videoUrl, title }) => {
  const [videoData, setVideoData] = useState({
    otp: "",
    playbackInfo: "",
  });

  const isYouTubeUrl = (url: string) => {
    const youtubeRegex =
      /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
    return youtubeRegex.test(url);
  };

  useEffect(() => {
    if (!isYouTubeUrl(videoUrl)) {
      axios
        .post(`http://localhost:5000/api/v1/course/getVdoCipherOTP`, {
          videoId: videoUrl,
        })
        .then((res) => {
          setVideoData(res.data);
        });
    }
  }, [videoUrl]);

  return (
    <div
      style={{
        paddingTop: "56.25%",
        position: "relative",
        width: "100%",
        overflow: "hidden",
      }}
    >
      {isYouTubeUrl(videoUrl) ? (
        <iframe
          src={videoUrl.replace("watch?v=", "embed/")}
          style={{
            border: "0",
            width: "100%",
            height: "100%",
            position: "absolute",
            top: "0",
            left: "0",
          }}
          allowFullScreen
        ></iframe>
      ) : (
        videoData.otp &&
        videoData.playbackInfo !== "" && (
          <iframe
            src={`https://player.vdocipher.com/v2/?otp=${videoData.otp}&playbackInfo=${videoData.playbackInfo}&player=O7wSMknD4WIZe85c`}
            style={{
              border: "0",
              width: "100%",
              height: "100%",
              position: "absolute",
              top: "0",
              left: "0",
            }}
            allowFullScreen
            allow="encrypted-media"
          ></iframe>
        )
      )}
    </div>
  );
};

export default CoursePlayer;

// ---------------------------------------------

// import React, { FC, useEffect, useState } from "react";
// import axios from "axios";

// type Props = {
//   videoUrl: string;
//   title: string;
// };

// const CoursePlayer: FC<Props> = ({ videoUrl, title }) => {
//   const [videoData, setVideoData] = useState({
//     otp: "",
//     playbackInfo: "",
//   });

//   useEffect(() => {
//     axios
//       .post(`http://localhost:5000/api/v1/course/getVdoCipherOTP`, {
//         videoId: videoUrl,
//       })
//       .then((res) => {
//         setVideoData(res.data);
//       });
//   }, [videoUrl]);
//   return (
//     <div
//       style={{
//         paddingTop: "56.25%",
//         position: "relative",
//         width: "100%",
//         overflow: "hidden",
//       }}
//     >
//       {videoData.otp && videoData.playbackInfo !== "" && (
//         <iframe
//           src={`https://player.vdocipher.com/v2/?otp=${videoData?.otp}&playbackInfo=${videoData?.playbackInfo}&player=O7wSMknD4WIZe85c`}
//           style={{
//             border: "0",
//             width: "100%",
//             height: "100%",
//             position: "absolute",
//             top: "0",
//             left: "0",
//           }}
//           allowFullScreen={true}
//           allow="encrypted-media"
//         ></iframe>
//       )}
//     </div>
//   );
// };

// export default CoursePlayer;
