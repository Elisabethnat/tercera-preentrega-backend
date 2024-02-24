const login = document.getElementById('formLogin');

login.addEventListener('submit', e =>{
    e.preventDefault();

    const dataForm = new FormData(login);
    const obj = {};

    dataForm.forEach((value, key) => obj[key] = value);
    fetch('/api/sessions/login', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(result=>{
        if(result.status===200){
            Swal.fire({
                title: 'Bienvenido',
                icon: 'success'
            }) 
            .then (()=>{
                window.location.replace('/static/products');
            })   
        };
    });
});