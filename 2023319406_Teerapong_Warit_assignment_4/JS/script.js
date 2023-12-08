/*  code reference : 
            - https://www.w3schools.com/jquery/jquery_fade.asp
            - https://www.w3schools.com/jquery/jquery_css_classes.asp
*/

$(document).ready(function(){

  // hide container of signup first as default 
  //(container login show first when page loaded)
  $(".container.signup").hide()
  $(".container.signup_success").hide()
  $(".container.login_success").hide()

  // fade in and out between login and signup
  $("#login_btn").click(function(){
      $(".login_btn").addClass("active");     // show active login button
      $(".signup_btn").removeClass("active"); // deactive signup button
      
      $(".container.login").fadeIn("slow");   // fade in login content
      $(".container.signup").hide();          // hide signup content
      
      $(".container.signup_success").hide()
      $(".container.login_success").hide()
    });

  $("#signup_btn").click(function(){
      $(".login_btn").removeClass("active");  // deactive login button
      $(".signup_btn").addClass("active");    // show active signup button

      $(".container.login").hide();           // hide login content
      $(".container.signup").fadeIn("slow");  // fade in signup content

      $(".container.signup_success").hide()
      $(".container.login_success").hide()
    });

  // validate first name
  $('#first_name').on('input', function() {
    var name = $(this).val();
    var condition = checkNameCondition(name);
    console.log("First name : " + condition)
    if (condition !=="valid"){
      $(this).css("border","2px solid red");
    } else{
      $(this).css("border","2px solid white");
    }
  });

  // validate last name
  $('#last_name').on('input', function() {
    var name = $(this).val();
    var condition = checkNameCondition(name);
    console.log("Last name : " + condition)
    if (condition !=="valid"){
      $(this).css("border","2px solid red");
    } else{
      $(this).css("border","2px solid white");
    }
  });

  // validate email
  $('#e-mail').on('input', function() {
    var email = $(this).val();
    var condition = checkEmailCondition(email);
    console.log("Email : " + condition)
    if (condition !=="valid"){
      $(this).css("border","2px solid red");
    } else{
      $(this).css("border","2px solid white");
    }
  });

  // validate password
  $('#pswd').on('input', function() {
    var pwd = $(this).val();
    var condition = checkPasswordStrength(pwd);
    console.log("Password : " + condition)
    if (condition !=="valid"){
      $(this).css("border","2px solid red");
    } else{
      $(this).css("border","2px solid white");
    }
  });

  // validate confirm-password
  $('#confirm_pwd').on('input', function() {
    var confirm_pwd = $(this).val();
    var pwd = $('#pswd').val();
    var condition = checkConfirmPassword(confirm_pwd,pwd)
    console.log("Confirm Password : " + condition)
    if (condition !=="valid"){
      $(this).css("border","2px solid red");
    } else{
      $(this).css("border","2px solid white");
    }
  });

  // check condition functions
  function checkNameCondition(name) {
    if (name=='' || name === null){
      return "Please enter your first name!"
    } else if(hasNumber(name)){
      return "First name cannot contain numbers!"
    } else{
      return "valid"
    }
  }

  function checkPasswordStrength(pwd) {
    if (pwd.length <= 0 || pwd === null){
      return "Please enter your password!"
    } else if (hasSpecialChars(pwd) && hasNumber(pwd) && hasUppercase(pwd) && hasLowercase(pwd) && pwd.length >= 6){
      return "valid"
    } else{
      return "Requirement : at least 6 characters, one capital letter,one lowercase letter, at least one digit and one special characters!"
    }
  }

  function checkEmailCondition(email){
    if(email.length == 0 || email === null){
      return "Please Enter your Email!"
    } else if (validateEmail(email)){
      return "valid"
    } else{
      return "Invalid!"
    } 
  }

  function checkConfirmPassword(confirm_pwd,pwd) {
    if (confirm_pwd.length <= 0 || confirm_pwd == null){
      return "Please confirm your password!"
    }else if (confirm_pwd != pwd){
      return "Please re-confirm your password!"
    } else{
      return "valid"
    } 
  }

  function hasNumber(str) {
    return /\d/.test(str);
  }
  function hasUppercase(str) {
    return /[A-Z]/.test(str);
  }
  function hasLowercase(str) {
    return /[a-z]/.test(str);
  }
  function hasSpecialChars(str) {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return specialChars.test(str);
  }
  function validateEmail(str){
    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return mailFormat.test(str);
  }

  // submit signup register
  $('.submit.signup').click(function(){
    var first_name = $('#first_name').val();
    var last_name = $('#last_name').val();
    var email = $('#e-mail').val();
    var password = $('#pswd').val();
    localStorage.setItem(email, [email,password,first_name,last_name]);

    $(".container.signup").hide();
    $(".container.signup_success").show()
  })

  // login validation
  $('.submit.login').click(function(){
    //input email and password
    var input_email = $('#login_email').val();
    var input_password = $('#login_pswd').val();
    //valid_email and password
    if (localStorage.getItem(input_email) !== null){
      let valid_credential = localStorage.getItem(input_email).split(",");
      var valid_email = valid_credential[0];
      var valid_password =  valid_credential[1];
    }
    
    console.log(input_email)
    console.log(input_password)
      
    console.log(valid_email)
    console.log(valid_password)

    if ((input_email !== valid_email) ||(input_password !== valid_password)){
      $("#subtitle").html("Credential do not match!").css("color","red");
    } else{
      $(".container.login").hide();
      $(".container.login_success").show();
    }

  })
});