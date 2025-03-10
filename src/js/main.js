import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const button = document.querySelector('#button');
const input = document.querySelector('#input');
const gallery = document.querySelector('.gallery');
const API_KEY = '49258483-ada97ff0ca07db67d4b766dd0';
const loader = document.querySelector('.loader');
let page = 1;
let lightbox;

button.addEventListener('click', () => {
  loader.style.display = 'block';
  const query = input.value.trim();
  if (query === '') {
    return;
  }

  gallery.innerHTML = '';

  const URL = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(
    query
  )}&image_type=photo&orientation=horizontal&safesearch=true&per_page=15&page=${page}`;

  fetch(URL)
    .then(response => {
      if (!response.ok) {
        throw new Error(
          'Sorry, there are no images matching your search query. Please try again!'
        );
      }
      return response.json();
    })
    .then(data => {
      loader.style.display = 'none';
      const images = data.hits;

      if (images.length === 0) {
        throw new Error(
          'Sorry, there are no images matching your search query. Please try again!'
        );
      }

      const insertHTML = images
        .map(
          image =>
            `<li class="gallery-item">
          <div class="photo-cards">
            <ul class="photo-information">
            <li class="photo-information-list"><b>Likes:</b>  ${image.likes}</li>
            <li class="photo-information-list"><b>Views:</b>  ${image.views}</li>
            <li class="photo-information-list"><b>Comments:</b> ${image.comments}</li>
            <li class="photo-information-list"><b>Downloads:</b> ${image.downloads}</li>
            </ul>
          </div>
        <a class="gallery-link" href="${image.largeImageURL}">
            <img
                 class="gallery-image"
                 src="${image.webformatURL}"
                data-source="${image.largeImageURL}"
               alt="${image.tags}"
            />
        </a>
     </li>`
        )
        .join('');
      gallery.innerHTML = insertHTML;
        page++;
        
        input.value = '';

      if (!lightbox) {
        lightbox = new SimpleLightbox('.gallery a', {
          captionDelay: 250,
          captionsData: 'alt',
        });
      } else {
        lightbox.refresh();
      }
    })
    .catch(error =>
      iziToast.error({
        title: 'Error',
        message: error.message,
        position: 'topRight',
        timeout: 5000,
      })
    );
});
