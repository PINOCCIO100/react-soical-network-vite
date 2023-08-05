
// const template = async (userID) => {
//   return await fetcher.get(`/api/avatars/${userID}`).then(res => res);
// }


// Если получаем массив с ID пользователей, получаем массив с аватарками (api-endpoint)
// Если переменную с ID - переменную с аватаркой  

const template = (userID) => {
  // TODO Починить работу с .env файлом
  // return `${import.meta.env.REACT_APP_API_URL}/api/avatars/${userID}`
  return `${"http://localhost:3001"}/api/avatars/${userID}`
}

export function reqUsersAvatar(IDSource) {
  if (Array.isArray(IDSource)) {
    const res = [];
    for (let i = 0; i < IDSource.length; i++) {
      res[i] = template(IDSource[i]);
    }
    return res;
  }
  return template(IDSource);
}