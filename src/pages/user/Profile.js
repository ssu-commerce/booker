import {useParams} from "react-router-dom";

const Profile = (props) => {
    let {id} = useParams();
    console.log(id)
    return(
        <div>
            도서 상세페이지 ID = {id}
        </div>
    )
}

export default Profile