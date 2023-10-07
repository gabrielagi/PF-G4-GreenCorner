import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

const NotVerified = () => {
    const navigate = useNavigate();
    const { user,logout } = useAuth0();

    useEffect(() => {

      Swal.fire({
        icon: 'warning',
        title: 'Verify your email',
        text: 'You must verify your email before accessing this page.',
      }).then((result) => {
        if (result.isConfirmed) {
        logout();
          navigate('/');
        }
      });
    }, [navigate]);
  
    return null; 
};

export default NotVerified;
