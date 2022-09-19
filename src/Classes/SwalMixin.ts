// ES6 Modules or TypeScript
import Swal from 'sweetalert2'
import "../Css/SwalCustom.css"

export const ToastError = Swal.mixin({
    toast: true,
    position: 'bottom',
    showConfirmButton: false,
    timer: 3000,
    icon: 'error',
    timerProgressBar: true,
    didOpen: (toast) => {
        //toast.addEventListener('mouseenter', Swal.stopTimer)
        //toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})
export const ToastSuccess = Swal.mixin({
    toast: true,
    position: 'bottom',
    showConfirmButton: false,
    timer: 3000,
    icon: 'success',
    timerProgressBar: true,
    didOpen: (toast) => {
        //toast.addEventListener('mouseenter', Swal.stopTimer)
        //toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})
