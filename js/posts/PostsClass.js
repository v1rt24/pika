import Users from '../auth/Users.js';

class PostsClass {
  static allPost = [];

  static async addPost (title, text, tags, handler) {
    tags = tags.replaceAll(' ', '').split(',');

    const post = {
      title,
      text,
      tags,
      author: Users.user.displayName,
      date: new Date().toLocaleString(),
      like: 0,
      comments: 0,
    };

    try {
      await firebase.database().ref('post').push(post);

      this.allPost.unshift(post);

      if (handler) {
        handler();
      }
    }
    catch (error) {
      throw error;
    }
  }

  static async getPosts (handler) {
    try {
      let posts = await firebase.database().ref('post').once('value');
      posts = posts.val() || [];

      for (const key of Object.keys(posts)) {
        this.allPost.push({...posts[key], id: key});
      }

      handler();
    }
    catch (error) {
      throw error;
    }
  }
}

export default PostsClass;