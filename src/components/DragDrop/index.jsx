import { Image } from "components/Image"
import { images } from "constants/index"


export const DragDrop = () => {
    return (
        <div>
            <div style={{ display: "flex", gap: ".5rem", justifyContent: "center" }}>
                {images?.map(({ uri, id }) => <Image key={id} uri={uri} id={id} />)}
            </div>
            <div style={style}>

            </div>
        </div>
    )
}

const style = { border: "1px solid #c1c1c1", width: "700px", margin: "0 auto", height: "300px", marginTop: "8rem", display: "flex", justifyContent: "center", gap: ".5rem" }