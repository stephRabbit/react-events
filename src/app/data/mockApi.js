import mockData from './mockData';

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

//export const fetchMockData = () => delay(1000).then(() => Promise.resolve(mockData));
export const fetchMockData = async () => {
  await delay(1000);
  return Promise.resolve(mockData);
};