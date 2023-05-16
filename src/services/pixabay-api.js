function fetchImagesWithQuery(name, page = 1) {
  return fetch(
    `https://pixabay.com/api/?q=${name}&page=${page}&key=34892957-edf6b51172121986d596d6631&image_type=photo&orientation=horizontal&per_page=12`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(new Error(`There are no images by name ${name}`));
  });
}

const pixabayAPI = {
  fetchImagesWithQuery,
};

export default pixabayAPI;
