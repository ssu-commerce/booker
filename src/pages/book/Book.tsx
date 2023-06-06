import { useParams } from 'react-router-dom';
import React, { useEffect } from 'react';

const Book: React.FC = () => {
  const { id } = useParams();

  useEffect(() => {
    const bookId = Number(id);
    if (Number.isNaN(bookId)) {
      alert('유효하지 않은 접근입니다.');
    }
  }, [id]);

  return (
    <div>
      <div> 도서 상세페이지</div>
      <img
        id="bookImg"
        alt=""
        src="http://image.kyobobook.co.kr/images/book/xlarge/584/x9791158391584.jpg"
      />
    </div>
  );
};

export default Book;
