import {useState, useEffect} from "react";
import axios from "axios";



const useFetch = (endpoint, query) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const options = {
        method: 'GET',
        url: `https://jsonplaceholder.typicode.com/${endpoint}`,
        // headers: {
        //     'X-RapidAPI-Key': 'b25a2143cfmsh035b9562cdeeb62p132a4ejsnb279e48ec1ad',
        //     'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        // },
        params: {...query},
    };

    // console.log(options)

    const fetchData = async () => {
        setIsLoading(true);

        try {
            const response = await axios.request(options);

            // console.log(response.data)

            setData(response.data);
            setIsLoading(false);

        } catch (error) {
            setError(error);
            alert('There is an error.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData().then(r => {});

    }, []);

    const refetch = () => {
        setIsLoading(true);
        fetchData().then(r => {});
    }

    return { data, isLoading, error, refetch}
}

export default useFetch;