import { useCallback, useContext, useEffect, useState } from "react";
import { localData } from "../../../global/localData";
import { DataContext } from "../../../global/contexts/DataContext";

export const SearchBar = () => {
    const { changeCity } = useContext(DataContext);
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);

    const filterLocalData = useCallback(() => {
        const result = localData.filter((item) => {
            return item.toLowerCase().includes(searchValue.toLowerCase());
        }).map((item) => item.replace(/[0-9/./-/_]/g, '-').replace(/-+/g, '-').replace('- -', '-'));
        setSearchResult(result);
    }, [searchValue])

    const processCity = useCallback((city) => {
        changeCity(city);
        setSearchValue("");
        setSearchResult([]);
    }, [changeCity])

    useEffect(() => {
        if (searchValue.length >= 3) {
            const timer = setTimeout(() => {
                filterLocalData();
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [searchValue, filterLocalData])

    return (
        <div className="search_bar">
            <input type="text" placeholder="Search..." value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />

            {searchValue.length >= 3 ?
                <div className="search_bar_serults">
                    {searchResult.length > 0 ?
                        searchResult.map((item, index) => (
                            <div key={`search-result-list-item-${index}`} onClick={() => processCity(item)}>
                                {item}
                            </div>
                        ))
                        :
                        <div className="search_bar_no_serults">No Result</div>
                    }
                </div>
                :
                null
            }
        </div>
    )
}