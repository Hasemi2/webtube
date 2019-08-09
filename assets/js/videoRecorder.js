const recorderContainer = document.getElementById("jsRecordContainer");
const recordBtn = document.getElementById("jsRecordBtn");
const videoPreview = document.getElementById("jsVideoPreview");

let streamObject; //녹화된 object 영상물
let videoRecorder;

const handleVideoData = event => {
  console.log("data ===> " , event.data);

  const { data: videoFile } = event;
  console.log("videoFile ===> " , videoFile )
};

// returns file, that we can send to the server.
function dataUrlToFile(dataUrl) {
  var binary = atob(dataUrl.split(',')[1]),
  data = [];

  for (var i = 0; i < binary.length; i++)
    data.push(binary.charCodeAt(i));

  return new File([new Uint8Array(data)], 'recorded-video.webm', {
    type: 'video/webm'
  });
}

const stopRecording = () => {
  videoRecorder.stop();
  recordBtn.removeEventListener("click", stopRecording);
  recordBtn.addEventListener("click", getVideo);
  recordBtn.innerHTML = "Start recording";
};

const startRecording = () => {
  videoRecorder = new MediaRecorder(streamObject);
  videoRecorder.start();
  videoRecorder.addEventListener("dataavailable", handleVideoData);
  recordBtn.addEventListener("click", stopRecording);
};

const getVideo = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: { 
          width: 1280, 
          height: 720 
        }
    });

    videoPreview.srcObject = stream;
    videoPreview.muted = true;
    videoPreview.play();
    recordBtn.innerHTML = "Stop recording";
    streamObject = stream;
    startRecording();
  } catch (error) {
    recordBtn.innerHTML = "Cant record";
  } finally {
    recordBtn.removeEventListener("click", getVideo);
  }
};

function init() {
  recordBtn.addEventListener("click", getVideo);
}

if (recorderContainer) {
  init();
}