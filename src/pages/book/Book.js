import {useParams} from "react-router-dom";
import {useEffect} from "react";

const Book = (props) => {
    let {id} = useParams();

    useEffect(() => {
        const bookId = Number(id)
        if (isNaN(bookId)) {
            alert("유효하지 않은 접근입니다.")
        } else {

        }
    }, [id])

    return (
        <div>
            <div> 도서 상세페이지</div>
            <img id="bookImg" alt="" src="http://image.kyobobook.co.kr/images/book/xlarge/584/x9791158391584.jpg"/>
        </div>
    )
};

export default Book