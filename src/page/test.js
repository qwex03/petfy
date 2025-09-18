import Header from "../composant/header";
import ListAnimals from "./ListAnimal";
import Navbar from "../composant/Navbar";

const Animals = () => {
    return(
        <div className="container test">
            <Header/>
            <ListAnimals/>
            <Navbar/>
        </div>
    )
}

export default Animals;