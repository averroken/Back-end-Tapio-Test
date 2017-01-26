define({ "api": [
  {
    "type": "patch",
    "url": "{accountId}/addFavouriteLandmark?landmarkid={landmarkid}",
    "title": "Add Favorite Landmark",
    "name": "Add_Favorite_Landmark",
    "group": "Account",
    "description": "<p>A route to patch one <code>favorite landmark</code> from the database, based on given <code>Id</code>.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "token",
            "description": "<p><code>token</code> is required</p>"
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "accountId",
            "description": "<p><code>accountId</code> is required to find one <code>Account</code></p>"
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "landmarkid",
            "description": "<p><code>landmarkid</code> is required to find one <code>Landmark</code></p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "Account",
            "description": "<p><code>Account</code> is shown.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example success response:",
          "content": "{\n   \"Succeed\": \"Landmark succesfully added by your favourites\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "No_token",
            "description": "<p>No <code>token</code> provided. <code>token</code> is required.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "No_accountId",
            "description": "<p>No <code>accountId</code> provided. <code>accountId</code> is required.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Wrong_token",
            "description": "<p>Failed to authenticate <code>token</code>.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Not_found",
            "description": "<p>Statuscode <code>404</code> and message &quot;<code>no landmark found</code>&quot; are returned.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "C:/Users/averr/Documents/01 - Antoon/3NMCT/CrossPlatformApps/Project/BackendProject/Back-end-Tapio-Test/Routes/accountRoutes.js",
    "groupTitle": "Account"
  },
  {
    "type": "get",
    "url": "{accountId}",
    "title": "get account by ID",
    "name": "Get_account_by_ID",
    "group": "Account",
    "description": "<p>A route to get one <code>Account</code> from the database, based on given <code>Id</code>.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "token",
            "description": "<p><code>token</code> is required</p>"
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "accountId",
            "description": "<p><code>accountId</code> is required to find one <code>Account</code></p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "Account",
            "description": "<p><code>Account</code> is shown.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example success response:",
          "content": "{\n   \"profile\": [\n       {\n           \"_id\": \"5852e9262c59172e3c7ca7b0\",\n           \"email\": \"averroken100@gmail.com\",\n           \"image\": \"Dit is dummy Shit\",\n           \"experience\": 0,\n           \"level\": 1,\n           \"gameCash\": 0,\n           \"socialUsername\": \"null\",\n           \"username\": \"user\"\n       }\n   ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "No_token",
            "description": "<p>No <code>token</code> provided. <code>token</code> is required.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "No_accountId",
            "description": "<p>No <code>accountId</code> provided. <code>accountId</code> is required.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Wrong_token",
            "description": "<p>Failed to authenticate <code>token</code>.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Not_found",
            "description": "<p>Statuscode <code>404</code> and message &quot;<code>no landmark found</code>&quot; are returned.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "C:/Users/averr/Documents/01 - Antoon/3NMCT/CrossPlatformApps/Project/BackendProject/Back-end-Tapio-Test/Routes/accountRoutes.js",
    "groupTitle": "Account"
  },
  {
    "type": "patch",
    "url": "{accountId}",
    "title": "Patch account by ID",
    "name": "Patch_account_by_ID",
    "group": "Account",
    "description": "<p>A route to get one <code>Account</code> from the database, based on given <code>Id</code>.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "token",
            "description": "<p><code>token</code> is required</p>"
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "accountId",
            "description": "<p><code>accountId</code> is required to find one <code>Account</code></p>"
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "email",
            "description": "<p><code>email</code> is optional to change the <code>Account</code></p>"
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "image",
            "description": "<p><code>image</code> is optional to change the <code>Account</code></p>"
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "experience",
            "description": "<p><code>experience</code> is optional to change the <code>Account</code></p>"
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "level",
            "description": "<p><code>level</code> is optional to change the <code>Account</code></p>"
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "gameCash",
            "description": "<p><code>gameCash</code> is optional to change the <code>Account</code></p>"
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "socialUsername",
            "description": "<p><code>socialUsername</code> is optional to change the <code>Account</code></p>"
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "username",
            "description": "<p><code>username</code> is optional to change the <code>Account</code></p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "Account",
            "description": "<p><code>Account</code> is shown.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example success response:",
          "content": "{\n   \"Succeed\": \"Account succesfully updated by ID\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "No_token",
            "description": "<p>No <code>token</code> provided. <code>token</code> is required.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Wrong_token",
            "description": "<p>Failed to authenticate <code>token</code>.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "No_accountId",
            "description": "<p>No <code>accountId</code> provided. <code>accountId</code> is required.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Not_found",
            "description": "<p>Statuscode <code>404</code> and message &quot;<code>no landmark found</code>&quot; are returned.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "C:/Users/averr/Documents/01 - Antoon/3NMCT/CrossPlatformApps/Project/BackendProject/Back-end-Tapio-Test/Routes/accountRoutes.js",
    "groupTitle": "Account"
  },
  {
    "type": "patch",
    "url": "{accountId}/removeFavouriteLandmark?landmarkid={landmarkid}",
    "title": "Remove Favorite Landmark",
    "name": "Remove_Favorite_Landmark",
    "group": "Account",
    "description": "<p>A route to patch one <code>favorite landmark</code> from the database, based on given <code>Id</code>.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "token",
            "description": "<p><code>token</code> is required</p>"
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "accountId",
            "description": "<p><code>accountId</code> is required to find one <code>Account</code></p>"
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "landmarkid",
            "description": "<p><code>landmarkid</code> is required to find one <code>Landmark</code></p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "Account",
            "description": "<p><code>Account</code> is shown.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example success response:",
          "content": "{\n   \"Succeed\": \"Landmark succesfully removed by your favourites\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "No_token",
            "description": "<p>No <code>token</code> provided. <code>token</code> is required.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "No_accountId",
            "description": "<p>No <code>accountId</code> provided. <code>accountId</code> is required.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Wrong_token",
            "description": "<p>Failed to authenticate <code>token</code>.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Not_found",
            "description": "<p>Statuscode <code>404</code> and message &quot;<code>no landmark found</code>&quot; are returned.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "C:/Users/averr/Documents/01 - Antoon/3NMCT/CrossPlatformApps/Project/BackendProject/Back-end-Tapio-Test/Routes/accountRoutes.js",
    "groupTitle": "Account"
  },
  {
    "type": "get",
    "url": "authenticate",
    "title": "Authenticate",
    "name": "Authenticate",
    "group": "Default",
    "description": "<p>Route to generate a <code>token</code> for the logged in user.</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "redirect",
            "description": "<p>The user is redirected to the index ('/') page, where it shows the new <code>token</code></p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "C:/Users/averr/Documents/01 - Antoon/3NMCT/CrossPlatformApps/Project/BackendProject/Back-end-Tapio-Test/Routes/rootRoutes.js",
    "groupTitle": "Default"
  },
  {
    "type": "get",
    "url": "login",
    "title": "Login (get)",
    "name": "Login",
    "group": "Default",
    "description": "<p>Route to render login page (only on web).</p>",
    "version": "0.0.0",
    "filename": "C:/Users/averr/Documents/01 - Antoon/3NMCT/CrossPlatformApps/Project/BackendProject/Back-end-Tapio-Test/Routes/rootRoutes.js",
    "groupTitle": "Default"
  },
  {
    "type": "post",
    "url": "login",
    "title": "Login",
    "name": "Login__post_",
    "group": "Default",
    "description": "<p>Route to login users (only on web).</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "redirect",
            "description": "<p>The user is redirected to the index ('/') page, where the user can see his <code>token</code></p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "C:/Users/averr/Documents/01 - Antoon/3NMCT/CrossPlatformApps/Project/BackendProject/Back-end-Tapio-Test/Routes/rootRoutes.js",
    "groupTitle": "Default"
  },
  {
    "type": "get",
    "url": "logout",
    "title": "Logout",
    "name": "Logout",
    "group": "Default",
    "description": "<p>Route to render logout page (only on web).</p>",
    "version": "0.0.0",
    "filename": "C:/Users/averr/Documents/01 - Antoon/3NMCT/CrossPlatformApps/Project/BackendProject/Back-end-Tapio-Test/Routes/rootRoutes.js",
    "groupTitle": "Default"
  },
  {
    "type": "post",
    "url": "register",
    "title": "Register",
    "name": "Register",
    "group": "Default",
    "description": "<p>Route to register users (both on web and android).</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "username",
            "description": "<p>The <code>name</code> the user wants to use</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>The <code>email</code> the user wants to use</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>The <code>password</code> the user wants to use</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "redirect",
            "description": "<p>The user is redirected to the index ('/') page</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "username_taken",
            "description": "<p>The user is redirected to the register ('/') page, and gets a message that says the username is already taken</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "C:/Users/averr/Documents/01 - Antoon/3NMCT/CrossPlatformApps/Project/BackendProject/Back-end-Tapio-Test/Routes/rootRoutes.js",
    "groupTitle": "Default"
  },
  {
    "type": "post",
    "url": "auth/facebook/token",
    "title": "Register with Facebook Token",
    "name": "Register_facebook_token",
    "group": "Default",
    "description": "<p>Route to register users (both on web and android).</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "token",
            "description": "<p>The <code>token</code> that Facebook provides (Android SDK)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "status_code",
            "description": "<p>returns 200 status code + <code>token</code> for user verification</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "status_code",
            "description": "<p>returns 400 status code</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "C:/Users/averr/Documents/01 - Antoon/3NMCT/CrossPlatformApps/Project/BackendProject/Back-end-Tapio-Test/Routes/passportStrategies.js",
    "groupTitle": "Default"
  },
  {
    "type": "patch",
    "url": "{landmarkId}/deletelike",
    "title": "Dislike a landmark",
    "name": "Dislike_landmark__short_",
    "group": "Landmark",
    "description": "<p>A route to dislike a <code>Landmarks</code> in the database, with limited information.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "token",
            "description": "<p><code>token</code> is required</p>"
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "landmarkId",
            "description": "<p><code>landmarkId</code> is required</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "landmark_collection",
            "description": "<p>The <code>Landmarks</code> is now liked.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example success response:",
          "content": "{\n   \"Likes\": 10\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "No_token",
            "description": "<p>No <code>token</code> provided. <code>token</code> is required.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "No_landmarkId",
            "description": "<p>No <code>landmarkId</code> provided. <code>landmarkId</code> is required.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Wrong_token",
            "description": "<p>Failed to authenticate <code>token</code>.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "db_error",
            "description": "<p>Statuscode <code>500</code> and <code>error</code> are returned.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "C:/Users/averr/Documents/01 - Antoon/3NMCT/CrossPlatformApps/Project/BackendProject/Back-end-Tapio-Test/Routes/landmarkRoutes.js",
    "groupTitle": "Landmark"
  },
  {
    "type": "get",
    "url": "api/landmarks/",
    "title": "Get all landmarks",
    "name": "Get_all_landmarks",
    "group": "Landmark",
    "description": "<p>A route to get all the <code>Landmarks</code> in the database.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "token",
            "description": "<p><code>token</code> is required</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "landmark_collection",
            "description": "<p>All the <code>Landmarks</code> are shown</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example success response:",
          "content": "{\n\"landmarks\": [\n    {\n      \"_id\": \"5838564ede3e773f7d8bf538\",\n      \"Name\": \"De eerste landmark is geboren\",\n      \"Description\": \"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam iaculis feugiat lectus, nec feugiat neque scelerisque placerat. Aenean in diam vitae metus auctor tincidunt. Nullam posuere blandit felis, in rhoncus nulla pretium id. Fusce dapibus tellus nec ligula convallis rutrum. Quisque id elit commodo, varius nunc et, imperdiet velit. Nulla vel sapien ut odio pretium dictum. Curabitur a vehicula erat. Fusce leo neque, tincidunt at mattis sodales, malesuada in risus. Donec condimentum faucibus dui, nec fringilla nisl fringilla sed. Praesent cursus elit tempus tortor eleifend tristique. Duis sit amet arcu a turpis tincidunt varius. In semper, justo hendrerit dignissim pulvinar, mi lacus pretium leo, sit amet placerat nulla ligula nec metus. Aenean a dolor non mauris venenatis malesuada. Mauris sit amet risus felis. Nulla a odio interdum,cursus velit ut,fermentum nunc.Nam quis eleifend turpis.Mauris ultrices mi eu odio congue volutpat et in lacus.Fusce vel suscipit dolor,vehicula vestibulum lacus.Cras tempor hendrerit arcu,et efficitur felis placerat eu.Maecenas eget ultrices odio,sed interdum diam.Vivamus ligula purus,pharetra ac tincidunt non,accumsan at mauris.Vestibulum erat ante,condimentum ac dolor volutpat,tempus semper risus.Aliquam libero magna,aliquet a tempor sed,convallis vitae magna.Vestibulum velit urna,maximus et ex at,pulvinar venenatis nulla.Vestibulum viverra elementum nibh,et ultrices orci bibendum vel.Donec et tempor diam.Phasellus vulputate eget sapien vitae hendrerit.Sed posuere tincidunt mauris non ullamcorper.Nullam posuere felis rhoncus eros dapibus vehicula.Nunc imperdiet posuere lorem,sed vulputate massa convallis egetSed suscipit gravida leo ut imperdiet.Duis sed auctor ante,dignissim facilisis dui.Ut eget tortor vestibulum,pellentesque ante rutrum,elementum libero.Nulla ullamcorper sapien at lacus interdum mattis.Integer viverra nulla at libero elementum,et pharetra odio viverra.Phasellus a urna vitae lorem semper placerat.Mauris luctus blandit odio,scelerisque sollicitudin lorem viverra a.Maecenas ac nisl ac orci aliquam pulvinar a quis lectus.Praesent convallis lorem id ligula luctus pretium.Sed vehicula velit tortor,at facilisis nisi bibendum nec.Ut ac blandit enimMaecenas non lorem at tellus porttitor tempor.Morbi commodo arcu lorem,vitae ultricies arcu bibendum vel.Pellentesque feugiat elit in fringilla tristique.Ut maximus gravida fermentum.Curabitur porta ipsum nec mattis blandit.Vivamus molestie augue auctor massa aliquam volutpat.Aenean magna tortor,rutrum et diam quis,bibendum laoreet magna.In dignissim vitae ipsum eu sodales.Maecenas imperdiet tristique nibh nec vestibulum.Curabitur tincidunt consequat est,ac vehicula dolor pellentesque in .Vestibulum sapien dolor,fringilla sit amet varius in ,sollicitudin id enimAenean est sapien,iaculis et nunc dapibus,ullamcorper tincidunt est.Maecenas efficitur sagittis elit,quis dapibus erat vestibulum in .Etiam luctus nisi non purus viverra,at dictum ex hendrerit.Phasellus sollicitudin cursus vestibulum.Donec lacus ante,tristique vitae sapien sed,mattis dapibus lectus.Aliquam risus mi,ultrices ut lobortis a,cursus quis est.Etiam mollis rutrum purus.Aliquam mattis euismod turpis et convallis.Aenean in maximus enim,vel elementum dolor.\",\n      \"Type\": \"Natuur\",\n      \"Visits\": 28,\n      \"Likes\": 35,\n      \"Lat\": 52,\n      \"Long\": 54,\n      \"ImageURLBig\": \"http://static.tumblr.com/65162db388baaea011ad9b04912c0f58/ivguq93/wsGnlmsac/tumblr_static_91nsinx32eosw4kk8cg08s8o0_2048_v2.jpg\"\n    },\n    {\n      \"_id\": \"583856c0de3e773f7d8bf53a\",\n      \"Name\": \"De tweede landmark is ook een feit\",\n      \"Description\": \"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam iaculis feugiat lectus, nec feugiat neque scelerisque placerat. Aenean in diam vitae metus auctor tincidunt. Nullam posuere blandit felis, in rhoncus nulla pretium id. Fusce dapibus tellus nec ligula convallis rutrum. Quisque id elit commodo, varius nunc et, imperdiet velit. Nulla vel sapien ut odio pretium dictum. Curabitur a vehicula erat. Fusce leo neque, tincidunt at mattis sodales, malesuada in risus. Donec condimentum faucibus dui, nec fringilla nisl fringilla sed. Praesent cursus elit tempus tortor eleifend tristique. Duis sit amet arcu a turpis tincidunt varius. In semper, justo hendrerit dignissim pulvinar, mi lacus pretium leo, sit amet placerat nulla ligula nec metus. Aenean a dolor non mauris venenatis malesuada. Mauris sit amet risus felis. Nulla a odio interdum,cursus velit ut,fermentum nunc.Nam quis eleifend turpis.Mauris ultrices mi eu odio congue volutpat et in lacus.Fusce vel suscipit dolor,vehicula vestibulum lacus.Cras tempor hendrerit arcu,et efficitur felis placerat eu.Maecenas eget ultrices odio,sed interdum diam.Vivamus ligula purus,pharetra ac tincidunt non,accumsan at mauris.Vestibulum erat ante,condimentum ac dolor volutpat,tempus semper risus.Aliquam libero magna,aliquet a tempor sed,convallis vitae magna.Vestibulum velit urna,maximus et ex at,pulvinar venenatis nulla.Vestibulum viverra elementum nibh,et ultrices orci bibendum vel.Donec et tempor diam.Phasellus vulputate eget sapien vitae hendrerit.Sed posuere tincidunt mauris non ullamcorper.Nullam posuere felis rhoncus eros dapibus vehicula.Nunc imperdiet posuere lorem,sed vulputate massa convallis egetSed suscipit gravida leo ut imperdiet.Duis sed auctor ante,dignissim facilisis dui.Ut eget tortor vestibulum,pellentesque ante rutrum,elementum libero.Nulla ullamcorper sapien at lacus interdum mattis.Integer viverra nulla at libero elementum,et pharetra odio viverra.Phasellus a urna vitae lorem semper placerat.Mauris luctus blandit odio,scelerisque sollicitudin lorem viverra a.Maecenas ac nisl ac orci aliquam pulvinar a quis lectus.Praesent convallis lorem id ligula luctus pretium.Sed vehicula velit tortor,at facilisis nisi bibendum nec.Ut ac blandit enimMaecenas non lorem at tellus porttitor tempor.Morbi commodo arcu lorem,vitae ultricies arcu bibendum vel.Pellentesque feugiat elit in fringilla tristique.Ut maximus gravida fermentum.Curabitur porta ipsum nec mattis blandit.Vivamus molestie augue auctor massa aliquam volutpat.Aenean magna tortor,rutrum et diam quis,bibendum laoreet magna.In dignissim vitae ipsum eu sodales.Maecenas imperdiet tristique nibh nec vestibulum.Curabitur tincidunt consequat est,ac vehicula dolor pellentesque in .Vestibulum sapien dolor,fringilla sit amet varius in ,sollicitudin id enimAenean est sapien,iaculis et nunc dapibus,ullamcorper tincidunt est.Maecenas efficitur sagittis elit,quis dapibus erat vestibulum in .Etiam luctus nisi non purus viverra,at dictum ex hendrerit.Phasellus sollicitudin cursus vestibulum.Donec lacus ante,tristique vitae sapien sed,mattis dapibus lectus.Aliquam risus mi,ultrices ut lobortis a,cursus quis est.Etiam mollis rutrum purus.Aliquam mattis euismod turpis et convallis.Aenean in maximus enim,vel elementum dolor.\",\n      \"Type\": \"Natuur\",\n      \"Visits\": 25,\n      \"Likes\": 20,\n      \"Lat\": 52,\n      \"Long\": 54,\n      \"ImageURLBig\": \"https://s-media-cache-ak0.pinimg.com/564x/e0/42/c1/e042c17835ae71c25bbf2510d0b31bb5.jpg\"\n    },\n    {\n      \"_id\": \"583856d5de3e773f7d8bf53b\",\n      \"Name\": \"De derde landmark is er ook\",\n      \"Description\": \"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam iaculis feugiat lectus, nec feugiat neque scelerisque placerat. Aenean in diam vitae metus auctor tincidunt. Nullam posuere blandit felis, in rhoncus nulla pretium id. Fusce dapibus tellus nec ligula convallis rutrum. Quisque id elit commodo, varius nunc et, imperdiet velit. Nulla vel sapien ut odio pretium dictum. Curabitur a vehicula erat. Fusce leo neque, tincidunt at mattis sodales, malesuada in risus. Donec condimentum faucibus dui, nec fringilla nisl fringilla sed. Praesent cursus elit tempus tortor eleifend tristique. Duis sit amet arcu a turpis tincidunt varius. In semper, justo hendrerit dignissim pulvinar, mi lacus pretium leo, sit amet placerat nulla ligula nec metus. Aenean a dolor non mauris venenatis malesuada. Mauris sit amet risus felis. Nulla a odio interdum,cursus velit ut,fermentum nunc.Nam quis eleifend turpis.Mauris ultrices mi eu odio congue volutpat et in lacus.Fusce vel suscipit dolor,vehicula vestibulum lacus.Cras tempor hendrerit arcu,et efficitur felis placerat eu.Maecenas eget ultrices odio,sed interdum diam.Vivamus ligula purus,pharetra ac tincidunt non,accumsan at mauris.Vestibulum erat ante,condimentum ac dolor volutpat,tempus semper risus.Aliquam libero magna,aliquet a tempor sed,convallis vitae magna.Vestibulum velit urna,maximus et ex at,pulvinar venenatis nulla.Vestibulum viverra elementum nibh,et ultrices orci bibendum vel.Donec et tempor diam.Phasellus vulputate eget sapien vitae hendrerit.Sed posuere tincidunt mauris non ullamcorper.Nullam posuere felis rhoncus eros dapibus vehicula.Nunc imperdiet posuere lorem,sed vulputate massa convallis egetSed suscipit gravida leo ut imperdiet.Duis sed auctor ante,dignissim facilisis dui.Ut eget tortor vestibulum,pellentesque ante rutrum,elementum libero.Nulla ullamcorper sapien at lacus interdum mattis.Integer viverra nulla at libero elementum,et pharetra odio viverra.Phasellus a urna vitae lorem semper placerat.Mauris luctus blandit odio,scelerisque sollicitudin lorem viverra a.Maecenas ac nisl ac orci aliquam pulvinar a quis lectus.Praesent convallis lorem id ligula luctus pretium.Sed vehicula velit tortor,at facilisis nisi bibendum nec.Ut ac blandit enimMaecenas non lorem at tellus porttitor tempor.Morbi commodo arcu lorem,vitae ultricies arcu bibendum vel.Pellentesque feugiat elit in fringilla tristique.Ut maximus gravida fermentum.Curabitur porta ipsum nec mattis blandit.Vivamus molestie augue auctor massa aliquam volutpat.Aenean magna tortor,rutrum et diam quis,bibendum laoreet magna.In dignissim vitae ipsum eu sodales.Maecenas imperdiet tristique nibh nec vestibulum.Curabitur tincidunt consequat est,ac vehicula dolor pellentesque in .Vestibulum sapien dolor,fringilla sit amet varius in ,sollicitudin id enimAenean est sapien,iaculis et nunc dapibus,ullamcorper tincidunt est.Maecenas efficitur sagittis elit,quis dapibus erat vestibulum in .Etiam luctus nisi non purus viverra,at dictum ex hendrerit.Phasellus sollicitudin cursus vestibulum.Donec lacus ante,tristique vitae sapien sed,mattis dapibus lectus.Aliquam risus mi,ultrices ut lobortis a,cursus quis est.Etiam mollis rutrum purus.Aliquam mattis euismod turpis et convallis.Aenean in maximus enim,vel elementum dolor.\",\n      \"Type\": \"Natuur\",\n      \"Visits\": 28,\n      \"Likes\": 35,\n      \"Lat\": 52,\n      \"Long\": 54,\n      \"ImageURLBig\": \"https://secure.static.tumblr.com/24d4ebc658fa79d0f122a9d5612707a3/uhldxoo/wsGntmej1/tumblr_static_tumblr_static__640.jpg\"\n    }\n  ]\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "No_token",
            "description": "<p>No <code>token</code> provided. <code>token</code> is required.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Wrong_token",
            "description": "<p>Failed to authenticate <code>token</code>.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "db_error",
            "description": "<p>Statuscode <code>500</code> and <code>error</code> are returned.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "C:/Users/averr/Documents/01 - Antoon/3NMCT/CrossPlatformApps/Project/BackendProject/Back-end-Tapio-Test/Routes/landmarkRoutes.js",
    "groupTitle": "Landmark"
  },
  {
    "type": "get",
    "url": "api/landmarks/short",
    "title": "Get all landmarks (short)",
    "name": "Get_all_landmarks__short_",
    "group": "Landmark",
    "description": "<p>A route to get all the <code>Landmarks</code> in the database, with limited information.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "token",
            "description": "<p><code>token</code> is required</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "landmark_collection",
            "description": "<p>All the <code>Landmarks</code> are shown, with limited information (only id, lat and long are shown)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example success response:",
          "content": "{\n\"landmarks\": [\n    {\n      \"_id\": \"5838564ede3e773f7d8bf538\",\n      \"Lat\": 52,\n      \"Long\": 54,\n    },\n    {\n      \"_id\": \"583856c0de3e773f7d8bf53a\",\n      \"Lat\": 52,\n      \"Long\": 54,\n    },\n    {\n      \"_id\": \"583856d5de3e773f7d8bf53b\",\n      \"Lat\": 52,\n      \"Long\": 54,\n    }\n  ]\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "No_token",
            "description": "<p>No <code>token</code> provided. <code>token</code> is required.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Wrong_token",
            "description": "<p>Failed to authenticate <code>token</code>.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "db_error",
            "description": "<p>Statuscode <code>500</code> and <code>error</code> are returned.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "C:/Users/averr/Documents/01 - Antoon/3NMCT/CrossPlatformApps/Project/BackendProject/Back-end-Tapio-Test/Routes/landmarkRoutes.js",
    "groupTitle": "Landmark"
  },
  {
    "type": "get",
    "url": "api/landmarks/filterlocatie/",
    "title": "Get all landmarks by country",
    "name": "Get_all_landmarks_by_country",
    "group": "Landmark",
    "description": "<p>A route to get all the <code>Landmarks by country</code> in the database.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "token",
            "description": "<p><code>token</code> is required</p>"
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "Country",
            "description": "<p><code>Country</code> is required</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "landmark_collection",
            "description": "<p>All the <code>Landmarks by country</code> are shown</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example success response:",
          "content": "{\n  \"landmarks\": [\n    {\n      \"_id\": \"584c9bf7c860880004953fe3\",\n      \"Country\": \"Belgium\",\n      \"Description\": \"test\",\n      \"ImageURLBig\": \"https://media.mnn.com/assets/images/2015/03/forest-path-germany.jpg.653x0_q80_crop-smart.jpg\",\n      \"Lat\": 50,\n      \"Long\": 50,\n      \"Name\": \"test\",\n      \"Type\": \"test\",\n      \"__v\": 0\n    },\n    {\n      \"_id\": \"584c9c02c860880004953fe4\",\n      \"Country\": \"Belgium\",\n      \"Description\": \"test\",\n      \"ImageURLBig\": \"https://media.mnn.com/assets/images/2015/03/forest-path-germany.jpg.653x0_q80_crop-smart.jpg\",\n      \"Lat\": 50,\n      \"Long\": 50,\n      \"Name\": \"test2\",\n      \"Type\": \"test\",\n      \"__v\": 0\n    }\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "No_token",
            "description": "<p>No <code>token</code> provided. <code>token</code> is required.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "No_country",
            "description": "<p>No <code>country</code> provided. <code>country</code> is required.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Wrong_token",
            "description": "<p>Failed to authenticate <code>token</code>.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "db_error",
            "description": "<p>Statuscode <code>500</code> and <code>error</code> are returned.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "C:/Users/averr/Documents/01 - Antoon/3NMCT/CrossPlatformApps/Project/BackendProject/Back-end-Tapio-Test/Routes/landmarkRoutes.js",
    "groupTitle": "Landmark"
  },
  {
    "type": "get",
    "url": "api/landmarks/:landmarkId",
    "title": "Get landmark by Id",
    "name": "Get_landmark_by_Id",
    "group": "Landmark",
    "description": "<p>A route to get one <code>Landmark</code> from the database, based on given <code>Id</code>.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "token",
            "description": "<p><code>token</code> is required</p>"
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "id",
            "description": "<p><code>id</code> is required to find one <code>Landmark</code></p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "landmark",
            "description": "<p>One <code>Landmark</code> is shown.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example success response:",
          "content": "{\n\"landmarks\": [\n    {\n      \"_id\": \"583856d5de3e773f7d8bf53b\",\n      \"Name\": \"De derde landmark is er ook\",\n      \"Description\": \"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam iaculis feugiat lectus, nec feugiat neque scelerisque placerat. Aenean in diam vitae metus auctor tincidunt. Nullam posuere blandit felis, in rhoncus nulla pretium id. Fusce dapibus tellus nec ligula convallis rutrum. Quisque id elit commodo, varius nunc et, imperdiet velit. Nulla vel sapien ut odio pretium dictum. Curabitur a vehicula erat. Fusce leo neque, tincidunt at mattis sodales, malesuada in risus. Donec condimentum faucibus dui, nec fringilla nisl fringilla sed. Praesent cursus elit tempus tortor eleifend tristique. Duis sit amet arcu a turpis tincidunt varius. In semper, justo hendrerit dignissim pulvinar, mi lacus pretium leo, sit amet placerat nulla ligula nec metus. Aenean a dolor non mauris venenatis malesuada. Mauris sit amet risus felis. Nulla a odio interdum,cursus velit ut,fermentum nunc.Nam quis eleifend turpis.Mauris ultrices mi eu odio congue volutpat et in lacus.Fusce vel suscipit dolor,vehicula vestibulum lacus.Cras tempor hendrerit arcu,et efficitur felis placerat eu.Maecenas eget ultrices odio,sed interdum diam.Vivamus ligula purus,pharetra ac tincidunt non,accumsan at mauris.Vestibulum erat ante,condimentum ac dolor volutpat,tempus semper risus.Aliquam libero magna,aliquet a tempor sed,convallis vitae magna.Vestibulum velit urna,maximus et ex at,pulvinar venenatis nulla.Vestibulum viverra elementum nibh,et ultrices orci bibendum vel.Donec et tempor diam.Phasellus vulputate eget sapien vitae hendrerit.Sed posuere tincidunt mauris non ullamcorper.Nullam posuere felis rhoncus eros dapibus vehicula.Nunc imperdiet posuere lorem,sed vulputate massa convallis egetSed suscipit gravida leo ut imperdiet.Duis sed auctor ante,dignissim facilisis dui.Ut eget tortor vestibulum,pellentesque ante rutrum,elementum libero.Nulla ullamcorper sapien at lacus interdum mattis.Integer viverra nulla at libero elementum,et pharetra odio viverra.Phasellus a urna vitae lorem semper placerat.Mauris luctus blandit odio,scelerisque sollicitudin lorem viverra a.Maecenas ac nisl ac orci aliquam pulvinar a quis lectus.Praesent convallis lorem id ligula luctus pretium.Sed vehicula velit tortor,at facilisis nisi bibendum nec.Ut ac blandit enimMaecenas non lorem at tellus porttitor tempor.Morbi commodo arcu lorem,vitae ultricies arcu bibendum vel.Pellentesque feugiat elit in fringilla tristique.Ut maximus gravida fermentum.Curabitur porta ipsum nec mattis blandit.Vivamus molestie augue auctor massa aliquam volutpat.Aenean magna tortor,rutrum et diam quis,bibendum laoreet magna.In dignissim vitae ipsum eu sodales.Maecenas imperdiet tristique nibh nec vestibulum.Curabitur tincidunt consequat est,ac vehicula dolor pellentesque in .Vestibulum sapien dolor,fringilla sit amet varius in ,sollicitudin id enimAenean est sapien,iaculis et nunc dapibus,ullamcorper tincidunt est.Maecenas efficitur sagittis elit,quis dapibus erat vestibulum in .Etiam luctus nisi non purus viverra,at dictum ex hendrerit.Phasellus sollicitudin cursus vestibulum.Donec lacus ante,tristique vitae sapien sed,mattis dapibus lectus.Aliquam risus mi,ultrices ut lobortis a,cursus quis est.Etiam mollis rutrum purus.Aliquam mattis euismod turpis et convallis.Aenean in maximus enim,vel elementum dolor.\",\n      \"Type\": \"Natuur\",\n      \"Visits\": 28,\n      \"Likes\": 35,\n      \"Lat\": 52,\n      \"Long\": 54,\n      \"ImageURLBig\": \"https://secure.static.tumblr.com/24d4ebc658fa79d0f122a9d5612707a3/uhldxoo/wsGntmej1/tumblr_static_tumblr_static__640.jpg\"\n    }\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "No_token",
            "description": "<p>No <code>token</code> provided. <code>token</code> is required.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Wrong_token",
            "description": "<p>Failed to authenticate <code>token</code>.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Not_found",
            "description": "<p>Statuscode <code>404</code> and message &quot;<code>no landmark found</code>&quot; are returned.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "C:/Users/averr/Documents/01 - Antoon/3NMCT/CrossPlatformApps/Project/BackendProject/Back-end-Tapio-Test/Routes/landmarkRoutes.js",
    "groupTitle": "Landmark"
  },
  {
    "type": "post",
    "url": "api/landmarks/",
    "title": "Insert a Landmark",
    "name": "Insert_a_Landmark",
    "group": "Landmark",
    "description": "<p>A route insert a <code>Landmarks</code>.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "Name",
            "description": "<p>The name of the new <code>Landmark</code>.</p>"
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "Description",
            "description": "<p>The description of the new <code>Landmark</code>.</p>"
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "Type",
            "description": "<p>The type of the new <code>Landmark</code>.</p>"
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "Lat",
            "description": "<p>The latitude of the new <code>Landmark</code>.</p>"
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "Long",
            "description": "<p>The longitude of the new <code>Landmark</code>.</p>"
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "ImageURLBig",
            "description": "<p>The image of the new <code>Landmark</code>.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "status_code",
            "description": "<p><code>201</code></p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "landmark_collection",
            "description": "<p>All the <code>Landmarks</code> are shown</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "C:/Users/averr/Documents/01 - Antoon/3NMCT/CrossPlatformApps/Project/BackendProject/Back-end-Tapio-Test/Routes/landmarkRoutes.js",
    "groupTitle": "Landmark"
  },
  {
    "type": "patch",
    "url": "{landmarkId}/addlike",
    "title": "Like a landmark",
    "name": "Like_landmark__short_",
    "group": "Landmark",
    "description": "<p>A route to like a <code>Landmarks</code> in the database, with limited information.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "token",
            "description": "<p><code>token</code> is required</p>"
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "landmarkId",
            "description": "<p><code>landmarkId</code> is required</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "landmark_collection",
            "description": "<p>The <code>Landmarks</code> is now liked.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example success response:",
          "content": "{\n   \"Likes\": 45\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "No_token",
            "description": "<p>No <code>token</code> provided. <code>token</code> is required.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "No_landmarkId",
            "description": "<p>No <code>landmarkId</code> provided. <code>landmarkId</code> is required.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Wrong_token",
            "description": "<p>Failed to authenticate <code>token</code>.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "db_error",
            "description": "<p>Statuscode <code>500</code> and <code>error</code> are returned.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "C:/Users/averr/Documents/01 - Antoon/3NMCT/CrossPlatformApps/Project/BackendProject/Back-end-Tapio-Test/Routes/landmarkRoutes.js",
    "groupTitle": "Landmark"
  },
  {
    "type": "get",
    "url": "changePassword",
    "title": "Change Password (get)",
    "name": "changePassword",
    "group": "Password",
    "description": "<p>Route to render change password page (only on web).</p>",
    "version": "0.0.0",
    "filename": "C:/Users/averr/Documents/01 - Antoon/3NMCT/CrossPlatformApps/Project/BackendProject/Back-end-Tapio-Test/Routes/rootRoutes.js",
    "groupTitle": "Password"
  },
  {
    "type": "post",
    "url": "changePassword",
    "title": "Change Password",
    "name": "changePassword_post",
    "group": "Password",
    "description": "<p>Route to handle the change password post (only on web).</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>The <code>email</code> that the user used to register his account</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "message",
            "description": "<p>A message containing <code>&quot;An email has been sent to your address.&quot;</code> will be shown.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Email_not_found",
            "description": "<p>No account with that <code>email</code> address exists.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "C:/Users/averr/Documents/01 - Antoon/3NMCT/CrossPlatformApps/Project/BackendProject/Back-end-Tapio-Test/Routes/rootRoutes.js",
    "groupTitle": "Password"
  },
  {
    "type": "post",
    "url": "refreshtoken/:refreshToken",
    "title": "Refresh Token",
    "name": "refreshToken",
    "group": "Password",
    "description": "<p>Route to handle the password reset post (only on web).</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "token",
            "description": "<p>The <code>token</code> that the user received in the email</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "C:/Users/averr/Documents/01 - Antoon/3NMCT/CrossPlatformApps/Project/BackendProject/Back-end-Tapio-Test/Routes/rootRoutes.js",
    "groupTitle": "Password"
  },
  {
    "type": "post",
    "url": "reset/:token",
    "title": "Reset Password",
    "name": "resetpassword",
    "group": "Password",
    "description": "<p>Route to handle the password reset post (only on web).</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "token",
            "description": "<p>The <code>token</code> that the user received in the email</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "message",
            "description": "<p>The following message will be shown: <code>&quot;Success! Your password has been changed.&quot;</code></p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "invalid_token",
            "description": "<p>The following message will be shown: <code>&quot;Password reset token is invalid or has expired&quot;</code></p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "C:/Users/averr/Documents/01 - Antoon/3NMCT/CrossPlatformApps/Project/BackendProject/Back-end-Tapio-Test/Routes/rootRoutes.js",
    "groupTitle": "Password"
  },
  {
    "type": "get",
    "url": "reset/:token",
    "title": "Reset Password (get)",
    "name": "resetpassword_get",
    "group": "Password",
    "description": "<p>Route to render the password reset page (only on web) if the token is correct.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "token",
            "description": "<p>The <code>token</code> that the user recieved in the email</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "invalid_token",
            "description": "<p>The following message will be shown: <code>&quot;Password reset token is invalid or has expired&quot;</code></p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "C:/Users/averr/Documents/01 - Antoon/3NMCT/CrossPlatformApps/Project/BackendProject/Back-end-Tapio-Test/Routes/rootRoutes.js",
    "groupTitle": "Password"
  },
  {
    "type": "get",
    "url": "api/tokenTest",
    "title": "TokenTest",
    "name": "TestToken",
    "group": "Token",
    "description": "<p>A route to simply test if the given token is correct.</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "message",
            "description": "<p>Congratulations your token works</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "No_token",
            "description": "<p>No <code>token</code> provided. <code>token</code> is required</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Wrong_token",
            "description": "<p>Failed to authenticate <code>token</code>.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "C:/Users/averr/Documents/01 - Antoon/3NMCT/CrossPlatformApps/Project/BackendProject/Back-end-Tapio-Test/Routes/testRoutes.js",
    "groupTitle": "Token"
  },
  {
    "type": "get",
    "url": "api/android/tokenTest",
    "title": "TokenTest (Android)",
    "name": "TestToken__Android_",
    "group": "Token",
    "description": "<p>A route to simply test if the given token is correct.</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "message",
            "description": "<p>Congratulations your token works</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example success response:",
          "content": "{\n    message: 'Congratulations, your token works'\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "No_token",
            "description": "<p>No <code>token</code> provided. <code>token</code> is required</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Wrong_token",
            "description": "<p>Failed to authenticate <code>token</code>.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "C:/Users/averr/Documents/01 - Antoon/3NMCT/CrossPlatformApps/Project/BackendProject/Back-end-Tapio-Test/Routes/testRoutes.js",
    "groupTitle": "Token"
  }
] });
