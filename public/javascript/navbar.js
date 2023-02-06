const godash = () => {
    document.location.replace('/dashboard');
};

const gohome = () => {
    document.location.replace('/');
};

const golog = () => {
    document.location.replace('/login');
};

const logout = async () => {
    const response = await fetch('/api/profile/logout', {
        method: 'POST',
        headers: {"Content-Type": 'application/json'}
    });
  
    if (response.ok) {
      window.alert('logged out');
      document.location.replace('/')
    } else {
        window.alert('logout failed');
    }
  };

const newpost = () => {
    document.location.replace('/addpost');
};

const gosignup = () => {
    document.location.replace('/signup');
};

document.querySelector("#dashboard").addEventListener('click', godash);
document.querySelector("#homepage").addEventListener('click', gohome);
if(document.querySelector("#navlog")) {
document.querySelector("#navlog").addEventListener('click', golog);
}
document.querySelector("#logout").addEventListener('click', logout);
if(document.querySelector("#newpost")) {
    document.querySelector("#newpost").addEventListener('click', newpost);
}
if(document.querySelector("#signup")) {
    document.querySelector("#signup").addEventListener('click', gosignup);
}
if(document.cookie) {
    var username = document.cookie.slice(9);
    console.log(username);
} 