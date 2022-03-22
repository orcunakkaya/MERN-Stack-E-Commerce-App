import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

function ProfileDetail() {
  const user = useSelector(state => state.profile.profile);
  const [date, setDate] = useState('');


    const handleParseDate = useCallback (async() => {
      let year = await user?.dateCreated?.slice(0, 4);
      let moon = await user?.dateCreated?.slice(5, 7);
      let day = await user?.dateCreated?.slice(8, 10);
      let clock = await user?.dateCreated?.slice(11, 16);
      setDate(`${day}/${moon}/${year} ${clock}`);
    }, [user?.dateCreated])

    useEffect(() => {
      handleParseDate();
    }, [user, handleParseDate])

  return (
    <div className='profile__details'>
        <div>First Name: <span>{user?.firstName}</span></div>
        <div>Last Name: <span>{user?.lastName}</span></div>
        <div>E-mail: <span>{user?.email}</span></div>
        <div>Date of registration: <span>{date}</span> </div>
    </div>
  )
}

export default ProfileDetail;