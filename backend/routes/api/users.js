const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const multer = require('multer');
const nodemailer = require("nodemailer");
const fileUpload = require('express-fileupload');
const path = require('path');
const fs = require('fs');
var url = require('url') ;

// Define Multer storage settings (destination and filename)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'assets/uploads/'); // Destination directory for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Unique file name
  },
});

const upload = multer({ storage: storage });

const validateRegisterInput = require("../../validation/register");
const validateRegisterInputOrg = require("../../validation/registerOrg");
const validateLoginInput = require("../../validation/login");
const validateProfileInput = require("../../validation/profile");
const validateInviteInput = require("../../validation/inviteUser");

const User = require("../../models/Users");
const InviteUser = require("../../models/InviteUser");
const Meeting = require("../../models/Meeting");




router.post("/invite-user", async (req, res) => {
  
  const authHeader = req.headers.authorization;
  console.log(authHeader);
  const token = authHeader.split(' ')[1];
  console.log(token);
  const secretOrKey='secret';
  jwt.verify(token, secretOrKey,async  (err, decoded) => {
    if (err) {
      // Handle token verification error
      console.error('Token verification failed:', err);
      return res.json({'Token verification failed:': err});
    } else {
      // The decoded object contains the payload data
      const payload = decoded;
      console.log('Decoded payload:', payload);
      const userId=payload.id;
   
    
  const { errors, isValid } = validateInviteInput(req.body);
  if (!isValid) {
    return res.json({ error: errors });
  }

  try {
   console.log(userId);
    const newUser = new InviteUser({
      email: req.body.email,
      status: "Inactive" ,
      user_id:userId,
    });
      newUser.save();

      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: "protolabznaveenphp@gmail.com",
          pass: "qbzuvkbarzabtryq",
        },
        tls: {
            ciphers:'SSLv3'
        }
      });

      const info = await transporter.sendMail({
        from: 'protolabznaveenphp@gmail.com', // sender address
        to: req.body.email, // list of receivers
        subject: "Invitation to Join (Protolabz)", // Subject line
        text: "", // plain text body
        html: `
        <p>Dear,</p>
        <p>I hope this message finds you well. We are excited to invite you to join Protolabz.</p>
        <p>Click on the following link:</p>
        <p><a href='http://localhost:3000/signup'>Click here to join</a></p>`,  // html body
      });
      return res.status(201).send('invite sended successfully'); 
     } catch (error) {
      console.error(error);
       return res.status(500).send(error);
     }
    }})
});


router.post("/update-profile", async (req, res) => {
  console.log(req.body)
  const authHeader = req.headers.authorization;
  console.log(authHeader);
  const token = authHeader.split(' ')[1];
  console.log(token);
  const secretOrKey='secret';
  jwt.verify(token, secretOrKey,async  (err, decoded) => {
    if (err) {
      // Handle token verification error
      console.error('Token verification failed:', err);
      return res.json({'Token verification failed:': err});
    } else {
      // The decoded object contains the payload data
      const payload = decoded;
      console.log('Decoded payload:', payload);
      const userId=payload.id;

      const { errors, isValid } = validateProfileInput(req.body);

      if (!isValid) {
        return res.json({ error: errors });
      }

      
      const newUser = {
        firstname: req.body.firstName,
        lastname: req.body.lastName,
        bio: req.body.bio,
   
      };
   
      try {

        const updatedData = await User.updateOne({ _id: userId }, newUser,{
          new: true
        });
        console.log(`Updated ${updatedData.nModified} document(s)`);
    
        return res.json({ data: updatedData });
      } catch (error) {
        console.error('Error updating data:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }    

    }})
  
  
});

router.post("/upload",upload.single('image'), async (req, res) => {

  const authHeader = req.headers.authorization;
  const token = authHeader.split(' ')[1];
  const secretOrKey='secret';
  jwt.verify(token, secretOrKey,async  (err, decoded) => {
    if (err) {
      // Handle token verification error
      console.error('Token verification failed:', err);
      return res.json({'Token verification failed:': err});
    } else {
   
      const payload = decoded;
      const userId=payload.id;

      try {

       const file = req.file;

              console.log(file);
        if (!file) {
          return res.status(400).json({ error: 'No file uploaded.' });

        }

        var hostname = req.headers.host; // hostname = 'localhost:8080'
      
        const BASE_URL ='http://' + hostname;

        const imageUrl = `${BASE_URL}/assets/uploads/${file.filename}`;
      
        const updatedData = await User.findOneAndUpdate(
          { _id: userId }, // Specify the condition to find the user to update
          {
            $set: {
              avatar: imageUrl,
            },
          },
          { new: true } // To get the updated document as the result
        );
      
        if (!updatedData) {
          return res.status(404).send('User not found');
        }
      
        return res.status(201).send('Image uploaded successfully');
      } catch (error) {
        console.error(error);
        return res.status(500).send('Image upload failed');
      }
      
    }})
  
  
});

router.get("/get-invite-users", async (req, res) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader);
  const token = authHeader.split(' ')[1];
  console.log(token);
  const secretOrKey='secret';
  jwt.verify(token, secretOrKey,async  (err, decoded) => {
    if (err) {
      // Handle token verification error
      console.error('Token verification failed:', err);
      return res.json({'Token verification failed:': err});
    } else {
      // The decoded object contains the payload data
      const payload = decoded;
     
   
      // const { errors, isValid } = validateInviteInput(req.body);
      // if (!isValid) {
      //   return res.json({ error: errors });
      // }


      try {

      const userId=payload.id;

       console.log('payloaad',payload);
 
         const InviteUserData = await InviteUser.find({'user_id':userId});

         console.log(InviteUserData);
    
       return res.json({ data: InviteUserData });
      } catch (error) {
        console.error('Error fetching data:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }    
    }})

});


router.get("/get-invite-users-company", async (req, res) => {
;
     
   
      try {

      //const userId=payload.id;

      const userId= "64f55c7a4cd6da2692f67545";

     
         const InviteUserData = await InviteUser.find({'user_id':userId});

         console.log(InviteUserData);
    
       return res.json({ data: InviteUserData });
      } catch (error) {
        console.error('Error fetching data:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }    
   
});


router.get("/get-meetings", async (req, res) => {
      console.log(req.body)
      const authHeader = req.headers.authorization;
      console.log(authHeader);
      const token = authHeader.split(' ')[1];
      console.log(token);
      const secretOrKey='secret';
      jwt.verify(token, secretOrKey,async  (err, decoded) => {
        if (err) {
          // Handle token verification error
          console.error('Token verification failed:', err);
          return res.json({'Token verification failed:': err});
        }else{

          const payload = decoded;
          // console.log('Decoded payload:', payload);
          const userId=payload.id;
      try {

       // const userData = await User.find({ _id: userId });
        const Meetings = await Meeting.find({ user_id: userId },'title createdAt  -_id');

        console.log(Meetings);
    
        return res.json({ data: Meetings });
      } catch (error) {
        console.error('Error fetching data:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }    

    }})
  
});

router.get("/get-meetings-front", async (req, res) => {
  
  try {
    const userId='64faf2f81d9e7789ed1d0052';
   // const userData = await User.find({ _id: userId });
    const Meetings = await Meeting.find({ user_id: userId },'title createdAt  -_id');

    console.log(Meetings);

    return res.json({ data: Meetings });
  } catch (error) {
    console.error('Error fetching data:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }    



});







router.get("/get-meeting-list", async (req, res) => {
  console.log(req.body)
  const authHeader = req.headers.authorization;
  console.log(authHeader);
  const token = authHeader.split(' ')[1];
  console.log(token);
  const secretOrKey='secret';
  jwt.verify(token, secretOrKey,async  (err, decoded) => {
    if (err) {
      // Handle token verification error
      console.error('Token verification failed:', err);
      return res.json({'Token verification failed:': err});
    }else{

      const payload = decoded;
      // console.log('Decoded payload:', payload);
      const userId=payload.id;
  try {

   // const userData = await User.find({ _id: userId });
    const Meetings = await Meeting.find({ user_id: userId });

    console.log(Meetings);

    return res.json({ data: Meetings });
  } catch (error) {
    console.error('Error fetching data:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }    

}})

});


router.get("/get-profile", async (req, res) => {
  console.log(req.body)
  const authHeader = req.headers.authorization;
  console.log(authHeader);
  const token = authHeader.split(' ')[1];
  console.log(token);
  const secretOrKey='secret';
  jwt.verify(token, secretOrKey,async  (err, decoded) => {
    if (err) {
      // Handle token verification error
      console.error('Token verification failed:', err);
      return res.json({'Token verification failed:': err});
    } else {
      // The decoded object contains the payload data
      const payload = decoded;
      // console.log('Decoded payload:', payload);
      const userId=payload.id;

      try {

        const userData = await User.find({ _id: userId });

        console.log(userData);
    
        return res.json({ data: userData });
      } catch (error) {
        console.error('Error fetching data:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }    

    }})
  
  
});

router.get("/get-profile-front", async (req, res) => {
  // console.log(req.body)
  // const authHeader = req.headers.authorization;
  // console.log(authHeader);
  // const token = authHeader.split(' ')[1];
  // console.log(token);
  // const secretOrKey='secret';
  // jwt.verify(token, secretOrKey,async  (err, decoded) => {
  //   if (err) {
  //     // Handle token verification error
  //     console.error('Token verification failed:', err);
  //     return res.json({'Token verification failed:': err});
  //   } else {
  //     // The decoded object contains the payload data
  //     const payload = decoded;
      // console.log('Decoded payload:', payload);
      //const userId=payload.id;

      const userId='64faf2f81d9e7789ed1d0052';

      try {

        const userData = await User.find({ _id: userId });

        console.log(userData);
    
        return res.json({ data: userData });
      } catch (error) {
        console.error('Error fetching data:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }    

    // }})
  
  
});

router.get("/get-profile-front-company", async (req, res) => {
  // console.log(req.body)
  // const authHeader = req.headers.authorization;
  // console.log(authHeader);
  // const token = authHeader.split(' ')[1];
  // console.log(token);
  // const secretOrKey='secret';
  // jwt.verify(token, secretOrKey,async  (err, decoded) => {
  //   if (err) {
  //     // Handle token verification error
  //     console.error('Token verification failed:', err);
  //     return res.json({'Token verification failed:': err});
  //   } else {
  //     // The decoded object contains the payload data
  //     const payload = decoded;
      // console.log('Decoded payload:', payload);
      //const userId=payload.id;

      const userId='64f55c7a4cd6da2692f67545';

      try {

        const userData = await User.find({ _id: userId });

        console.log(userData);
    
        return res.json({ data: userData });
      } catch (error) {
        console.error('Error fetching data:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }    

    // }})
  
  
});








router.post("/register", (req, res) => {
  console.log(req.body)
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.json({status:2,errors});
  }

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      errors.email = "Email already exists";
      return res.json({status:2,errors});
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      const newUser = new User({
        firstname: req.body.firstName,
        lastname: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        userType: 'individual',
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;

          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

router.post("/registerOrg", (req, res) => {

  const { errors, isValid } = validateRegisterInputOrg(req.body);

  if (!isValid) {
    return res.json({status:2,errors});
  }

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      errors.email = "Email already exists";
      return res.json({status:2,errors});
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200",
        r: "pg",
        d: "mm",
      });
   
      const newUser = new User({
        organization_id: req.body.organization_id,
        organization_name: req.body.organization_name,
        personal_name: req.body.personal_name,
        email: req.body.email,
        password: req.body.password,
        userType: 'company',
        
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;

          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});


router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.json({status:2,errors});
  }

  console.log(req.body);

  const email = req.body.signEmail;
  const password = req.body.signPassword;

  console.log(email);


 User.findOne({ email }).then(user => {
   if (!user) {
      errors.signEmail = "User email not found";
      return res.status(404).json({status:2,errors});
    }

 

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = { id: user.id, name: user.name, avatar: user.avatar };

        jwt.sign(
          payload,
          keys.secretOrKey, { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token

            });
          }
        );
      } else {
        errors.signPassword = "Password incorrect";
       
        return res.status(404).json({errors});
      }
    });
  });
});

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

module.exports = router;