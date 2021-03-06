import fetchJsonp from 'fetch-jsonp';
import { FETCH_ART } from './types';

export const fetchArt = () => async (dispatch) => {
  try{
    const response = await fetchJsonp('https://api.vk.com/method/'+
    'photos.get?owner_id=-117179920&album_id=246570102' +
    '&access_token=0989ad1e0989ad1e0989ad1ead09ec15a7009890989ad1e52f0d8c1830196143cdb8f23&v=5.52');
    const data = await response.json();
    dispatch({
      type: FETCH_ART,
      payload: data.response.items.reverse(),
    });
  }
  catch(err) {
      console.log(err)
  }
}