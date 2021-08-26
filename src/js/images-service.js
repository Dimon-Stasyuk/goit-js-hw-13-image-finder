export default class ImagesApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
  fetchArticles() {
    return fetch(
      `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&&key=23097756-2661a8d66efd3b5956221c710`,
    )
      .then(response => response.json())
      .then(data => {
        this.incrementPage();
        return data.hits;
      });
  }

  resetPage() {
    this.page = 1;
  }
  incrementPage() {
    this.page += 1;
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
