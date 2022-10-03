export const BASE_URL = 'https://auth.nomoreparties.co/'

const request = ({
  url,
  method = 'POST',
  token,
  data,
}) => {
  return fetch (`${BASE_URL}${url}`, {
    method,
    headers: {
      // 'Accept': 'application/json',
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
}

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

  // .then((data) => {
  //   if (data.user){
  //     localStorage.setItem('jwt', data.jwt);

  //     return data;
  //   }
  // })
  // .catch(err => console.log(err))
};
export const checkToken = (token) => {
  return request({
    url: '/users/me',
    method: 'GET',
    token,
  });
}