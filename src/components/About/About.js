import React from 'react'
import social from '../picture/friend.jpg'
import style from './about.css'

const About = () => {
  return (
    <div className='about-wrapper' style={style}>
      <img className='about-background' src={social} alt="social picture"/>
      <h1 className='about-subtitle'>Groups to keep in touch</h1>
      <p className='about-page'>Keep in touch with the groups of people that matter the most.
      With FarmChats, you can share messages, You can also name your group, mute or customize notifications.</p>
      <footer className='about-footer'>Copyright © 2020 by Troubleshoot, Inc</footer>
    </div>
  )
}
export default About
