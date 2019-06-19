$(document).ready( function() {
	$("#signin-form").on('submit', function(e) {
		e.preventDefault();

		$(".juni_spin").show();

		var email     = $("#ec_email").val();
		var password  = $("#ec_password").val();

    
    if (email == "") {
      $("#juni_err_email").html('email is required');
      $("#ec_email").addClass('err_signup_input');
      $(".juni_spin").hide();
      return false;
    }else if(password == "") {
      $("#juni_err_password").html('password cannot be empty');
      $("#ec_password").addClass('err_signup_input');
      $(".juni_spin").hide();
      return false;
    }else{
        $("#ec_email").removeClass('err_signup_input');
    $("#ec_password").removeClass('err_signup_input');
    $("#juni_err_email").html('');
    $("#juni_err_password").html('');

     var settings = {
       "url": "https://polledapp.herokuapp.com/api/login",
          "method": "POST",
          "timeout": 0,
          "data": {
            "email": email,
            "password": password,
          }
        };
        $.ajax(settings).done(function (response) {
          if (response.data.success) {
              $(".juni_spin").hide();
              $("#reg_success").html(response.success);
              $('#signin-form')[0].reset();
              
              const token = response.data.token;
              const user = response.data.user;

              localStorage.setItem('token', token);

              localStorage.setItem('user_firstname', user.first_name);
              localStorage.setItem('user_lastname', user.last_name);
              localStorage.setItem('user_lastname', user.last_name);
              localStorage.setItem('user_email', user.email);
              localStorage.setItem('user_image', user.image);
              localStorage.setItem('user_dob', user.dob);
              localStorage.setItem('user_phone', user.phone);
              localStorage.setItem('bio', user.bio);
              location.replace("../Users/user-profile-lite.html"); 

          }         
        }).fail( function(err) {
          if (err) {
            $(".juni_spin").hide();
            if (err.status === 422) {
              if (err.responseJSON.email) {
                $("#juni_err_email").html(err.responseJSON.email[0]);
                $("#ec_email").addClass('err_signup_input');
              }
              if(err.responseJSON.password) {
                $("#juni_err_password").html(err.responseJSON.password[0]);
                $("#ec_password").addClass('err_signup_input');
              }
               if(err.responseJSON.message) {
                $("#juni_err_email").html(err.responseJSON.message);
                $("#ec_email").addClass('err_signup_input');
              }
            }

            if (err.status === 401) {

              if (err.responseJSON.data.message == "Not confirmed yet") {

                 location.replace("../Users/confirmation.html?success=polled_member"); 
              }
            }
            if (err.status === 404) {
            $("#juni_err_email").html("User Not Found");
                $("#ec_email").addClass('err_signup_input');
            }
          }
          
        });
    }

	
	});
});



