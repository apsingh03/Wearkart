import React, {useState, useEffect, useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {clientShowFilteredProductsAsync} from '../Redux/ClientSlices/clientProductSlice';

const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};

export const useProductsFilterFunctions = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation(); // Replace with useNavigate
  const [selectedFilters, setSelectedFilters] = useState({
    category: [],
    color: [],
    size: [],
    // price: {gte: null, lte: null},
  });

  const [productsIsFilteringLoader, setProductsIsFilteringLoader] =
    useState(false);

  const handleFilterChange = async updatedFilters => {
    setSelectedFilters(updatedFilters);
    // updateURL(updatedFilters);

    setProductsIsFilteringLoader(true);
    await dispatch(clientShowFilteredProductsAsync({filters: updatedFilters}));
    setProductsIsFilteringLoader(false);
  };

  const handleCheckboxChange = (filterType, subCatName, isChecked) => {
    const updatedFilters = {...selectedFilters};
    if (isChecked) {
      updatedFilters[filterType] = [...updatedFilters[filterType], subCatName];
    } else {
      updatedFilters[filterType] = updatedFilters[filterType].filter(
        value => value !== subCatName,
      );
    }
    handleFilterChange(updatedFilters);
  };

  const clearAllFilter = () => {
    const filters = {
      category: [],
      color: [],
      size: [],
    };

    handleFilterChange(filters);
  };

  const debouncedHandleFilterChange = useCallback(
    debounce(handleFilterChange, 300),
    [],
  );

  const updateURL = filters => {
    // Navigation logic instead of URLSearchParams
    const params = {
      category: filters.category,
      color: filters.color,
      size: filters.size,
      priceGte: filters.price.gte,
      priceLte: filters.price.lte,
    };
    navigation.navigate('FilteredProducts', {filters: params}); // Example of passing filters as route params
  };

  return {
    selectedFilters,
    handleFilterChange,
    handleCheckboxChange,
    updateURL,
    setProductsIsFilteringLoader,
    productsIsFilteringLoader,
    clearAllFilter,
  };
};
