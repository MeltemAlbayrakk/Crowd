import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

const PasswordValidation = ({ password, setRegisterData }) => {
  const [isValidLength, setIsValidLength] = useState(false);
  const [hasUpperCase, setHasUpperCase] = useState(false);
  const [hasLowerCase, setHasLowerCase] = useState(false);
  const [hasDigit, setHasDigit] = useState(false);
  const [hasSpecialChar, setHasSpecialChar] = useState(false);

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;

    // Koşulları kontrol et ve durumları güncelle
    const isLengthValid = newPassword.length >= 8;
    const hasUpperCaseValid = /[A-Z]/.test(newPassword);
    const hasLowerCaseValid = /[a-z]/.test(newPassword);
    const hasDigitValid = /\d/.test(newPassword);
    const hasSpecialCharValid = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(newPassword);

    // Koşulları kontrol et ve durumları güncelle
    setIsValidLength(isLengthValid);
    setHasUpperCase(hasUpperCaseValid);
    setHasLowerCase(hasLowerCaseValid);
    setHasDigit(hasDigitValid);
    setHasSpecialChar(hasSpecialCharValid);

    // Ana bileşene şifreyi güncelle
    setRegisterData((prevData) => ({ ...prevData, password: newPassword }));
  };

  return (
    <div>
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={handlePasswordChange}
      />

<table>
      <div>
        <ul style={{ listStyleType: 'none', padding: 0 ,display:'inline'}}>
        <li style={{ fontSize: '10px', marginBottom: '5px',opacity:1 }}>
            {isValidLength ? (
              <FontAwesomeIcon icon={faCheck} style={{ color: 'green', marginRight: '5px' }} />
            ) : (
              <FontAwesomeIcon icon={faTimes} style={{ color: 'red',opacity:1, marginRight: '5px' }} />
            )}
            En az 8 karakter
          </li>
          <li style={{ fontSize: '10px', marginBottom: '10px',opacity:1 }}>
            {hasUpperCase ? (
              <FontAwesomeIcon icon={faCheck} style={{ color: 'green', marginRight: '5px' }} />
            ) : (
              <FontAwesomeIcon icon={faTimes} style={{ color: 'red', marginRight: '5px' }} />
            )}
            Bir büyük harf
          </li>
          <li style={{ fontSize: '10px',opacity:1}}>
            {hasLowerCase ? (
              <FontAwesomeIcon icon={faCheck} style={{ color: 'green', marginRight: '5px' }} />
            ) : (
              <FontAwesomeIcon icon={faTimes} style={{ color: 'red', marginRight: '5px' }} />
            )}
            Bir küçük harf
          </li>
          <li style={{ fontSize: '10px',opacity:1}}>
            {hasDigit ? (
              <FontAwesomeIcon icon={faCheck} style={{ color: 'green', marginRight: '5px' }} />
            ) : (
              <FontAwesomeIcon icon={faTimes} style={{ color: 'red', marginRight: '5px' }} />
            )}
            Bir rakam
          </li>
          <li style={{ fontSize: '10px',opacity:1 }}>
            {hasSpecialChar ? (
              <FontAwesomeIcon icon={faCheck} style={{ color: 'green', marginRight: '5px' }} />
            ) : (
              <FontAwesomeIcon icon={faTimes} style={{ color: 'red', marginRight: '5px' }} />
            )}
            Bir özel karakter
          </li>
        </ul>
      </div>
      </table>
    </div>
    
  );
};

export default PasswordValidation;