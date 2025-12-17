document.querySelector('.signlog').addEventListener('click', () => {
    document.getElementById('authModal').style.display = 'block';
});

document.getElementById('authModal').addEventListener('click', (e) => {
    if(e.target.id === 'authModal'){
        closeModal();
    }
});

function closeModal(){
    document.getElementById('authModal').style.display = 'none';
}

async function handleSignUp() {
    const email = document.getElementById('emailInput').value;
    const password = document.getElementById('passwordInput').value;

    const success = await signUp(email, password);
    if(success){
        alert('Check your email to confirm');
        closeModal();
        window.location.href = 'dashboard.html';
    }
}

async function handleLogIn() {
    const email = document.getElementById('emailInput').value;
    const password = document.getElementById('passwordInput').value;

    const success = await logIn(email, password);
    if(success){
        alert('Log in was successfull');
        closeModal();
        window.location.href = 'dashboard.html';
    }
}

async function checkAuth() {
    const user = await checkUser();
    if(user){
        document.querySelector('.signlog').textContent = 'Log Out';
        document.querySelector('.signlog').onclick = async () => {
            await logOut();
            alert('Log out was successfull.');
            location.reload()
        }
    }
}
checkAuth();