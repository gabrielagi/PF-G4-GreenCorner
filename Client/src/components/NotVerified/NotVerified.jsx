import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useAuth0 } from "@auth0/auth0-react";

const NotVerified = () => {
  const { logout } = useAuth0();

  useEffect(() => {
    const sweetAlert = Swal.fire({
      icon: 'warning',
      title: 'Verify your email',
      text: 'You must verify your email before accessing this page.',
      allowOutsideClick: true,
      showConfirmButton: true,
      confirmButtonText: 'OK',
    });

    sweetAlert.then((result) => {
      if (result.isConfirmed || result.dismiss === Swal.DismissReason.close || result.dismiss === Swal.DismissReason.backdrop) {
        logout();
      }
    });
  }, [logout]);

  return null;
};


export default NotVerified;
