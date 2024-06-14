import React, { Fragment, useState, useEffect } from "react";
import "./Search.css";
import axios from "axios";
import Product from "../Home/Product";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const debouncedSearch = setTimeout(() => {
      if (query) {
        axios
          .get(`http://localhost:4000/api/v1/products/search`, {
            params: { q: query },
          })
          .then((response) => {
            setResults(response.data);
            setError(null);
          })
          .catch((error) => {
            console.error("There was an error fetching the data!", error);
            setError(
              error.response ? error.response.data.message : error.message
            );
          });
      } else {
        setResults([]);
      }
    }, 500); // 500ms debounce time

    return () => clearTimeout(debouncedSearch);
  }, [query]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <Fragment>
      <form className="searchBox d-flex justify-content-center mx-auto">
        <input
          type="text"
          name="search"
          value={query}
          placeholder="Enter Something"
          className="searching-inputfield"
          onChange={handleInputChange}
        />
      </form>
      {error && <div className="error">{error}</div>}
      <div className="search-products-div">
        {results.map((result) => (
          <Product product={result} />
        ))}{" "}
        {console.log("results::::", results)}
      </div>
    </Fragment>
  );
};

export default Search;
