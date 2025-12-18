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

async function checkNameExist(name) {
    const { data: { user} } = await supabase.auth.getUser();
    if(!user){
        return false;
    }
    const { data, error} = await supabase .from('user_names') .select('name') .eq('name', name.toLowerCase()) .neq('user_id', user.id);

    if(error){
        console.error("Error checking name", error);
        return false;
    }
    return data && data.length > 0;
}

async function updateUserName(newName) {
    const { data: { user } } = await supabase.auth.getUser();
    
    if(!user){
        alert("You must be logged in to change your name");
        return false;
    }

    const { data, error } = await supabase.auth.updateUser({
        data: { display_name: newName }
    });

    if(error){
        alert("Failed to update name: " + error.message);
        return false;
    }

    const { error: dbError } = await supabase
        .from('user_names')
        .upsert({ 
            user_id: user.id, 
            name: newName.toLowerCase() 
        });

    if(dbError){
        console.error('Error storing name in database:', dbError);
    }

    console.log('Name updated:', newName);
    return true;
}