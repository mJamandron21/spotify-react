import React, { useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios';
import { AiFillClockCircle } from 'react-icons/ai'
import { useStateProvider } from '../utils/StateProvider';
import { reducerCases } from '../utils/Constants';

export default function Body() {
  const [{ token, selectedPlaylistId, selectedPlaylist }, dispatch] = useStateProvider();

  useEffect(() => {
    const getInitialPlaylist = async () => {
      // console.log(selectedPlaylistId);
      const response = await axios.get(
        `https://api.spotify.com/v1/playlists/${selectedPlaylistId}`,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      const selectedPlaylist = {
        id: response.data.id,
        name: response.data.name,
        description: response.data.description.startsWith("<a")
            ? ""
            : response.data.description,
        image: response.data.images[0].url,
        tracks: response.data.tracks.items.map(({ track }) => ({
          id: track.id,
          name: track.name,
          artists: track.artists.map((artist) => artist.name),
          image: track.album.images[2].url,
          duration: track.duration_ms,
          album: track.album.name,
          context_uri: track.album.uri,
          track_number: track.track_number,
        })),
      }
      // console.log(selectedPlaylist);
      // console.log(response.data)
      dispatch({ type: reducerCases.SET_PLAYLIST, selectedPlaylist });

    };
    getInitialPlaylist();
  }, [token, dispatch, selectedPlaylist]);     

  return (
    <Container>
      {selectedPlaylist && (
        <>
        <Playlist>
          <div className="image">
            <img src={selectedPlaylist.image} alt="selectedplaylist" />
          </div>
          <Details>
            <span className='type'>PLAYLIST</span>
            <h1 className='title'>{selectedPlaylist.name}</h1>
            <p className='description'>{selectedPlaylist.description}</p>
          </Details>
        </Playlist>
        <List>
          <div className="header_row">
            <div className="col">
              <span>#</span>
            </div>
            <div className="col">
              <span>TITLE</span>
            </div>
            <div className="col">
              <span>ALBUM</span>
            </div>
            <div className="col">
              <span><AiFillClockCircle /></span>
            </div>
          </div>
          <div className="tracks">
            {selectedPlaylist.tracks.map(({
              id,
              name,
              artists,
              image,
              duration,
              album,
              context_uri,
              track_number,
            }, index) => {
              return (
                <div className='row' key={id}>
                  <div className="col">
                    <span>{index+1}</span>
                  </div>
                  <div className="col detail">
                    <div className="image">
                      <img src={image} alt='track' />
                    </div>
                    <div className="info">
                      <span className='name'>{name}</span>
                      <span>{artists}</span>
                    </div>
                  </div>
                  <div className="col">
                    <span>{album}</span>
                  </div>
                  <div className="col">
                    <span>{duration}</span>
                  </div> 
                </div>
              )
            })}

          </div>
        </List>
        </>
      )}
      
    </Container>
  )
}

const Container = styled.div`
padding-left: 1rem;
padding-right: 1rem;
`;

const Playlist = styled.div`
margin: 0 2rem;
display: flex;
align-items: center;
gap: 1.3rem;
  .image{
    img{
      height: 15rem;
      box-shadow: rgba(0,0,0,0.25) 0px 25px 50px -12px;
    }
  }
`;

const Details = styled.div`
display: flex;
flex-direction: column;
color: #e0dede;
  .type{
    margin-top: 10rem;
    font-size: 0.9rem;
  }
  .title{
    margin-top: 0;
    color: white;
    font-size: 4rem;
  }
`;

const List = styled.div`
  .header_row{
    display: grid;
    grid-template-columns: 0.3fr 3fr 2fr 0.1fr;
    color: #dddcdc;
    margin: 1rem 0 0 0;
    position: sticky;
    top: 15vh;
    padding: 1rem 2rem;
    transition: 0.3sec ease-in-out;
  }
  .tracks{
    margin: 0 2rem;
    display: flex;
    flex-direction: column;
    margin-bottom: 5rem;
    .row{
      padding: 0.5rem 1 rem;
      display: grid;
      grid-template-columns: 0.3fr 3.1fr 2fr 0.1fr;
      &:hover {
        background-color: rgba(0,0,0,0.25);
      }
      .col {
        display: flex;
        align-items: center;
        color: #dddcdc;
        img{
          height: 40px;
        }
      }
      .detail{
        display: flex;
        gap: 1rem;
        .info{
          display: flex;
          flex-direction: column;
        }
      }
    }
  }
`;
