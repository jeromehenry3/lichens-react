import { useState, DragEvent } from 'react';
import SpeciesListButton from '../SpeciesListButton/SpeciesListButton';
import './ImageLoader.scss';


const ImageLoader: React.FC<{pictureChange: any}> = props => {
    const { pictureChange } = props;
    const [draggedOver, setDraggedOver] = useState(false);

    const handleDragOver: React.DragEventHandler = ($event: DragEvent<HTMLDivElement>) => {
        $event.preventDefault();
        !draggedOver && setDraggedOver(true);
    }

    const handleDrop = ($event: React.DragEvent) => {
        $event.preventDefault();
        $event.stopPropagation();
        setDraggedOver(false);
        console.log($event.dataTransfer.files)
        if ($event.dataTransfer.files[0]) {
            console.log('image transmitted to callback')
            pictureChange($event)
        }
    }

    return (
        <div className={"ImageLoader " + (draggedOver ? 'dragged-over' : '')}
            onDragOver={$event => handleDragOver($event)}
            onDrop={$event => handleDrop($event)}
            onDragLeave={() => setDraggedOver(false)}
            >
            <label className="load-button" htmlFor="input">{draggedOver ? 'Déposer l\'image' : 'Charger une image'}</label>
            <input id="input" type="file"  accept="image/*" onChange={pictureChange}
            data-testid="image-loader-input"/>
            <SpeciesListButton />
        </div>
    )
}

export default ImageLoader;