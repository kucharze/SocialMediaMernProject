export const usePosts = () => {
  const BASE_URL_POSTS = "http://localhost:3001/posts";
  // const BASE_URL_POSTS = "/posts";

  const loadPosts = async () => {
    try {
      const res = await axios.get(`${BASE_URL_POSTS}`);
      console.log("res is ", res.data);
      console.log("Post data", res.data);
      return res.data;
    } catch (error) {
      console.log("Error loading posts list ", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      console.log("Trying to delete");
      let res = await axios.delete(`${BASE_URL_POSTS}/delete/${id}`);
      console.log("Delete res is ", res.data);
      if (res.status === 200) {
        // setPostDesc("This post has been deleted");
        // setDisabled(true);
        return ["This post has been deleted", true];
      }
    } catch (error) {
      console.log("Error trying to delete a post");
    }
  };

  const handleEdit = async (newPost, id) => {
    try {
      const ax = await axios.put(
        `${BASE_URL_POSTS}/edit`,
        { post: newPost, id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(ax);

      // setPostDesc(pro);
      return true;
    } catch (error) {
      console.log("we had an edit error ", error._message);
      return false;
    }
  };

  return [loadPosts, handleEdit, handleDelete];
};
