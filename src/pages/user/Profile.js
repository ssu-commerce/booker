import {getHttp} from "../../utils/AuthHttpWrapper";
import {useEffect} from "react";

const Profile = (props) => {
    useEffect(() => {
        getHttp('/info')

    }, [])
    return (
        <div>
            프로필
        </div>
    )
}

export default Profile