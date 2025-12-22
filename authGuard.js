document.addEventListener('DOMContentLoaded', async () => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        window.location.href = "index.html?showAlert=1";
    }
});
