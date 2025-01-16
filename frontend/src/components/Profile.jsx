import React, { useState } from 'react'
import EditProfile from './EditProfile'
import UserCard from './UserCard'
const Profile = () => {
  const [FirstName, setFirstName] = useState("Elon");
  const [LastName, setLastName] = useState("Musk");
  const [PhotoUrl, setPhotoUrl] = useState("https://i.insider.com/64c7a2c9048ff200190deaf5?width=1200&format=jpeg");
  const [Gender, setGender] = useState("male");
  const [Skills, setSkills] = useState("Rocket science, EVs, Business");
  const [About, setAbout] = useState("I am CEO and founder of SpaceX");
  

  console.log(Gender)
  return (
    <div className="flex flex-grow gap-6 w-screen justify-center">
      <EditProfile setFirstName={setFirstName} setLastName={setLastName} setPhotoUrl={setPhotoUrl} setGender={setGender} setAbout={setAbout} setSkills={setSkills} FirstName={FirstName} LastName={LastName} PhotoUrl={PhotoUrl} Gender={Gender} About={About} Skills={Skills}/>
      <UserCard FirstName={FirstName} LastName={LastName} PhotoUrl={PhotoUrl} Gender={Gender} About={About} Skills={Skills}/>
    </div>
  )
}

export default Profile