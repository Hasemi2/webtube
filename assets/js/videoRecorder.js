const recorderContainer = document.getElementById("jsRecordContainer");
const recordBtn = document.getElementById("jsRecordBtn");
const videoPreview = document.getElementById("jsVideoPreview");

let streamObject;
let videoRecorder;

const startRecording = () => {
  videoRecorder = new MediaRecorder(streamObject);
  videoRecorder.start();
  videoRecorder.addEventListener("dataavailable", handleVideoData); //레코딩이 끝났을떄 전체 데이터를 얻을 수 있음
  recordBtn.addEventListener("click", stopRecording);
}

const stopRecording = () => {
  videoRecorder.stop();
  recordBtn.removeEventListener("click", stopRecording);
  recordBtn.addEventListener("click", getVideo);
  recordBtn.innerHTML = "Start Recording";

}

const handleVideoData = (event) => {
  const { data: videoFile } = event;
  //file download 파일에서부터 url 추출
  const link = document.createElement("a");
  link.href = URL.createObjectURL(videoFile);
  link.download = "recorded.webm"; //webm 구글에서 지원하느 오픈소스 동영상 포맷
  document.body.appendChild(link);
  link.click();

}

const getVideo = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      auido: true,
      video: {
        width: 1280,
        height: 720
      },
    });
    videoPreview.srcObject = stream;
    videoPreview.muted = true;
    videoPreview.play();
    recordBtn.innerHTML = "Stop Recording";
    streamObject = stream;
    startRecording();
  } catch (error) {
    recordBtn.innerHTML = "Can't record ";

  } finally {
    recordBtn.removeEventListener("click", getVideo);
  }
}

const init = () => {
  recordBtn.addEventListener("click", getVideo);
}

if (recorderContainer) {
  init();
}
