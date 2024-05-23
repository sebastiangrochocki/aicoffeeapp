// const canvasRef = useRef(null);
// const videoRef = useRef(null);
// useEffect(() => {
//   let stream;
//   let intervalId;
//   if (screen === 2) {
//     const constraints = {
//       video: {
//         facingMode: "environment",
//         width: { ideal: 1280 },
//         height: { ideal: 720 },
//       },
//     };
//     navigator.mediaDevices
//       .getUserMedia(constraints)
//       .then((mediaStream) => {
//         stream = mediaStream;
//         if (videoRef.current) {
//           videoRef.current.srcObject = stream;
//         }
//         intervalId = setInterval(checkBlackScreen, 1000);
//       })
//       .catch((err) => console.error("Error accessing the camera: ", err));
//   }
//   return () => {
//     if (stream) {
//       stream.getTracks().forEach((track) => track.stop());
//     }
//     if (intervalId) {
//       clearInterval(intervalId);
//     }
//   };
// }, [screen]);

// const checkBlackScreen = () => {
//   if (!videoRef.current || !canvasRef.current) return;

//   const video = videoRef.current;
//   const canvas = canvasRef.current;
//   const context = canvas.getContext("2d");
//   context.drawImage(video, 0, 0, canvas.width, canvas.height);

//   const frame = context.getImageData(0, 0, canvas.width, canvas.height);
//   const { data } = frame;
//   let blackPixels = 0;
//   const totalPixels = data.length / 4;

//   for (let i = 0; i < data.length; i += 4) {
//     if (data[i] < 50 && data[i + 1] < 50 && data[i + 2] < 50) {
//       blackPixels++;
//     }
//   }

//   console.log(`Black pixels: ${blackPixels}, Total pixels: ${totalPixels}`);
//   if (blackPixels / totalPixels > 0.4) {
//     setScreen(3);
//   }
// };
