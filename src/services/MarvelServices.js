import useHttp from "../hooks/http.hook";

const useMarvelServices = () => {

    const {loading, request, error} = useHttp()

    const getAllCharacter = async (limit) => {
        const res = await request(`https://gateway.marvel.com:443/v1/public/characters?limit=${limit}&offset=210&apikey=b73e9082e363746f1c60109c1e61f715`)
        return res.data.results
    }

    const getAllComics = async (limit) => {
        const res = await request(`https://gateway.marvel.com:443/v1/public/comics?limit=${limit}&apikey=b73e9082e363746f1c60109c1e61f715`)
        return res.data.results
    }

    const getCharacterById = async (id) => {
        const res = await request(`https://gateway.marvel.com:443/v1/public/characters/${id}?apikey=b73e9082e363746f1c60109c1e61f715`)
        return _transformCharacter(res.data.results[0])
    }

    const getComicsById = async (id) => {
        const res = await request(`https://gateway.marvel.com:443/v1/public/comics/${id}?apikey=b73e9082e363746f1c60109c1e61f715`)
        return _transformComics(res.data.results[0])
    }

    const _transformComics = (comics) => {
        return {
            title: comics.title,
            description: comics.description || "There is no description",
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            pageCount: comics.pageCount
                ? `${comics.pageCount} p.`
                : "No information about the number of pages",
            price: comics.prices[0].price
                ? `${comics.prices[0].price}$`
                : "not available",
            language: comics.textObjects[0]?.language || "en-us"

        }
    }
    const _transformCharacter = (char) => {
        return  {
            name: char.name,
            description: char.description,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[0].url,
            comics: char.comics.items
        }
    }

    return {request, loading, error, getAllCharacter, getCharacterById, getAllComics, getComicsById}
}

export default useMarvelServices;