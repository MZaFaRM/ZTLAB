// LayoutDataContext.js
import React, {createContext, useContext, useState, useEffect} from 'react';

const LayoutDataContext = createContext();

export const useLayoutData = () => useContext(LayoutDataContext);

export const LayoutDataProvider = ({children}) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const layoutData = await fetchLayoutData();
      setData(layoutData);
    };
    fetchData();
  }, []);

  return (
    <LayoutDataContext.Provider value={data}>
      {children}
    </LayoutDataContext.Provider>
  );
};
