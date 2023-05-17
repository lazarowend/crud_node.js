function verificar(id){
        Swal.fire({
            title: 'Deseja apagar esse Usuário?!',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Apagar',
            denyButtonText: `Cancelar`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                Swal.fire(window.location = '/delete/' + id)
            } else if (result.isDenied) {
                Swal.fire('Ok', '', 'info')
            }
        })   
}