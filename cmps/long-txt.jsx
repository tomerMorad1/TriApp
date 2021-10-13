export function LongTxt({ txt, txtLength }) {

    return (
        <React.Fragment>
            {txt.substring(0, txtLength)}
            {txt.length > txtLength && <span>...</span>}
        </React.Fragment>
    )

}
