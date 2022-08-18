const API_KEY = '28202857-da67bbd245b1e5ba97a15a2d6';
const BASE_URL = 'https://pixabay.com/api/';

export default async function getImages(query, page) {
  const url = `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}
