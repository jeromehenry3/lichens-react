import './SpeciesListButton.scss';
import { useEffect, useState } from 'react';
import { AjaxError, ajaxGetJSON } from 'rxjs/internal/observable/dom/AjaxObservable';


const SpeciesListButton: React.FC<{}> = () => {
    const [labels, setLabels] = useState<string[]>([])
    const [showLabels, setShowLabels] = useState(false);
    const labelsObservable$ = ajaxGetJSON<string[]>(
        'https://jeromehenry.fr/lichens-api/get_labels',
        {  cache: "no-store" }
    );

    useEffect(() => {
        const subscription = labelsObservable$.subscribe(
            (value: string[]) => {
                setLabels(value);
            },
            (error: AjaxError) => {
                console.error(error);
            }
        );
        return () => { subscription.unsubscribe() };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const copySpeciesName: Function = (event: React.MouseEvent, label: string) => { 
        navigator.clipboard.writeText(label).then(() => {
            /* clipboard successfully set */
            console.log('copié !')
        }, () => {
            /* clipboard write failed */
            console.error('erreur !')
        });
    };

    return (
        <>
            <div className={"species-list " + (showLabels ? 'show': '')}>
                <div className="title">Expèces connues par le système : { labels.length } <br />
                (en développement)
                    <div className="subtitle">cliquer sur un nom pour copier</div>
                </div>
                {
                    labels.length && labels.map(label => (
                        <div
                            className="species-label"
                            key={label}
                            onClick={(event) => copySpeciesName(event, label)}
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