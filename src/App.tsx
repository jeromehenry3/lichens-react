import { useState, useEffect } from 'react';
import './App.scss';
import Image from './components/Image/Image';
import ImageLoader from './components/ImageLoader/ImageLoader';
import Results from './components/Results/Results';

const App: React.FC<{}> = () => {
  const [picture, setPicture] = useState({preview: "", raw: ""});
  const [results, setResults] = useState([]);
  /**
   * load the last picture and analyse it
   */
  useEffect(() => {
    fetch('https://www.jeromehenry.fr/lichens-api/lastpicture', {
    // fetch('http://127.0.0.1:5000/lastpicture', {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      cache: "no-store"
    })
    .then(response => response.blob())
    .then(blob => {
      handleUploadImage(blob);
      setPicture({preview: URL.createObjectURL(blob), raw: ""})
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onPictureChangeCallBack = (event: any) => {
    if (event.target && event.target.files) {
      setPicture({
          preview: URL.createObjectURL(event.target.files[0]),
          raw: event.target.files[0]
      });
      handleUploadImage(event.target.files[0])
    } else if (event.dataTransfer.files[0]) {
      setPicture({
        preview: URL.createObjectURL(event.dataTransfer.files[0]),
        raw: event.dataTransfer.files[0]
      });
      handleUploadImage(event.dataTransfer.files[0])
    }
    
  }

  const handleUploadImage = async (file: any) => {
    let reader = new FileReader();
    reader.readAsDataURL((file as any));
    reader.onload = (event) => {
      sendRequest(event.target?.result);
    }
  };
  
  const sendRequest = async (body: any) => {
    setResults([]);
    await fetch('https://www.jeromehenry.fr/lichens-api/analysis', {
    // await fetch('http://127.0.0.1:5000/analysis', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body,
    }).then(response => {
      response.json().then(resp => {
        setResults(resp)
      })
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>Reconnaissance de lichens</p>
      </header>
      <div className="main-container">
        {
          !picture.raw && <div className="last-lichen-label">Dernier lichen recherché</div>
        }
        {
          picture.preview && <Image  picture={picture.preview} />
        }
        <Results results={results} />
        <ImageLoader
          pictureChange={onPictureChangeCallBack}
        />
      </div>
    </div>
  );
}

export default App;
