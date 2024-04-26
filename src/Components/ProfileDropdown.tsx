import React from 'react'

type Props = {
    handleProfileClick:CallableFunction,
    handleLogoutClick:CallableFunction
}

const ProfileDropdown = (props: Props) => {
  return (
    <div className="absolute w-28 bg-white border border-gray-200 rounded-md shadow-lg">
    <div className="py-1">
      <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={()=>{props.handleProfileClick()}}>
        Profile
      </button>
      <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={()=>{props.handleLogoutClick()}}>
        Logout
      </button>
    </div>
  </div>
  )
}

export default ProfileDropdown