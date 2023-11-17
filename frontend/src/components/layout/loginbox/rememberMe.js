import React from 'react';

//flexDirection: 'column-reverse'
const RememberMe = ({ rememberMe, handleRememberMeChange }) => {
  return (
    <div style={{ listStyle:'none', display: 'inline-block', alignItems: 'end', marginTop: '3px' }}>    
    <div>
    <label style={{marginBottom: '3px'}}>
        Remember Me
    </label>
    
    <input
      type="checkbox"
      checked={rememberMe}
      onChange={handleRememberMeChange}
      style={{ marginRight: '5px' }}
    />
    </div>
    <a>Şifremi Unuttum</a>
  </div>
  );
};

export default RememberMe;
