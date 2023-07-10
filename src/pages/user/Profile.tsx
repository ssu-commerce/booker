import React, { useEffect } from 'react';
import { getHttp } from '../../utils/AuthHttpWrapper';

function Profile() {
  useEffect(() => {
    getHttp('/info');
  }, []);
  return <div>프로필</div>;
}

export default Profile;
