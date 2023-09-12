import './charInfo.scss';
import {useEffect, useState} from "react";
import Loading from "../loading/Loading";
import ErrorMessage from "../errorMessage/errorMessage";
import useMarvelServices from "../../services/MarvelServices";

const CharInfo = ({charId}) => {

    const {getCharacterById, error, loading} = useMarvelServices()

    const [char, setChar] = useState({})


    useEffect(() => {
        if (charId !== null) {
            getCharacterById(charId).then(res => setChar(res)).catch(error)
        }
    }, [charId])

    if (error) {
        return <ErrorMessage/>
    }

    let imgStyle = {'objectFit' : 'cover'};

    if (char.thumbnail?.includes('b/40/image_not_available.jpg')) {
        imgStyle = {'objectFit' : 'contain'};
    }

    if (loading) {
        return <Loading/>
    }

    if (char.name === undefined) {
        return <span>Выберите персонажа</span>
    }

    return (
        <div className="char__info">
            <div className="char__basics">
                <img style={imgStyle} src={char.thumbnail} alt={char.name}/>
                <div>
                    <div className="char__info-name">{char.name}</div>
                    <div className="char__btns">
                        <a href={char.homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={char.wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {char.description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {char.comics.length > 0 ? null : 'Данный персонаж не участвовал в комиксах'}
                {
                    char.comics?.map((item, index) => {
                        if (index > 10) return;
                        return (
                            <li className="char__comics-item">
                                {item.name}
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default CharInfo;