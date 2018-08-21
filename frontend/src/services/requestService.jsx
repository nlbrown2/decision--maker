import axios from 'axios';
export async function getGroupList(id) {
  let url = '/list';
  if(id) url += '/' + id;
  let result = await axios.get(url);
  console.log(result.data);
  return result.status === 200 ? result.data : 'Error';
}

export async function addListItem(name, parentId) {
  let item = {name, parentId};
  let result = await axios.post("/create", item);
  console.log(result.data);
  return result.status === 200 ? result.data : 'Error';
}

export async function removeListItem(id) {
  let result = await axios.delete("/delete", id);
  console.log(result);
  return result.status === 200 ? result.data : 'Error';
}
