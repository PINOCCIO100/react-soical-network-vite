import { fetcher } from "./fetcher";

export async function reqAllMyPosts() {
  return await fetcher.get(`/api/posts/my`).then(res => res.data)
}

export async function reqAllUserPosts(userID) {
  return await fetcher.get(`/api/posts/${userID}`).then(res => res.data)
}

export async function reqPublishPost(accepterID, post) {
  return await fetcher.post(`/api/posts/send`, { accepterID, post }).then(res => res.data)
}
export async function reqDeletePost(postID, senderID, accepterID) {
  return await fetcher.post('/api/posts/delete', { postID, senderID, accepterID }).then(res => res.data)
}