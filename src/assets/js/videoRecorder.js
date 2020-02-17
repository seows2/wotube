const recorderContainer = document.getElementById("jsRecordContainer");
const recordBtn = document.getElementById("jsRecordBtn");
const videoPreview = document.getElementById("jsVideoPreview");


let videoRecorder
let stream

const handleVideoData = (event) =>{
    const { data : videoFile } = event;
    if(videoFile.size > 500){
        const link = document.createElement("a");
        const url = URL.createObjectURL(videoFile);
        link.href = url
        link.download = "recorded.mp4";
        document.body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(url)
    }
}

const startRecording = () => {
    videoRecorder = new MediaRecorder(stream);
    videoRecorder.start();
    recordBtn.addEventListener("click",stopRecording);
    videoRecorder.addEventListener("dataavailable",handleVideoData)
}

const stopRecording = () => {
    videoRecorder.stop();
    recordBtn.removeEventListener("click",stopRecording);
    recordBtn.addEventListener("click", getVideo);
    recordBtn.innerText = "녹화"
    stream.getVideoTracks()[0].stop();
}

const getVideo = async () => {
    try {
            stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: { width: 1280, height: 720}
        });
        videoPreview.srcObject = stream;
        videoPreview.muted = true;
        videoPreview.play();
        recordBtn.innerText = "중지"
        startRecording();
    } catch (error) {
        recordBtn.innerText = "녹화를 할 수 없습니다😂"
    } finally{
        recordBtn.removeEventListener("click", getVideo);
    }
}

function init() {
    recordBtn.addEventListener("click", getVideo);
}

if(recorderContainer){
    init();
}