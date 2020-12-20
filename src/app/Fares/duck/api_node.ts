import axios from 'axios';

const BACK_HOST = process.env.REACT_APP_BACK_HOST;
const API_FARES = `${BACK_HOST}/fares`;

const fetchFares = (fareId?: Number) => {
  const url = fareId ? `${API_FARES}/${fareId}` : API_FARES;
  return axios.get(url).then((res) => {
    const dataReorganized = res.data.reduce((acc: any, el: any, i: number) => {
      const listIds = acc.map((el: any) => el.customer_id);
      const positionInArr = listIds.indexOf(el.customer_id);

      if (positionInArr === -1) {
        const newFare = {
          customer_name: el.customer_name,
          customer_id: el.customer_id,
          fare: [el],
        };
        acc.push(newFare);
      } else {
        let newFares = [...acc[positionInArr].fare];
        newFares.push(el);
        acc[positionInArr] = { ...acc[positionInArr], fare: newFares };
      }
      return acc;
    }, []);

    return { data: dataReorganized };
  });
};

export default {
  fetchFares,
};
