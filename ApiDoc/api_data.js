define({ "api": [
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
