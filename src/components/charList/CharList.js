import './charList.scss';
import {useEffect, useState} from "react";
import useMarvelServices from "../../services/MarvelServices";

const CharList = ({getChar}) => {

    const [characters, setCharacters] = useState(null)
    const [limit, setLimit] = useState(9)
    const [charEnded, setCharEnded] = useState(false)

    const {getAllCharacter} = useMarvelServices()

    useEffect(() => {
        getAllCharacter(limit).then(res => setCharacters(res))
        if (limit === 27) {
            setCharEnded(true)
        }
    }, [limit])

    const handleClickCharId = (id) => {
        getChar(id)
    }

     const handleClickLoadMore = () => {
        setLimit(limit => limit + 9)
    }

    return (
        <div className="char__list">
            <ul className="char__grid">
                {characters?.map(item =>
                        <li
                            key={item.id}
                            className="char__item"
                            onClick={() => handleClickCharId(item.id)}
                        >
                            <img src={item.thumbnail.path + '.' + item.thumbnail.extension} alt="character_img"/>
                            <div className="char__name">{item.name}</div>
                        </li>
                    )}
                </ul>
                <button
                    onClick={handleClickLoadMore}
                    style={{display: charEnded ? 'none' : 'block'}}
                    className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
}

export default CharList;