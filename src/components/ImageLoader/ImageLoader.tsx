import './ImageLoader.scss';


const ImageLoader: React.FC<{pictureChange: any}> = props => {
    const { pictureChange } = props;

    return (
        <div className="ImageLoader">
            <label className="load-button" htmlFor="input">Charger une image</label>
            <input id="input" type="file" onChange={pictureChange}/>
        </div>
    )
}

export default ImageLoader;