import axios from '../utils/axios';

export const reloadAxios = () => {
  axios.interceptors.request.use(
    (config) => {
      if (localStorage.getItem('accessToken')) {
        config.headers['Authorization'] =
          'Token ' + localStorage.getItem('accessToken');
      }
      config.headers['Content-Type'] = 'application/json';
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );
};

//Novos

export const getTutorials = async (controller, page = 1) => {
  const res = await axios.get('/api/publication/', {
    signal: controller.signal,
    params: {
      page: page,
    }
  });
  return res ? res.data : null;
};

export const getUpgrades = async (controller) => {
  const res = await axios.get('/api/plan/', {
    signal: controller.signal,
  });
  return res ? res.data : null;
};

//Antigos

export const login = async (data) => {
  const res = await axios.post('/api/login/', data);
  return res ? res.data : null;
};

export const recover = async (data) => {
  const res = await axios.post('/api/recover/', data);
  return res ? res.data : null;
};
export const forgot = async (email) => {
  const res = await axios.get('/api/recover/?email=' + email);
  return res ? res.data : null;
};
export const acceptTerms = async () => {
  reloadAxios();
  const res = await axios.post('/api/terms/');
  return res ? res.data : null;
};
export const getDashboard = async () => {
  reloadAxios();
};
export const getUser = async () => {
  reloadAxios();
  const res = await axios
    .get('/api/user/')
    .catch(() => localStorage.setItem('accessToken', ''));
  return res ? res.data : null;
};
export const getBots = async () => {
  reloadAxios();
  const res = await axios
    .get('/api/bot/')
    .catch(() => localStorage.setItem('accessToken', ''));
  return res ? res.data : null;
};
export const saveManagement = async (data) => {
  reloadAxios();
  const res = await axios
    .post('/api/history/', data)
    .catch(() => localStorage.setItem('accessToken', ''));
  return res ? res.data : null;
};
export const getManagement = async (start = null, end = null) => {
  reloadAxios();
  if (start && end) {
    const res = await axios
      .get(`/api/history/?start=${start}&end=${end}`)
      .catch(() => localStorage.setItem('accessToken', ''));
    return res ? res.data?.history : null;
  } else {
    const res = await axios
      .get('/api/history/')
      .catch(() => localStorage.setItem('accessToken', ''));
    return res ? res.data?.history : null;
  }
};
export const getXml = async (id) => {
  reloadAxios();
  const res = await axios
    .get(`/api/xml/?xml=${id}`)
    .catch(() => localStorage.setItem('accessToken', ''));
  return res ? res.data : null;
};
export const log = async (id) => {
  reloadAxios();
  const res = await axios
    .post(`/api/log/`, { xml: id })
    .catch((err) => console.log('Error logging bot'));
  return res ? res.data : null;
};
export const setPicture = async (img) => {
  reloadAxios();
  const res = await axios.post('/api/user/', { image: img }); //.catch(() => localStorage.setItem("accessToken", ""))
  return res ? res.data : null;
};
export const getTopics = async () => {
  reloadAxios();
  const res = await axios
    .get('/api/topics/')
    .catch(() => localStorage.setItem('accessToken', ''));
  return res ? res.data : null;
};
export const getArticle = async (id) => {
  reloadAxios();
  const res = await axios
    .get(`/api/article/${id}/`)
    .catch(() => localStorage.setItem('accessToken', ''));
  return res ? res.data : null;
};
export const setRating = async (id, rating) => {
  reloadAxios();
  const res = await axios
    .post(`/api/rating/`, { bot: id, rating: rating })
    .catch(() => localStorage.setItem('accessToken', ''));
  return res ? res.data : null;
};
export const getInvestment = async () => {
  reloadAxios();
  const res = await axios
    .get(`/api/investment/`)
    .catch(() => localStorage.setItem('accessToken', ''));
  return res ? res.data : null;
};
