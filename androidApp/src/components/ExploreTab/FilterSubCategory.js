import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import CheckBox from '@react-native-community/checkbox';
import {globalCss} from '../../Utils/CSS';
import {GLOBALCOLOR} from '../../Utils/globalColor';
import {useProductsFilterFunctions} from '../../customHooks/ProductFilterCustomHook';

const FilterSubCategory = ({
  isFilterChildRadiosVisible,
  subCategoryData,
  filterType,
  handleCategoryToggle,
  selectedFilters,
}) => {
  const [toggleChildCheckBox, settoggleChildCheckBox] = useState({});

  const handleCheckBox = id => {
    settoggleChildCheckBox(prevState => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  //   const {
  //     handleCheckboxChange,
  //     selectedFilters,
  //     setProductsIsFilteringLoader,
  //     productsIsFilteringLoader,
  //   } = useProductsFilterFunctions();

  // console.log('36 ---> ', selectedFilters[filterType].includes("Tops")  );

  //   selectedFilters['size']?.includes(childSizes?.name);

  return (
    <View style={{marginTop: 0}}>
      <FlatList
        data={subCategoryData}
        keyExtractor={childItem => childItem.id.toString()}
        renderItem={({item: childItem}) => {
          const isChecked = selectedFilters[filterType]?.includes(
            childItem?.name,
          );

          return (
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => handleCategoryToggle(filterType, childItem?.name)}
              style={[
                globalCss.flexRow,
                {gap: 0, alignItems: 'center', marginTop: 0},
              ]}>
              <View>
                <CheckBox
                  disabled={false}
                  value={isChecked} // Set checkbox value based on whether item is selected
                  onValueChange={() =>
                    handleCategoryToggle(filterType, childItem?.name)
                  } // Handle toggle logic
                />
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 14,
                    color: GLOBALCOLOR.black2,
                    fontFamily: 'Nunito-Bold',
                  }}>
                  {childItem?.name}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default FilterSubCategory;

const styles = StyleSheet.create({});
