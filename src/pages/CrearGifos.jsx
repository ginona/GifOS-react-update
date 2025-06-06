import React, { useState, useRef, useEffect } from 'react';
import styles from '../styles/CrearGifos.module.scss';

const CrearGifos = () => {
  const [step, setStep] = useState(1);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [gifUrl, setGifUrl] = useState('');
  const [error, setError] = useState('');

  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        await videoRef.current.play();
      }
      
      setStep(2);
    } catch (err) {
      setError('Could not access the camera. Please make sure you have granted the necessary permissions.');
      console.error('Error accessing camera:', err);
    }
  };

  const startRecording = () => {
    if (!streamRef.current) return;

    const mediaRecorder = new MediaRecorder(streamRef.current, {
      mimeType: 'video/webm;codecs=vp9'
    });

    mediaRecorderRef.current = mediaRecorder;
    setRecordedChunks([]);

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        setRecordedChunks(prev => [...prev, event.data]);
      }
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(recordedChunks, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      setPreviewUrl(url);
      setStep(3);
    };

    mediaRecorder.start();
    setIsRecording(true);

    // Detener la grabación después de 3 segundos
    setTimeout(() => {
      stopRecording();
    }, 3000);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const uploadGif = async () => {
    if (recordedChunks.length === 0) return;

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const blob = new Blob(recordedChunks, { type: 'video/webm' });
      const formData = new FormData();
      formData.append('file', blob, 'myGif.webm');

      // Simular progreso de carga
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 10;
        });
      }, 300);

      // Aquí iría la llamada real a la API de Giphy
      // Por ahora, simulamos una respuesta exitosa
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      // Simular URL del GIF
      setGifUrl('https://media.giphy.com/media/example.gif');
      setStep(4);
    } catch (err) {
      setError('Error al subir el GIF. Por favor, intenta de nuevo.');
      console.error('Error uploading GIF:', err);
    } finally {
      setIsUploading(false);
    }
  };

  const downloadGif = () => {
    if (!gifUrl) return;

    const link = document.createElement('a');
    link.href = gifUrl;
    link.download = 'myGif.gif';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetProcess = () => {
    setStep(1);
    setRecordedChunks([]);
    setPreviewUrl('');
    setGifUrl('');
    setError('');
    setUploadProgress(0);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
  };

  return (
    <div className={styles.crearGifos}>
      <h1>Create GIFOS</h1>

      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.steps}>
        <div className={`${styles.step} ${step >= 1 ? styles.active : ''}`}>
          <div className={styles.stepNumber}>1</div>
          <p>Choose an option</p>
        </div>
        <div className={`${styles.step} ${step >= 2 ? styles.active : ''}`}>
          <div className={styles.stepNumber}>2</div>
          <p>Record your GIFO</p>
        </div>
        <div className={`${styles.step} ${step >= 3 ? styles.active : ''}`}>
          <div className={styles.stepNumber}>3</div>
          <p>Review your GIFO</p>
        </div>
        <div className={`${styles.step} ${step >= 4 ? styles.active : ''}`}>
          <div className={styles.stepNumber}>4</div>
          <p>Share your GIFO!</p>
        </div>
      </div>

      {step === 1 && (
        <div className={styles.stepContent}>
          <div className={styles.cameraOptions}>
            <button onClick={startCamera} className={styles.cameraButton}>
              <i className="fa fa-camera"></i>
              <span>Choose camera</span>
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className={styles.stepContent}>
          <div className={styles.cameraView}>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className={styles.videoPreview}
            />
            <div className={styles.recordingControls}>
              <button
                onClick={startRecording}
                disabled={isRecording}
                className={styles.recordButton}
              >
                <i className={`fa fa-${isRecording ? 'stop' : 'circle'}`}></i>
                {isRecording ? 'Recording...' : 'Start recording'}
              </button>
            </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className={styles.stepContent}>
          <div className={styles.previewContainer}>
            <video
              src={previewUrl}
              controls
              className={styles.videoPreview}
            />
            <div className={styles.previewControls}>
              <button onClick={resetProcess} className={styles.cancelButton}>
                <i className="fa fa-times"></i>
                Cancel
              </button>
              <button onClick={uploadGif} className={styles.uploadButton}>
                <i className="fa fa-upload"></i>
                Upload GIFO
              </button>
            </div>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className={styles.stepContent}>
          <div className={styles.successContainer}>
            <div className={styles.gifPreview}>
              <img src={gifUrl} alt="Tu GIFO" />
            </div>
            <div className={styles.successControls}>
              <button onClick={downloadGif} className={styles.downloadButton}>
                <i className="fa fa-download"></i>
                Descargar GIFO
              </button>
              <button onClick={resetProcess} className={styles.newGifButton}>
                <i className="fa fa-plus"></i>
                Crear otro GIFO
              </button>
            </div>
          </div>
        </div>
      )}

      {isUploading && (
        <div className={styles.uploadProgress}>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
          <p>Subiendo GIFO... {uploadProgress}%</p>
        </div>
      )}
    </div>
  );
};

export default CrearGifos; 