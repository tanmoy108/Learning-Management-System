'use client'
import MuxPlayer from '@mux/mux-player-react'
import React from 'react'

const VideoPlayer = ({playbackId}:{playbackId:string}) => {
  return (
    <MuxPlayer
    playbackId={playbackId}
  />
  )
}

export default VideoPlayer