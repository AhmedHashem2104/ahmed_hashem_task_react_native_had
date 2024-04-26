import React, {useMemo} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import useFetch from '../hooks/useFetch';
import apis from '../apis/apis';
import {constants, stylex} from '../utils/constants';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

type Props = {
  data: any;
};

const Paginator = ({data}: Props) => {
  const {data: movies, isLoading, error} = useFetch(apis.allMovies());
  const navigation = useNavigation<any>();
  const filteredMovies = useMemo(() => {
    if (!movies || !movies.results) return [];
    return movies.results
      .filter((movie: any) => movie.genre_ids.includes(data.id))
      .map(({id, poster_path}: {id: number; poster_path: string}) => ({
        id,
        poster_path,
      }));
  }, [movies, data.id]);

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error}</Text>;
  if (!filteredMovies.length) return null; // Return null if no movies found for the genre

  return (
    <View
      style={[
        stylex.container,
        {
          marginTop: 20,
        },
      ]}>
      <View style={styles.row}>
        <Text style={styles.title}>{data.name}</Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Movies', {
              genre: data,
            })
          }>
          <Text style={styles.seeAll}>See all</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal>
        {filteredMovies.map((movie: any) => (
          <TouchableOpacity key={movie.id}>
            <FastImage
              source={{
                uri: `https://image.tmdb.org/t/p/w370_and_h556_bestv2/${movie.poster_path}`,
                priority: FastImage.priority.normal,
                cache: 'immutable',
              }}
              style={styles.img}
              resizeMode="cover"
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default Paginator;

const styles = StyleSheet.create({
  title: {
    color: constants.secondary,
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  img: {
    height: 200,
    width: 150,
    marginRight: 15,
    borderRadius: 8,
  },
  row: {
    flex: 1,
    flexDirection: `row`,
    alignItems: `center`,
    justifyContent: `space-between`,
    alignSelf: `auto`,
    paddingRight: 20,
  },
  seeAll: {
    color: constants.secondary,
    fontSize: 18,
    marginBottom: 20,
  },
});
