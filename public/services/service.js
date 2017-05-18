(() => {
  'use strict'

  const app = angular.module('app', ['ui.router', 'ngMessages', 'angularMoment'])

  app.service('shareDataService', function($http) {


    $http.get('https://boughton-reddit.herokuapp.com/blogs/')
      .then(result => {
        this.posts = result.data
        $http.get('https://boughton-reddit.herokuapp.com/comments/').then(nextFunc => {
          for (var i = 0; i < this.posts.length; i++) {
            this.posts[i].comments = []
          }
          for (var i = 0; i < this.posts.length; i++) {
            for (var j = 0; j < nextFunc.data.length; j++) {
              if (this.posts[i].id == nextFunc.data[j].blog_id) {
                this.posts[i].comments.push(nextFunc.data[j])
              }
            }
          }
        }).catch(error => {console.log(error)})
      })
      .catch(error => {
        console.log(error)
      })

    this.oneBlog = function(id) {
      $http.get(`https://boughton-reddit.herokuapp.com/blogs/${id}`)
      .then(result => {
        this.onePost = []
        this.onePost = result.data[0]
        // this.onePost.body = result.data[0].body
      })
      .catch(error => {
        console.log(error)
      })
    }

    this.oneComment = function(id){
      $http.get(`https://boughton-reddit.herokuapp.com/comments/allperblog/${id}`)
      .then(result => {
        this.oneBlogComment = []
        this.oneBlogComment = result.data
      })
      .catch(error => {
        console.log(error)
      })
    }



    this.PostBlog = function(newPost) {
      this.posts.push(newPost)
      $http.post('https://boughton-reddit.herokuapp.com/blogs/new', {title:newPost.title, author:newPost.author, body:newPost.body, image_url:newPost.image_url})
        .then(result => {
          console.log(result)
        })
        .catch(error => {console.log(error)})

    }

    this.addComment = function(comment, id){
      $http.post('https://boughton-reddit.herokuapp.com/comments/new', {
        author:comment.author,
        comment:comment.comment,
        blog_id:id.id
      }).then(result => {
        console.log(result)
      })
        .catch(error => {
          console.log(error)
        })

    }

    this.Votes = function(votes) {
        $http.patch(`https://boughton-reddit.herokuapp.com/blogs/votes/${votes.id}`, {votes:votes.votes}).then(result => {
          console.log(result)
        })
        .catch(error => {console.log(error)})
    }

    this.deletePost = function(deletePost) {
      for(var i = 0; i < this.posts.length; i++) {
      if(this.posts[i].id == deletePost) {
        this.posts.splice(i, 1);
        break;
      }
      }
      $http.delete(`https://boughton-reddit.herokuapp.com/blogs/${deletePost}`)
        .then(result => {console.log(result)})
        .catch(error => {console.log(error)})
    }

    this.deleteComment = function(commentId, blogId) {
      for(var i = 0; i < this.posts.length; i++) {
        if(this.posts[i].id == blogId) {
            for (var j = 0; j < this.posts[i].comments.length; j++) {
              if (this.posts[i].comments[j].id == commentId){
                this.posts[i].comments.splice(j, 1)
                break;
              }
            }
          }
      }
      $http.delete(`https://boughton-reddit.herokuapp.com/comments/${commentId}`)
      .then(result => {console.log(result)})
      .catch(error => {console.log(error)})

    }

  })

})()
