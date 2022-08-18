let express = require('express');
let userRoute = express.Router();
var userModel = require('../model/UserModel');
let cors = require('cors');
const jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser');
userRoute.use(cookieParser());
userRoute.use(cors({
  origin: [
    "https://localhost:4200"
  ],
  credentials: true
}));
// Get all User
userRoute.route('/').get((req, res) => {
  userModel.find().sort({
    id: -1
  }).exec((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});


userRoute.route('/login').get((req, res, next) => {

});

var checkLogin = (req, res, next) => {
  var token = req.headers['authorization'];
  console.log(token);
  try {
    // console.log(req.Cookies.token);
    // var token = req.Cookies.token;
    var data = jwt.verify(token, "secret");
    console.log("token verify: " + data.name);
    userModel.findOne({
      name: data.name
    }).then(user => {
      console.log(user);
      if (user) {
        req.data = user;
        next()
      }
    })
  } catch (error) {
    console.log("email or password incorrect")
    return res.send({status: false})
  }
}

var checkAdmin = (req, res, next) => {
  if(req.data.name == 'Lê Quyết Anh'){
    return res.send(req.data)
  }else{
    console.log("You have not permission")
    return res.send({status: false});
  }
}

userRoute.route('/checkUser').get(checkLogin, (req, res) => {
  return res.send({
    user: req.data,
    loggedIn: req.data.name
  });
});

userRoute.route('/checkAdmin').get(checkLogin, checkAdmin, (req, res) => {

});

userRoute.route('/login').post((req, res, next) => {
  // console.log("login")
  let email = req.body.email;
  let password = req.body.password;

  userModel.findOne({
    email: email,
    password: password,
  }).exec((error, data) => {
    if (error) {
      console.log("error");
      return next(error);
    } else {
      var token = jwt.sign({
        name: data.name
      }, "secret", (error, token) => {
        // console.log("token sign: " + token)
        res.send({
          token: token
        })
      })

    }
  })
});

userRoute.route('/detailUser/:id').get((req, res) => {
  userModel.find({
    id: req.params.id
  }).exec((error, data) => {
    if (error) {
      return next(error);
    } else {
      // console.log(data);
      res.send(data)
    }
  })
})

userRoute.route('/detailUser/name/:name').get((req, res) => {
  userModel.find({
    name: req.params.name
  }).exec((error, data) => {
    if (error) {
      return next(error);
    } else {
      // console.log(data);
      res.send(data)
    }
  })
})

userRoute.route('/favorite').get((req, res) => {
  // console.log("favorite: " + req.session.user);
  userModel.find({
    email: req.session.user
  }).exec((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
      // console.log(data);
    }
  })
});

userRoute.route('/admin').get((req, res) => {
  // console.log("favorite: " + req.session.user);
  if (req.session.user == "lequyetanh@gmail.com") {
    res.send({
      admin: true
    })
  } else {
    res.send({
      admin: false
    })
  }
});

userRoute.route('/all').get((req, res) => {
  userModel.find().sort({
    id: 1
  }).exec((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
      // console.log(data);
    }
  })
});

userRoute.route('/update/:id').put((req, res, next) => {

  $old = userModel.find({
    id: req.params.id
  });
  // console.log($old);
  // console.log(req.body);
  userModel.updateOne($old, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      // console.log(error)
    } else {
      res.json(data)
      // console.log('Data updated successfully')
    }
  })
})

userRoute.route('/addFriend/:id').put((req, res, next) => {
  $old = userModel.find({
    id: req.params.id
  });
  userModel.updateOne($old, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data)
    }
  })
})


userRoute.route('/update/:id/avatar').put((req, res, next) => {
  req.session.newAvatar = req.body.avatar;
  $old = userModel.find({
    id: req.params.id
  });
  // console.log($old);
  // console.log(req.body);
  userModel.updateOne($old, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      // console.log(error)
    } else {
      res.json(data)
      // console.log('Data updated successfully')
    }
  })
})

userRoute.route('/create').post((req, res, next) => {
  // console.log(req.body);
  userModel.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

userRoute.route('/delete/:id').delete((req, res, next) => {
  // console.log("movie delete");
  userModel.deleteOne({
    id: req.params.id
  }).exec((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.send(data)
      // console.log("success delete");
    }
  })
})

module.exports = userRoute;
