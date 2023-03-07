import { useDrag } from "react-dnd"
import styled from "styled-components"

export const Image = ({ uri, id }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "image",
        item: { id: id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }))
    return (
        <>
            {!isDragging && <div ref={drag} style={{ width: "200px", height: "auto", display: "inline-block" }}>
                <StyledImage src={uri} alt={id} isDragging={isDragging} />
            </div>}
        </>
    )
}

const StyledImage = styled.img`
    width: 200px;// add your desired width here
    height: 200px;
    /* opacity: ${({ isDragging }) => isDragging ? 0.5 : 1}; */
    border: ${({ isDragging }) => isDragging ? "3px solid #c1c1c1" : "3px solid transparent"};
    display:  ${({ isDragging }) => isDragging ? "none" : "block"};
`
