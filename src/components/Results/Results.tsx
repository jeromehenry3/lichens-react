import './Results.scss';


const Results: React.FC<any> = props => {
    const { results } = props;

    return (
        <div className="Results">
            {
                results.map((species: {species: string, value: number}) => {
                    return <div key={species.species}>{species.species.split('_').join(' ')}</div>
                })
            }
        </div>
    )
}

export default Results;