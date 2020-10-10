import React from 'react'
import social from '../picture/friend.jpg'
import './about.css'

const About = () => {
  return (
    <div className='about-wrapper'>
      <div className='img'>
        <img src={social} alt="social picture"/>
      </div>
      <br/>
      <h1 className='about-subtitle'>Hi there, Stranger!!!</h1><br/>
      <p className='about-page'>If you dont say Hi, how are you going to make new Friends???
      With FarmChats, you can share your thoughts, ideas or just pass your time talking to strangers all around the world. Just sign in and meet new people.</p>
      <footer className='about-footer'>Copyright © 2020 by Troubleshoot, Inc</footer>
    </div>
  )
}
export default About
