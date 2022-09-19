import {useState} from "react";

export const useRegion = () => {
    const [region, setRegion] = useState<string>('EUW1');
    return {region, setRegion}
}