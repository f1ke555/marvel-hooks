import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import {Component, useEffect, useState} from "react";
import MarvelServices from "../../services/MarvelServices";
import Loading from "../loading/Loading";
import ErrorMessage from "../errorMessage/errorMessage";
import useMarvelServices from "../../services/MarvelServices";


const RandomChar = () => {

    const [char, setChar] = useState([])

    const {getCharacterById, error, loading} = useMarvelServices()

    useEffect(() => {
        updateChar()
    }, [])

    const updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
        getCharacterById(id).then(res => setChar(res)).catch(error)
    }


        let imgStyle = {'objectFit' : 'cover'};

        if (char.thumbnail?.includes('b/40/image_not_available.jpg')) {
            imgStyle = {'objectFit' : 'contain'};
        }
        if (loading) {
            return <Loading/>
        }
        if (error) {
            return <ErrorMessage/>
        }

        return (
            <div className="randomchar">
                <div className="randomchar__block">
                    <img style={imgStyle} src={char.thumbnail} alt="Random character" className='randomchar__img'/>
                    <div className="randomchar__info">
                        <p className="randomchar__name">{char.name}</p>
                        <p className="randomchar__descr">
                            {char.description}
                        </p>
                        <div className="randomchar__btns">
                            <a href={char.homepage} className="button button__main">
                                <div className="inner">Homepage</div>
                            </a>
                            <a href={char.wiki} className="button button__secondary">
                                <div className="inner">wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button
                        onClick={updateChar}
                        className="button button__main">
                        <div
                            className="inner">try it
                        </div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
}

export default RandomChar;