import {instance} from '../configs/axios';

export default {
  allMovies: async (page?: number) => {
    return await instance.get(
      `/discover/movie?sort_by=popularity.desc&api_key=6b4357c41d9c606e4d7ebe2f4a8850ea&page=${
        page || 1
      }`,
    );
  },
  allGenres: async () => {
    return await instance.get(
      `/genre/movie/list?api_key=6b4357c41d9c606e4d7ebe2f4a8850ea`,
    );
  },
};
