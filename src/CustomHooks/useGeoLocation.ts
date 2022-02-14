import axios from "axios";
import { useEffect, useState } from "react";

export default function useGeoLocation() {
    const [countryName, setCountryName] = useState("")
    const [countryCode, setCountryCode] = useState("")
    const [city, setCity] = useState("")
    
    const getGeoInfo = () => {
        axios
            .get("https://ipapi.co/json/")
            .then((response) => {
                let data = response.data;
                setCountryName(data.country_name)
                setCountryCode(data.country_calling_code)
                setCity(data.city)
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        getGeoInfo();
    }, []);

    return { countryName, countryCode, city }
}
