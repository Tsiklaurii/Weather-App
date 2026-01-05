import { useContext } from "react"
import { DataContext } from "../../global/contexts/DataContext"


export const BackGround = () => {
    const { day } = useContext(DataContext);
    return (
        <div className="background" style={{ backgroundImage: `url(images/${day?.weather?.description?.toLowerCase().replaceAll(" ", "-")}.jpg)` }}></div>
    )
}