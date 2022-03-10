import { useEffect, useRef } from 'react';
const WebCam = () => {
  const CONSTRAINTS = { video: true };
  const videoRef = useRef<HTMLVideoElement>(null);
  const startVideo = async () => {
    const stream = await navigator.mediaDevices.getUserMedia(CONSTRAINTS);
    if (videoRef && videoRef.current && !videoRef.current.srcObject) {
      videoRef.current.srcObject = stream;
    }
  };

  useEffect(() => {
    if (videoRef.current instanceof HTMLVideoElement) {
      startVideo();
    }
  }, [videoRef]);

  return (
    <video autoPlay ref={videoRef}>
      <track default kind="captions" />
    </video>
  );
};

export default WebCam;
