const logIn = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector("#floating_username").value;
    const password = document.querySelector("#floating_password").value;
    console.log(username, password);
    if (username && password) {
        const response = await fetch('/api/profile/login', {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: {'Content-Type': 'application/json'},
        });
        console.log(response);
        if(response.ok) {
            //refresh to signed in profile page goes here
          document.location.replace('/dashboard');
        } else {
            window.alert('Login failed')
        }
    } 
  };

  document.querySelector("#login_submit").addEventListener('click', logIn);