import React from 'react'
import './settings.css'
import PasswordChange from './passChange/PasswordChange'

const Settings = () => {
    return (
        <>
            <section className='settings-container'>
                <div className="container">
                    <PasswordChange />
                </div>
            </section>
        </>
    )
}

export default Settings