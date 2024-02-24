export default function auth(req,res,next) {
    const {email, password} = req.body;
    console.log(email, password);

    if(email ==="admin@admin.com" && password == "1234"){
        console.log("Bienvenido al login del admin", email);
        return res.redirect("/static/admin");
    }
    return next() 
};