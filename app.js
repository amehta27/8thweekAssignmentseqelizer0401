const express = require('express')
const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')
const models = require('./models')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))

// tell express to use mustache templating engine
app.engine('mustache',mustacheExpress())
// the pages are located in views directory
app.set('views','./views')
// extension will be .mustache
app.set('view engine','mustache')

// create a new post

app.post('/add-new-post',(req,res) => {

  let title = req.body.title
  let body = req.body.body
  let category = req.body.category


  let post = models.post.build({
      title: title,
      body: body,
      category : category
    })
    post.save().then((savedPost) => {
      res.redirect('view-all-posts')
      //console.log(savedPost)
    })

})

app.get('/add-new-post',(req,res) => {
  res.render('add-new-post')
})

// get all the posts from the posts table
app.get('/view-all-posts',(req,res)=>{
models.post.findAll().then((posts) => {
   res.render('view-all-posts',{posts: posts})
  //console.log(posts)
})
})

app.post('/delete-post', (req,res) => {

  let postId = req.body.postId
  console.log(postId)
  // delete the post from the database using the postId
  // DELETE FROM posts WHERE postid = 3;

  // db.none('DELETE FROM posts WHERE postid = $1', [postId])
  // .then(()=>{
  //   console.log('success')
  // delete a post using its id

 models.post.destroy({
   where: {
     id : postId
   }
 }).then((deletedPost) => {
   res.redirect('/view-all-posts')
   console.log(deletedPost)
 })


  })



  app.get('/posts/edit/:postId',(req,res) => {

    let postId = req.params.postId

    // get post using the postId

    // find post by id
      models.post.findOne({
         where: {
             id : postId
              }
      }).then((post) => {
       console.log(post)
    //})
    // db.one('SELECT postid,title,body FROM posts WHERE postid = $1',[postId])
    // .then((post) => {
    //   console.log(post)
      res.render('edit-post',{post:post})
        //title:post.title,body:post.body,category:post.category

      })
    })

//})


  app.post('/update-post',(req,res) => {

  let title = req.body.title
  let body = req.body.body
  let postId = req.body.postId
  let category = req.body.category
  //console.log(postId)

  // db.none('UPDATE posts SET title = $1, body = $2 WHERE postid = $3',[title,body,postId])
  // .then(() => console.log("SUCCESS"))
  models.post.update({
  title : title, body:body, category : category
  },{
  where: {
    id : postId
  }
}).then(function(post){
  res.redirect('/view-all-posts')
  console.log(post)
})

})


app.listen(3000, () => console.log('server running'))
