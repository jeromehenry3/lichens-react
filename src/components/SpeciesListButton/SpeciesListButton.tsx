import './SpeciesListButton.scss';
import { useEffect, useState } from 'react';



const SpeciesListButton: React.FC<{}> = () => {
    const [labels, setLabels] = useState([])
    const [showLabels, setShowLabels] = useState(false);

    useEffect(() => {
        fetch('https://jeromehenry.fr/lichens-api/get_labels', {
            // fetch('http://127.0.0.1:5000/get_labels', {
              method: "GET",
              headers: {
                "Content-Type": "application/json"
              },
              cache: "no-store"
            })
            .then(response => response.json())
            .then(labels => { setLabels(labels); })
    })
    return (
        <>
            <div className={"species-list " + (showLabels ? 'show': '')}>
                <div className="title"> Expèces connues par le système : { labels.length } <br />
                (en développement)</div>
                {
                    labels.length && labels.map(label => (
                        <div
                            className="species-label"
                            key={label}
                        >{ label }</div>
                    ))
                }
            </div>
            <div className="SpeciesListButton"
                onClick={() => setShowLabels(!showLabels)}
            >
                Espèces
                <span className="count">{ labels.length }</span>
            </div>
        </>
    )
}

export default SpeciesListButton;