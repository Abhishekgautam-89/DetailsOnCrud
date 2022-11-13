var submit = document.getElementById('submit');
const list = document.getElementById('users');

    window.addEventListener("DOMContentLoaded", ()=>{
        // Object.keys(localStorage).forEach((key)=>{
        //     var detailsOfPeople = JSON.parse(localStorage.getItem(key));
        //     showDataOnScreen(detailsOfPeople);
        //     }
        // );  

        
        const details = axios.get("http://localhost:3000/user")
        .then((resolve)=>{
            for (var i=0; i<resolve.data.allUser.length;i++){
                // console.log(resolve.data)
                showDataOnScreen(resolve.data.allUser[i]);                
                }                
            
            // console.log(resolve.data.allUser)
        })
        .catch((error)=>{
            console.log(error);
        })
    })

   

submit.addEventListener('click', onSubmit);

function onSubmit(e){
e.preventDefault();
var name = document.getElementById('name').value;
var email = document.getElementById('email').value;
var phone = document.getElementById('phone').value;

var obj = {
name,
email,
phone
};
var objConverted = JSON.stringify(obj);

axios.post("http://localhost:3000/user", obj)
.then((response)=>{
    console.log(response.data);
})
.catch((error)=>{
    console.log("Something gone wrong")
})
// localStorage.setItem(obj.email, objConverted);
showDataOnScreen(obj);
}


function showDataOnScreen(user){
    if(localStorage.getItem(user.email) !=null){
        removeUserFromScreen(user.email);

    }
    console.log(user);
    const li = document.createElement('li');
    li.id = user.id;
    li.appendChild(document.createTextNode(user.name+'- '+user.email));
    list.appendChild(li);
    const edit = document.createElement('input');
    edit.id ='edit';
    edit.type='button';
    edit.value='Edit';
    li.appendChild(edit);
    edit.addEventListener('click', ()=>{
        document.getElementById('name').value=user.name;
        document.getElementById('email').value = user.email;
        document.getElementById('phone').value=user.phone;
        axios.delete(`http://localhost:3000/user/delete/${user.id}`)
        li.remove();
    });
    const del = document.createElement('input');
    del.id = 'delete';
    del.value='Delete';
    del.type='button';
    del.addEventListener('click', ()=>{
        axios.delete(`http://localhost:3000/user/delete/${user.id}`)
        
        // localStorage.removeItem(user.email);
       li.remove(); 
    });
    li.appendChild(del);
}

function removeUserFromScreen(emailId){
    // console.log(emailId);
    const childNode = document.getElementById(emailId);
    if(childNode){
        list.removeChild(childNode);
    }
}