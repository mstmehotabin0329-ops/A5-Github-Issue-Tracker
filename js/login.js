const signInBtn = document.getElementById("signInBtn").addEventListener('click', function(){
    const usernameInput = document.getElementById("input-username");
    const username = usernameInput.value;
    console.log(username);

    const inputPassword = document.getElementById("password-input");
    const password = inputPassword.value;
    console.log(password);

    if(username == "admin" && password =="admin123"){
        alert('login Success');
        window.location.assign("/home.html");
    }
    else{
        alert("login Failed");
        return;
    }
})




// async function searchData() {
//     const text = document.getElementById("search-issue");
//     const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`);
//     const data = await res.json()
//     loadDisplay(data.data);
// }


// async function renderIssue(id) {
//     const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)
//     const data = await res.json()
//     if (issue == totalIssues) {
//         alert(issue.title + "\n\n" + issue.description)
//     }

// }

