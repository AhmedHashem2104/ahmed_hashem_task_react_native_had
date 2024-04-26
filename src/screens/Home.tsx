import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import {ScrollView} from 'react-native-virtualized-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import useFetch from '../hooks/useFetch';
import apis from '../apis/apis';
import Paginator from '../components/Paginator';
import {constants, stylex} from '../utils/constants';

const Home = () => {
  const [genres, setGenres] = useState([]);
  const [firstMovie, setFirstMovie] = useState<any>(null);
  const {data, isLoading, error} = useFetch(apis.allMovies());

  useEffect(() => {
    const fetchData = async () => {
      const genresData = await apis.allGenres();
      setGenres(genresData.data.genres);
      if (data && data.results && data.results.length > 0) {
        const firstMovieData = data.results[0];
        const genreIds = firstMovieData.genre_ids || [];
        const genresArray = genreIds.map((id: number) =>
          genresData.data.genres.find((genre: any) => genre.id === id),
        );
        setFirstMovie({
          ...firstMovieData,
          genres: genresArray,
        });
      }
    };
    fetchData();
  }, [data]);

  if (error || isLoading || !firstMovie) return null;

  return (
    <ScrollView style={stylex.container}>
      <ImageBackground
        source={{
          uri: `https://image.tmdb.org/t/p/w370_and_h556_bestv2/${firstMovie.poster_path}`,
        }}
        style={styles.imageBackground}
      />
      <Text style={styles.mainTitle}>{firstMovie.title}</Text>
      <Text style={styles.mainReleaseDate}>
        {firstMovie.release_date}{' '}
        {firstMovie.genres.map((genre: any, index: number) => (
          <Text key={genre.id}> - {genre.name}</Text>
        ))}
      </Text>
      <View style={styles.row}>
        <TouchableOpacity style={styles.buttonContainer}>
          <Ionicons
            name="information-circle-outline"
            size={20}
            color={constants.secondary}
          />
          <Text style={styles.buttonText}>INFO</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer}>
          <Ionicons
            name="caret-forward"
            size={20}
            color={constants.secondary}
          />
          <Text style={styles.buttonText}>TRAILER</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.buttonContainer,
            {
              backgroundColor: `#E84F4E`,
            },
          ]}>
          <Text style={styles.buttonText}>ENTRADS</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={genres}
        renderItem={({item}) => <Paginator data={item} />}
        keyExtractor={(item, index) => index.toString()}
        style={styles.paginators}
      />
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  imageBackground: {
    height: Dimensions.get('screen').height * 0.5,
  },

  mainTitle: {
    textAlign: 'center',
    color: constants.secondary,
    marginTop: -50,
    fontSize: 40,
    fontWeight: 'bold',
  },
  mainReleaseDate: {
    textAlign: 'center',
    color: '#AD8A54',
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    backgroundColor: '#292E38',
    paddingVertical: 8,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: 5,
  },
  buttonText: {
    color: constants.secondary,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  paginators: {
    paddingLeft: 20,
    paddingBottom: 20,
  },
});
