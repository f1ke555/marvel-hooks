import './singleComic.scss';
import xMen from '../../resources/img/x-men.png';
import {useEffect, useState} from "react";
import useMarvelServices from "../../services/MarvelServices";
import {Link, useParams} from "react-router-dom";
import Loading from "../loading/Loading";

const SingleComic = () => {

    const [comics, setComics] = useState({})
    const comicId = useParams()

    const {getComicsById, error, loading} = useMarvelServices()
    useEffect(() => {
        getComicsById(comicId.id).then(res => setComics(res)).catch(error)
    }, [comicId.id])

    return (
        <div className="single-comic">
            <img src={comics.thumbnail} alt="x-men" className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{comics.title}</h2>
                <p className="single-comic__descr">{comics.description}</p>
                <p className="single-comic__descr">{comics.pageCount}</p>
                <p className="single-comic__descr">Language: {comics.language}</p>
                <div className="single-comic__price">{comics.price}$</div>
            </div>
            <Link to={'/comics'} className="single-comic__back">Back to all</Link>
        </div>
    )
}

export default SingleComic;