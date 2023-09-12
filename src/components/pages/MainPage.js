import React, {useState} from 'react';
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import decoration from "../../resources/img/vision.png";
import AppHeader from "../appHeader/AppHeader";

const MainPage = () => {

    const [selectedChar, setSelectedChar] = useState(null)

    const getChar = (id) => {
        setSelectedChar(id)
    }

    return (
        <main>
            <ErrorBoundary>
                <RandomChar/>
            </ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary>
                    <CharList getChar={getChar}/>
                </ErrorBoundary>
                <ErrorBoundary>
                    <CharInfo charId={selectedChar}/>
                </ErrorBoundary>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </main>
    );
};

export default MainPage;