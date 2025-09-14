import { useState } from "react"
import { useAuth } from "../Authorization/AuthContext"
import { Pen, PenOff } from "lucide-react";
import UsernameForm from "./UsernameForm";
import '../../css/user.css'
import PasswordForm from "./PasswordForm";

export default function User() {
    const [isChangeUsername, setIsChangeUsername] = useState<boolean>(false)
    const [isChangePassword, setIsChangePassword] = useState<boolean>(false)
    const username: string = useAuth().contextUsername!

    return (
      <>
        <h2>Your Profile</h2>
        <div className="user-div">
          <div className="user-column user-info">
            { isChangeUsername ?
              <UsernameForm hideField={() => setIsChangeUsername(false)}/> :
              <div>Username : {username}</div>
            }
          </div>
          <div className="user-column user-edit">
            { isChangeUsername ?
              <button className="red-button edit-field-button" onClick={() => setIsChangeUsername(false)}><PenOff /></button> :
              <button className="edit-field-button" onClick={() => {setIsChangeUsername(true); setIsChangePassword(false);}}><Pen /></button>
            }
          </div>
        </div>
        <hr/>
        <div className="user-div">
          <div className="user-column user-info">
            { isChangePassword ?
              <PasswordForm hideField={() => setIsChangePassword(false)}/> :
              <div>Password : ***</div>
            }
          </div>
          <div className="user-column user-edit">
            { isChangePassword ?
              <button className="red-button edit-field-button"onClick={() => setIsChangePassword(false)}><PenOff /></button> :
              <button className="edit-field-button" onClick={() => {setIsChangePassword(true); setIsChangeUsername(false);}}><Pen /></button>
            }
          </div>
        </div>
      </>
    )
}

/*


              { isChangeUsername ?
                <UsernameForm/> :
                <div>{username}</div>
              }



              { isChangePassword ?
                <PasswordForm/> :
                <div>Password</div>
              }


              { isChangeUsername ?
                <button className="red-button edit-field-button" onClick={() => setIsChangeUsername(false)}><PenOff /></button> :
                <button className="edit-field-button" onClick={() => setIsChangeUsername(true)}><Pen /></button>
              }


              { isChangePassword ?
                <button className="red-button edit-field-button"onClick={() => setIsChangePassword(false)}><PenOff /></button> :
                <button className="edit-field-button" onClick={() => setIsChangePassword(true)}><Pen /></button>
              }
*/