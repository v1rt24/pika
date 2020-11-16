import PostsClass from './PostsClass.js';
import { validationFormFields } from '../utils.js';

const
  postsElem = document.querySelector('.posts'),
  buttonNewPostElem = document.querySelector('.button-new-post'),
  addPostElem = document.querySelector('.add-post')
;

const showAllPosts = () => {
  postsElem.textContent = '';

  const html = PostsClass.allPost.map(post => {

    let tags = '';
    if (post.tags && post.tags.length) {
      tags = '<div class="tags">';
      for (const tag of post.tags) {
        tags += `<a href="#${tag}" class="tag">#${tag}</a>`;
      }
      tags += '</div>';
    }

    return `
      <section class="post">
          <div class="post-body">
              <h2 class="post-title">${post.title}</h2>
              <p class="post-text">${post.text}</p>
              ${tags}
          </div>
          <div class="post-footer">
              <div class="post-buttons">
                  <button class="post-button likes">
                      <svg width="19" height="20" class="icon icon-like">
                          <use xlink:href="img/icons.svg#like"></use>
                      </svg>
                      <span class="likes-counter">${post.like}</span>
                  </button>
                  <button class="post-button comments">
                      <svg width="21" height="21" class="icon icon-comment">
                          <use xlink:href="img/icons.svg#comment"></use>
                      </svg>
                      <span class="comments-counter">${post.comments}</span>
                  </button>
                  <button class="post-button save">
                      <svg width="19" height="19" class="icon icon-save">
                          <use xlink:href="img/icons.svg#save"></use>
                      </svg>
                  </button>
                  <button class="post-button share">
                      <svg width="17" height="19" class="icon icon-share">
                          <use xlink:href="img/icons.svg#share"></use>
                      </svg>
                  </button>
              </div>
              <div class="post-author">
                  <div class="author-about">
                      <a href="#" class="author-username">${post.author}</a>
                      <span class="post-time">${post.date}</span>
                  </div>
                  <a href="#" class="author-link"><img src="img/avatar.jpeg" alt="avatar" class="author-avatar"></a>
              </div>
          </div>
      </section>
    `;
  }).join('');

  postsElem.insertAdjacentHTML('beforeend', html);
};

const showAddPost = event => {
  event.preventDefault();
  postsElem.classList.add('noVisible');
  addPostElem.classList.add('visible');
};

const formPostSubmit = async event => {
  event.preventDefault();
  const form = event.target;

  if (validationFormFields(form)) {
    const {title, text, tags} = form.elements;

    try {
      await PostsClass.addPost(title.value, text.value, tags.value, showAllPosts);

      addPostElem.classList.remove('visible');
      addPostElem.reset();
      postsElem.classList.remove('noVisible');
    }
    catch (error) {
      console.log(error);
    }
  }
  else {
    alert('Заполните все поля');
  }
};

buttonNewPostElem.addEventListener('click', showAddPost);

addPostElem.addEventListener('submit', formPostSubmit);

(async () => await PostsClass.getPosts(showAllPosts))();