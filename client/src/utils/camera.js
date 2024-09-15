export const takePicture = () => {
  return new Promise((resolve, reject) => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        const video = document.createElement('video');
        video.srcObject = stream;
        video.play();

        video.onloadedmetadata = () => {
          const canvas = document.createElement('canvas');
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          canvas.getContext('2d').drawImage(video, 0, 0);
          canvas.toBlob(blob => {
            stream.getTracks().forEach(track => track.stop());
            resolve(blob);
          }, 'image/jpeg', 0.95); // You can adjust quality here
        };
      })
      .catch(error => reject(error));
  });
};