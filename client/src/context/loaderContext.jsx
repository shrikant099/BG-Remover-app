import React, { createContext, useState, useContext } from "react";
import { BeatLoader } from "react-spinners";

const LoaderContext = createContext();

export const useLoader = () => useContext(LoaderContext);

export const LoaderProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const showLoader = () => setLoading(true);
  const hideLoader = () => setLoading(false);

  return (
    <LoaderContext.Provider value={{ showLoader, hideLoader }}>
      {loading && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <BeatLoader color="#ffffff" size={15} />
        </div>
      )}
      {children}
    </LoaderContext.Provider>
  );
};
