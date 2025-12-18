async function signUp(email, password) {
    const { data, error } = await supabase.auth.signUp({
        email : email,
        password : password,
    })

    if(error){
        console.error('Error signing up: ', error.message);
        return false;
    }

    return true
}

async function logIn(email, password) {
    const { data, error} = await supabase.auth.signInWithPassword({
        email : email,
        password : password,
    })

    if(error){
        console.error('Error logging in: ', error.message);
        
        if(error.message.includes('Invalid login credentials')) {
            alert('Incorrect email or password. Please try again.');
        } else if(error.message.includes('Email not confirmed')) {
            alert('Please confirm your email before logging in. Check your inbox.');
        } else {
            alert('Log in failed: ' + error.message);
        }
        return false;
    }
    
    console.log('User has logged in: ', data);
    return true;
}

async function logOut() {
    const { error } = await supabase.auth.signOut();

    if(error){
        console.error('Error logging out: ', error.message);
        return false;
    }

    return true;
}

async function checkUser() {
    const { data : { user }, error } = await supabase.auth.getUser();

    if(user){
        console.log('User is logged in', user);
        return user;
    }
    else{
        console.log('No user logged in');
        return null;
    }
}