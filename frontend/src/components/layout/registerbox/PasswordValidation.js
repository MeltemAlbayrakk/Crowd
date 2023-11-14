import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

const PasswordValidation = () => {
  const [password, setPassword] = useState('');
  const [isValidLength, setIsValidLength] = useState(false);
  const [hasUpperCase, setHasUpperCase] = useState(false);
  const [hasLowerCase, setHasLowerCase] = useState(false);
  const [hasDigit, setHasDigit] = useState(false);
  const [hasSpecialChar, setHasSpecialChar] = useState(false);

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);

    // Şifre koşullarını kontrol et
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
  };

  const handleSubmit = () => {
    if (isValidLength && hasUpperCase && hasLowerCase && hasDigit && hasSpecialChar) {
      console.log('Şifre geçerli, işlem yapılıyor...');
    } else {
      console.log('Şifre geçerli değil, uyarı göster');
    }
  };

  return (
    <div>
      <label htmlFor="password">Şifre:</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={handlePasswordChange}
      />

      <table>
      <div>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
        <li style={{ fontSize: '10px', marginBottom: '5px' }}>
            {isValidLength ? (
              <FontAwesomeIcon icon={faCheck} style={{ color: 'green', marginRight: '5px' }} />
            ) : (
              <FontAwesomeIcon icon={faTimes} style={{ color: 'red',opacity:1, marginRight: '5px' }} />
            )}
            En az 8 karakter
          </li>
          <li style={{ fontSize: '10px', marginBottom: '10px' }}>
            {hasUpperCase ? (
              <FontAwesomeIcon icon={faCheck} style={{ color: 'green', marginRight: '5px' }} />
            ) : (
              <FontAwesomeIcon icon={faTimes} style={{ color: 'red', marginRight: '5px' }} />
            )}
            Bir büyük harf
          </li>
          <li style={{ fontSize: '10px' }}>
            {hasLowerCase ? (
              <FontAwesomeIcon icon={faCheck} style={{ color: 'green', marginRight: '5px' }} />
            ) : (
              <FontAwesomeIcon icon={faTimes} style={{ color: 'red', marginRight: '5px' }} />
            )}
            Bir küçük harf
          </li>
          <li style={{ fontSize: '10px' }}>
            {hasDigit ? (
              <FontAwesomeIcon icon={faCheck} style={{ color: 'green', marginRight: '5px' }} />
            ) : (
              <FontAwesomeIcon icon={faTimes} style={{ color: 'red', marginRight: '5px' }} />
            )}
            Bir rakam
          </li>
          <li style={{ fontSize: '10px' }}>
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
