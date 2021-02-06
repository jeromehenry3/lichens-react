import { BaseSyntheticEvent, useState } from 'react';
import './App.scss';
import Image from './components/Image/Image';
import ImageLoader from './components/ImageLoader/ImageLoader';
import Results from './components/Results/Results';

const App: React.FC<{}> = () => {
  const [picture, setPicture] = useState({preview: "", raw: ""});
  const [results, setResults] = useState([]);

  const onPictureChangeCallBack = (event: BaseSyntheticEvent) => {
    if (event.target && event.target.files) {
      setPicture({
          preview: URL.createObjectURL(event.target.files[0]),
          raw: event.target.files[0]
      });
      handleUploadImage(event.target.files[0])

    }
  }

  const handleUploadImage = async (file: any) => {
    let reader = new FileReader();
    console.log('picture.raw :>> ', file);
    reader.readAsDataURL((file as any));
    reader.onload = (event) => {
      sendRequest(event.target?.result);
    }
  };
  
  const sendRequest = async (body: any) => {
    await fetch('https://www.jeromehenry.fr/lichens-api/analysis', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body,
    }).then(response => {
      response.json().then(resp => {
        console.log('resp :>> ', resp);
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
        <Image  picture={picture.preview} />
        <Results results={results} />
        <ImageLoader pictureChange={onPictureChangeCallBack} />
      </div>
    </div>
  );
}

export default App;
