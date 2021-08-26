// import './sass/main.scss';

import ImagesApiService from './js/images-service';
import imagesTpl from './templates/images.hbs';

const options = {
  headers: {
    Authorization: '23097756-2661a8d66efd3b5956221c710',
  },
};

const refs = {
  searchForm: document.querySelector('#search-form'),
  loadMoreBtn: document.querySelector('.load-more-btn'),
  imagesList: document.querySelector('.gallery'),
};

const imagesApiService = new ImagesApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();

  imagesApiService.searchQuery = e.currentTarget.elements.query.value;
  imagesApiService.resetPage();
  imagesApiService.fetchArticles().then(img => {
    clearFeal();
    appendImagesMarkup(img);
    refs.loadMoreBtn.style.visibility = 'visible';
  });
}

function onLoadMore(e) {
  imagesApiService.fetchArticles().then(appendImagesMarkup);
  scrollingPage();
}

function appendImagesMarkup(images) {
  refs.imagesList.insertAdjacentHTML('beforeend', imagesTpl(images));
}

function clearFeal() {
  refs.imagesList.innerHTML = '';
}

function scrollingPage() {
  try {
    setTimeout(() => {
      refs.imagesList.scrollIntoView({
        block: 'end',
        behavior: 'smooth',
      });
    }, 1000);
  } catch (error) {
    console.log(error);
  }
}
