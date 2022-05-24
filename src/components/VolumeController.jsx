import React from 'react'
import styled from "styled-components";
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";

export default function VolumeController() {
    const [{ token }] = useStateProvider();
    const setVolume = async (e) => {
        await axios.put(
            "https://api.spotify.com/v1/me/player/volume",
            {},
            {
              params: {
                volume_percent: parseInt(e.target.value),
              },
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
              },
            }
          );
    }
  return (
    <Container>
        <input type="range" min={0} max={100} onMouseUp={(e=>setVolume(e))} />
    </Container>
  )
}


const Container = styled.div`
    display: flex;
    justify-content: flex-end;
    align-content: center;
    padding-right: 2rem;
    /* input {
        width: 15rem;
        border-radius: 2rem;
        height: 0.5rem;
        background-color: white;
    } */
    input[type='range'] {
      overflow: hidden;
      width: 10rem;
      border-radius: 2rem;
      height: 0.5rem;
      -webkit-appearance: none;
      background-color: rgba(255,255,255,0.2);
    }
    
    input[type='range']::-webkit-slider-runnable-track {
      height: 0.5rem;
      width: 150px;
      -webkit-appearance: none;
      color: white;
    }
    
    input[type='range']::-webkit-slider-thumb {
      width: 5px;
      -webkit-appearance: none;
      height: 10px;
      cursor: ew-resize;
      background: #434343;
      box-shadow: -80px 0 0 80px white;
    }
`;