import React, {useMemo, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import apis from '../apis/apis';
import {constants, stylex} from '../utils/constants';
import FastImage from 'react-native-fast-image';
import usePagination from '../hooks/usePagination';

const Movies = ({route}: any) => {
  const {
    data: movies,
    isLoading,
    error,
    handleMore,
  }: any = usePagination(page => apis.allMovies(page)); // Fetch movies for the current page
  const filteredMovies = useMemo(() => {
    if (!movies) return [];
    return movies
      .filter((movie: any) => movie.genre_ids.includes(route.params.genre.id))
      .map(({id, poster_path}: {id: number; poster_path: string}) => ({
        id,
        poster_path,
      }));
  }, [movies, route.params.genre.id]);

  const loadMoreMovies = () => {
    handleMore();
  };

  const renderItem = ({item}: {item: any}) => (
    <TouchableOpacity key={item.id}>
      <FastImage
        source={{
          uri: `https://image.tmdb.org/t/p/w370_and_h556_bestv2/${item.poster_path}`,
          priority: FastImage.priority.normal,
          cache: 'immutable',
        }}
        style={styles.img}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );

  if (isLoading) return <Text>Loading...</Text>; // Show loading only for the initial fetch
  if (error) return <Text>Error: {error}</Text>;
  if (!filteredMovies.length) return null; // Return null if no movies found for the genre

  return (
    <View style={stylex.container}>
      <FlatList
        data={filteredMovies}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.moviesContainer}
        numColumns={2} // Set the number of columns
        onEndReached={loadMoreMovies} // Load more movies when reaching the end
        onEndReachedThreshold={0.5} // Load more when 50% of the remaining items are visible
        ListFooterComponent={() =>
          isLoading && (
            <ActivityIndicator size={20} color={constants.secondary} />
          )
        } // Show loading indicator when loading more
        columnWrapperStyle={{
          justifyContent: `space-between`,
        }}
      />
    </View>
  );
};

export default Movies;

const styles = StyleSheet.create({
  moviesContainer: {
    paddingHorizontal: 10,
  },
  img: {
    height: 200,
    width: Dimensions.get('screen').width * 0.45,
    marginBottom: 20,
    borderRadius: 8,
  },
});
