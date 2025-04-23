import React from 'react'
import '@styles/common/auth/user/UserSettings.css'
import UserDashboard from '@components/common/auth/user/UserDashboard'
import UserAccountSecurity from '@components/common/auth/user/UserAccountSecurity'
import UserProgress from '@components/common/auth/user/UserProgress'

const Page = () => {
  return (
    <div className='user-settings'>
        <div className='user-settings-container'>
            <div className='user-settings-dashboard'>
                <UserDashboard profile="inherit" security="#e7e7e7"/>
                <UserAccountSecurity/>
            </div>
          
        </div>
    </div>
  )
}

export default Page