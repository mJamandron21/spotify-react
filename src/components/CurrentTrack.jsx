import React from 'react'
import styled from 'styled-components';
import { useEffect } from 'react';
import { useStateProvider } from '../utils/StateProvider';
import axios from 'axios';
import { reducerCases } from '../utils/Constants';

export default function CurrentTrack() {    
const [{ token, currentPlaying }, dispatch] = useStateProvider();
// console.log("component",currentPlaying)
useEffect(() => {
    const getCurrentTrack = async () => {
        const response = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",

            },
        }
        );
        if(response.data !==""){
            const {item} = response.data;
            const currentPlaying = {
                id: item.id,
                name: item.name,
                artists: item.artists.map((artist) => artist.name),
                image: item.album.images[2].url,
            };
            dispatch({ type: reducerCases.SET_PLAYING, currentPlaying});
        }
    }
    getCurrentTrack();
}, [token, dispatch]);  


return (
    <Container>
        {
            currentPlaying && (
                <div className="track">
                    <div className="track_image">
                        <img src={currentPlaying.image} alt="currentPlaying" />
                    </div>
                    <div className="track_info">
                        <h4>{currentPlaying.name}</h4>
                        <h6>{currentPlaying.artists.join(", ")}</h6>
                    </div>
                </div>
            )
        }
    </Container>
  )
}

const Container = styled.div`
padding: 0;
margin: 0;
    .track{
        display:flex;
        align-items: center;
        gap: 1rem;
    }
    .track_info{
            display:flex;
            flex-direction: column;
            gap: 0.3rem;
            h4{
                color: white;
            }
            h6{
                color: #b3b3b3
            }
        }
`;