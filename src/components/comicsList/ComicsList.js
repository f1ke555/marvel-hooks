import './comicsList.scss';
import uw from '../../resources/img/UW.png';
import xMen from '../../resources/img/x-men.png';
import {useEffect, useState} from "react";
import useMarvelServices from "../../services/MarvelServices";
import {Link, useNavigate} from "react-router-dom";
import Loading from "../loading/Loading";

const ComicsList = () => {

    const [limit, setLimit] = useState(12)
    const [comics, setComics] = useState([])

    const {getAllComics, error, loading} = useMarvelServices()

    const navigate = useNavigate()

    useEffect(() => {
        getAllComics(limit).then(res => setComics(res)).catch(error)
    }, [limit])

    const onClickLoadMore = () => {
        setLimit(limit => limit + 12)
    }


    if (loading) {
        return <Loading/>
    }

    return (
        <div className="comics__list">
            <ul className="comics__grid">
                {comics.map(item =>
                    <li className="comics__item">
                        <Link to={`/comics/${item.id}`}>
                            <img src={item.thumbnail.path + '.' + item.thumbnail.extension} alt={item.title} className="comics__item-img"/>
                            <div className="comics__item-name">{item.title}</div>
                            <div className="comics__item-price">{item.prices[0].price}$</div>
                        </Link>
                    </li>
                )}
            </ul>
            <button onClick={onClickLoadMore} className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;