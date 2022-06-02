// import { Text, TextProps } from './Themed';

import React from "react";
import { SearchBar } from "react-native-screens";

// export function MonoText(props: TextProps) {
//   return <Text {...props} style={[props.style, { fontFamily: 'space-mono' }]} />;
// }

export function Search() {

  const [searchQuery, setSearchQuery] = React.useState('');
  const onChange = (query) => setSearchQuery(query);

  return (
    <SearchBar
      placeholder="Rechercher..."
      onChangeText={onChange}
      value={searchQuery}
    />
  )
}