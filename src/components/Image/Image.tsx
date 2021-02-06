import './Image.scss';


const Image: React.FC<{ picture: any }> = props => {
    const { picture } = props;
    return (
        <div className="Image">
            <img className="img" src={picture} alt="lichen identifié"></img>
        </div>
    )
}

export default Image;