

export function ColorInput({onChangeColor}) {

    const colors = ['#FFAEBC','#8585EC', '#A0E7E5', '#B4F8C8', '#FBE7C6','#E67272','#ECD282','#6BC6EE','#F09574','#F7EA7B','#c5f78c','#ddf0a8','#00CED1'];

    return (
        <section className="color-input flex" >
                {colors.map(color => (
                    <article key={color} onClick={(event)=>onChangeColor(event,color)}
                    style={{ backgroundColor: color }} className="color"></article>
                ))}

        </section>
    )
}