export const baseUrl = 'https://auth.nomoreparties.co'

const request = ({
  url,
  method = 'POST',
  token,
  data,
}) => {
  return fetch (`${baseUrl}${url}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...!!token && {'Authorization': `Bearer ${token}`},
    },
    ...!!data && {body: JSON.stringify({ data })},
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(response.status);
    });
};

export const register = (password, email) => {
  return request({
    url: '/signup',
    data: { password, email }
  });
};

export const authorize = (password, email) => {
  return request({
    url: '/signin',
    data: { password, email }
  });
};

export const checkToken = (token) => {
  return request({
    url: '/users/me',
    method: 'GET',
    token,
  });
};