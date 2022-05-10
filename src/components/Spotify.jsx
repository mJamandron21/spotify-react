import React from 'react'
import styled from 'styled-components'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import Body from './Body'
import Footer from './Footer'

export default function Spotify() {
  return (
    <Container>
      <div className='spotify-body'>
        <Sidebar />
        <div className='body'>
          <Navbar />
          <div className='body-contents'>
            <Body />
          </div>
        </div>
      </div>
      <div className='spotify-footer'>
        <Footer />
      </div>
    </Container>
  )
}

const Container = styled.div`

`;
