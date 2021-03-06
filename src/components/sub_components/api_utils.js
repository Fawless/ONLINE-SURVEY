var jwt = require("jsonwebtoken");

function Check_Username(user_data, registration_type, registration_type_name) {
  // Check if Username is not already taken
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    // handle request response
    if (this.readyState === 4 && this.status === 200) {
      // response format is a rowdatapacket so it was needed to do like that.
      if (this.response === "0")
        // next step check if provided username isn't already in our database
        Register_user(user_data, registration_type, registration_type_name);
      else {
        // if already exist
        user_data.username = user_data.username + "1";
        Check_Username(user_data, registration_type, registration_type_name); // retry with the new username
      }
    }
  };
  // Send a post request
  var jwt_token = jwt.sign(
    { username: user_data.username },
    process.env.REACT_APP_SECRET_KEY
  );
  xhttp.open(
    "POST",
    process.env.REACT_APP_API_URL +
      "/Check_Username?jwt_token=" +
      jwt_token +
      "",
    true
  );
  xhttp.withCredentials = true;
  xhttp.send();
}

function Register_user(user_data, registration_type, registration_type_name) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    // handle request response
    if (this.readyState === 4 && this.status === 200) {
      if (this.responseText === "true") {
        document.location.href = "/form";
      } else {
        alert(
          "Erreur lors de l'inscription avec " + registration_type_name + "."
        );
      }
    }
  };
  // Send a post request

  var jwt_token = jwt.sign(
    {
      username: user_data.username,
      lname: user_data.lname,
      fname: user_data.fname,
      email: user_data.email,
      registration_type: registration_type,
    },
    process.env.REACT_APP_SECRET_KEY
  );
  xhttp.open(
    "POST",
    process.env.REACT_APP_API_URL + "/sign_up?jwt_token=" + jwt_token + "",
    true
  );
  xhttp.withCredentials = true;
  xhttp.send();
}

exports.Login = function (
  user_data,
  registration_type,
  registration_type_name
) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    // handle request response
    if (this.readyState === 4 && this.status === 200) {
      if (this.responseText !== "false") {
        // next step check if provided email isn't already in our database
        if (this.response === "0") {
          // if not check if the username we want to give isn't already taken
          Check_Username(user_data, registration_type, registration_type_name);
        } else {
          xhttp.onreadystatechange = function () {
            // handle request response
            if (this.readyState === 4 && this.status === 200) {
              if (this.response === registration_type) {
                var xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function () {
                  // handle request response
                  if (this.readyState === 4 && this.status === 200) {
                    if (this.responseText !== "false") {
                      document.location.href = "/form";
                    } else {
                      alert(
                        "Erreur lors de la connexion avec " +
                          registration_type_name +
                          "."
                      );
                    }
                  }
                };
                // Send a post request
                var jwt = require("jsonwebtoken");
                var jwt_token = jwt.sign(
                  {
                    username: user_data.username,
                    password: user_data.password,
                    registration_type: registration_type,
                  },
                  process.env.REACT_APP_SECRET_KEY
                );
                xhttp.open(
                  "POST",
                  process.env.REACT_APP_API_URL +
                    "/sign_in?jwt_token=" +
                    jwt_token +
                    "",
                  true
                );
                xhttp.withCredentials = true;
                xhttp.send();
              } else {
                alert(
                  "L'adresse email li??e ?? ce compte " +
                    registration_type_name +
                    " est d??j?? enregistr??e."
                );
              }
            }
          };
          var jwt_token = jwt.sign(
            { email: user_data.email },
            process.env.REACT_APP_SECRET_KEY
          );
          xhttp.open(
            "POST",
            process.env.REACT_APP_API_URL +
              "/Check_RegistrationType?jwt_token=" +
              jwt_token +
              "",
            true
          );
          xhttp.withCredentials = true;
          xhttp.send();
        }
      } else {
        alert("Mauvais nom d'utilisateur / mot de passe.");
      }
    }
  };
  // Send a post request

  var jwt_token = jwt.sign(
    { email: user_data.email },
    process.env.REACT_APP_SECRET_KEY
  );
  xhttp.open(
    "POST",
    process.env.REACT_APP_API_URL + "/Check_Email?jwt_token=" + jwt_token + "",
    true
  );
  xhttp.withCredentials = true;
  xhttp.send();
};
