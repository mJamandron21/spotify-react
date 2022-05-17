import React from 'react'
import styled from 'styled-components'
import { FaSearch } from 'react-icons/fa'
import { CgProfile } from 'react-icons/cg'
import { useStateProvider } from '../utils/StateProvider'

export default function Navbar() {
  const [{ userInfo }] = useStateProvider();
  // console.log ({ userInfo }, "from navbar" );
  return (
    <Container>
      <div className="search_bar">
        <FaSearch />
        <input type="text" placeholder="Artist, songs, or podcasts" />
      </div>
      <div className="avatar">
        <a>
          <CgProfile />
          <span>{userInfo?.userName}</span>
        </a>
      </div>
    </Container>
  )
}

const Container = styled.div`

`;
