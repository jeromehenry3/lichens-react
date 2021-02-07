import './Results.scss';


const Results: React.FC<any> = props => {
    const { results } = props;

    return (
        <div className="Results">
            {
                results.map((species: {species: string, value: number}, index: number) => {
                    return <div className='results-species' key={species.species}>{species.species.split('_').join(' ') + ' (' + Math.round(species.value * 100) + '%)'}</div>
                })
            }
        </div>
    )
}

export default Results;