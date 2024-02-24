const signinForm = document.querySelector('#signinForm');   

signinForm.addEventListener('submit', e => {
    e.preventDefault();

    const dataForm = new FormData(signinForm);
    
    const obj = {};
    dataForm.forEach((value, key)=> obj[key]=value);
    fetch('/api/users/',{
            method:'POST',
            body:JSON.stringify(obj),
            headers:{
                'Content-Type':'application/json'
            },
        }
    ).then(result => {
        if (result.status === 200) {
            Swal.fire({
                title: 'Usuario Creado!',
                icon: 'success'
            })
                .then(() => {
                    window.location.replace('/static/login');
                });
        } else {
            Swal.fire({
                title: 'Error al crear Usuario',
                icon: 'error'
            })
        };
    });
    e.target.reset();
})