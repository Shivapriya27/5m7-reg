const form = document.getElementById("registrationForm");
const tableBody = document.getElementById("tableBody");
const search = document.getElementById("search");
const themeBtn = document.getElementById("themeBtn");


let users = JSON.parse(localStorage.getItem("users")) || [];


displayUsers(users);


// Register Form
form.addEventListener("submit", function(e) {
   e.preventDefault();


   let name = document.getElementById("name").value.trim();
   let email = document.getElementById("email").value.trim();
   let phone = document.getElementById("phone").value.trim();
   let age = document.getElementById("age").value;
   let gender = document.getElementById("gender").value;
   let event = document.getElementById("event").value;
   let college = document.getElementById("college").value.trim();
   let department = document.getElementById("department").value;
   let year = document.getElementById("year").value;
   let dob = document.getElementById("dob").value;
   let password = document.getElementById("password").value;
   let confirmPassword = document.getElementById("confirmPassword").value;
   let terms = document.getElementById("terms").checked;


   if(name===""){
       alert("Enter Name");
       return;
   }


   let emailPattern=/^[^ ]+@[^ ]+\.[a-z]{2,3}$/;


   if(!email.match(emailPattern)){
       alert("Invalid Email");
       return;
   }


   if(phone.length!=10 || isNaN(phone)){
       alert("Phone Number should be 10 digits");
       return;
   }


   if(age<18){
       alert("Age must be 18 or above");
       return;
   }


   if(password.length<6){
       alert("Password should contain at least 6 characters");
       return;
   }


   if(password!=confirmPassword){
       alert("Passwords do not match");
       return;
   }


   if(!terms){
       alert("Accept Terms & Conditions");
       return;
   }


   let user={
       name,
       email,
       phone,
       age,
       gender,
       event,
       college,
       department,
       year,
       dob
   };


   users.push(user);


   localStorage.setItem("users",JSON.stringify(users));


   displayUsers(users);


   alert("Registration Successful!");


   form.reset();


});


// Display Table
function displayUsers(data){


   tableBody.innerHTML="";


   data.forEach(user=>{


       tableBody.innerHTML+=`


       <tr>


       <td>${user.name}</td>


       <td>${user.email}</td>


       <td>${user.phone}</td>


       <td>${user.event}</td>


       </tr>


       `;


   });


}


// Search User


search.addEventListener("keyup",function(){


let text=search.value.toLowerCase();


let filtered=users.filter(user=>


user.name.toLowerCase().includes(text)


);


displayUsers(filtered);


});


// Dark Mode


themeBtn.onclick=function(){


document.body.classList.toggle("dark");


};


// Show Password


document.getElementById("showPassword").addEventListener("change",function(){


let pass=document.getElementById("password");


let confirm=document.getElementById("confirmPassword");


if(this.checked){


pass.type="text";


confirm.type="text";


}


else{


pass.type="password";


confirm.type="password";


}


});


// Highlight Selected Event


document.getElementById("event").addEventListener("change",function(){


this.style.background="#d4edda";


});


// Name Auto Capitalization


document.getElementById("name").addEventListener("input",function(){


this.value=this.value.replace(/\b\w/g,function(letter){


return letter.toUpperCase();


});


});


// Phone Only Numbers


document.getElementById("phone").addEventListener("input",function(){


this.value=this.value.replace(/[^0-9]/g,'');


});


// Password Strength


document.getElementById("password").addEventListener("keyup",function(){


if(this.value.length<6){


this.style.borderColor="red";


}


else if(this.value.length<10){


this.style.borderColor="orange";


}


else{


this.style.borderColor="green";


}


});


// Email Lowercase


document.getElementById("email").addEventListener("keyup",function(){


this.value=this.value.toLowerCase();


});


// Welcome Message


window.onload=function(){


console.log("Welcome to Event Registration System");


};


// Double Click Table to Clear


tableBody.addEventListener("dblclick",function(){


if(confirm("Clear All Registered Users?")){


users=[];


localStorage.removeItem("users");


displayUsers(users);


}


});
