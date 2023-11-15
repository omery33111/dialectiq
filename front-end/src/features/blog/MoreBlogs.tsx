import React, { useEffect } from 'react'
import { getMoreBlogsAsync, selectBlogs } from './blogSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { myServer } from '../../endpoints/endpoints';

const MoreBlogs = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const blogs = useAppSelector(selectBlogs)
    

    useEffect(() => {
        dispatch(getMoreBlogsAsync());
    }, [dispatch])


    function formatDate(dateString: any) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${year}-${month}-${day}, ${hours}:${minutes}`;
      }



      const isMobile = window.innerWidth <= 767;

  return (

    <div className="more-blogs">
        <div style={{ position: 'absolute', backgroundColor: "#D2B48C", border: '2px solid black', padding: "20px", right: -10, top: 149}}>

  {blogs.map((blog, index) => (
    <div key={index} style={{ marginBottom: '-180px', position: "relative", top: -135 }}>
     

     

        

      <div>
      <img
          onClick={() => navigate(`/blog/blog_page/${blog.id}`)}
          src={require('../../images/forthumbnail.png')}
          width="240"
            height="150"
          alt="profile-logo"
          style={{ position: 'relative', top: 150, right: 0, cursor: "pointer", zIndex: 1 }}
        />
          <img
          onClick={() => navigate(`/blog/blog_page/${blog.id}`)}
            style={{ border: '1px solid #000000', cursor: "pointer" }}
            src={myServer + blog.picture}
            width="240"
            height="150"
          />
          
      </div>
     
      

      

     <div>
        <h5 style={{ padding: '7px', position: "relative", top: -3 }}>{blog.title}</h5>

      
        <p style={{ padding: '7px', position: "relative", top: -25 }}>{formatDate(blog.date)}</p>
    </div>
        
    </div>
    
  ))}


        </div>

      
    </div>
  )
}

export default MoreBlogs