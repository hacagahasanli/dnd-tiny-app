import { Image } from "components/Image"
import { images } from "constants/index"
import { useEffect, useState } from "react"
import { useDrop } from "react-dnd"


export const DragDrop = () => {
    const [imageSets, setImagesSets] = useState([])
    const [imagesS, setImagesS] = useState([
        {
            id: 1,
            uri: "https://images.pexels.com/photos/2449600/pexels-photo-2449600.png?auto=compress&cs=tinysrgb&w=600"
        },
        {
            id: 2,
            uri: "https://images.pexels.com/photos/1853542/pexels-photo-1853542.jpeg?auto=compress&cs=tinysrgb&w=600"
        },
        {
            id: 3,
            uri: "https://images.pexels.com/photos/2387793/pexels-photo-2387793.jpeg?auto=compress&cs=tinysrgb&w=600"
        },
        {
            id: 4,
            uri: "https://images.pexels.com/photos/2387793/pexels-photo-2387793.jpeg?auto=compress&cs=tinysrgb&w=600"
        },
        {
            id: 5,
            uri: "https://images.pexels.com/photos/2387793/pexels-photo-2387793.jpeg?auto=compress&cs=tinysrgb&w=600"
        }
    ])

    const [{ isOver }, drop] = useDrop(() => ({
        accept: "image",
        drop: ({ id }) => addImageToSet(id),
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    }), [imagesS])


    const [{ isOverT }, dropT] = useDrop(() => ({
        accept: "image",
        drop: ({ id }) => addImageToImages(id),
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    }), [imageSets])

    const providerHandler = (images, id) => {
        const image = images?.find((image) => image?.id === id)
        const isLocated = images?.some((item) => item?.id === image?.id)
        const filteredImages = images?.filter((image) => image?.id !== id)
        return { image, isLocated, filteredImages }
    }

    const addImageToSet = async (id) => {
        const { image, isLocated, filteredImages } = providerHandler(imagesS, id)
        setImagesS(filteredImages)
        if (isLocated) setImagesSets((prev) => [...prev, image])
    }


    const addImageToImages = async (id) => {
        const { image, isLocated, filteredImages } = providerHandler(imageSets, id)
        setImagesSets(filteredImages)
        if (isLocated) setImagesS((prev) => [...prev, image])
    }

    return (
        <div style={{ width: "100%", padding: 0, position: "relative" }} >
            <div ref={dropT} style={{ display: "flex", gap: ".5rem", justifyContent: "center", flexWrap: "wrap", minWidth: "800px", minHeight: "300px", margin: "0 auto" }}>
                {imagesS?.map(({ uri, id }) => <Image key={id} uri={uri} id={id} />)}
            </div>
            <div style={style} ref={drop} >
                {imageSets?.map((item, index) => <Image key={item?.id} uri={item?.uri} id={item?.id} />)}
            </div>
        </div>
    )
}

const style = {
    padding: "2rem",
    border: "1px solid #c1c1c1",
    width: "700px",
    minHeight: "200px",
    margin: "5rem auto",
    display: "grid",
    justifyContent: "center",
    placeItems: "center",
    gridTemplateColumns: "repeat(3,1fr)",
}