

import * as React from 'react';
import { Container } from "@mui/system";
import Box from '@mui/material/Box';
import LandingNavbar from "./LandingNavbar";

const LandingBody=()=>{
  
  return (
  
    <div>
      <LandingNavbar/>
      <Container fixed >
      <Box sx={{ mr:2,paddingTop:"25%",paddingLeft:"15%", paddingRight:"15%",bgcolor: '#bbdefb',fontFamily: 'monospace',color: 'inherit', fontWeight: 700, height: '100vh' }} >
        <h1>MERHABA</h1>
        <h2>UNREACT'A HOŞGELDİN</h2>
        <br>
        </br>
        <h2>BURASI AÇIKLAMA KISMININ YAZACAĞI YER AMA AKLIMA BİR ŞEY GELMEDİĞİ İÇİN BUNU YAZIYORUM</h2>
      </Box>
      
      
   
 
     
        

      </Container>
      </div>

  )
}
export default LandingBody;