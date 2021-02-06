import './Image.scss';
import defaultImage from '../../assets/images/xp.jpg'


const Image: React.FC<{ picture: any }> = props => {
    const { picture } = props;
    return (
        <div className="Image">
            <img className="img" src={picture ? picture : defaultImage} alt="lichen identifié"></img>
        </div>
    )
}

export default Image;