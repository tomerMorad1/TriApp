export function OptionsList({ options, onAddBook }) {
    return (
        <div>
            <ul className="options-list">
                {options.map(option => {
                    return <li className="option" key={option.id}>{option.volumeInfo.title}
                        <button onClick={() => onAddBook(option)}>Add</button>
                    </li>
                })}
            </ul>
        </div>
    )

}