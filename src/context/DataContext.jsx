import { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import PropTypes from "prop-types";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: null,
  });

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_API_URL);
      setState({ data: response.data, loading: false, error: null });
    } catch (err) {
      setState({ data: null, loading: false, error: "Error fetching data" });
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return <DataContext.Provider value={state}>{children}</DataContext.Provider>;
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
