import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [username, setUsername] = useState('');
  const [userDetails, setUserDetails] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [scrollToUserProfile, setScrollToUserProfile] = useState(false);
  const [formattedCreatedAt, setFormattedCreatedAt] = useState('');

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(`https://api.github.com/users/${username}`);
      setUserDetails(response.data);
      setNotFound(false);
      setScrollToUserProfile(true);
      const createdAt = new Date(response.data.created_at);
      const formattedDate = `${createdAt.getFullYear()}-${(createdAt.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${createdAt.getDate().toString().padStart(2, '0')}`;
      setFormattedCreatedAt(formattedDate);

    } catch (error) {
      setUserDetails(null);
      setNotFound(true);
      setScrollToUserProfile(true);
    }
  };

  const handleInputChange = (e) => {
    setUsername(e.target.value);
  };

  const scrollToUserProfileDiv = () => {
    if (scrollToUserProfile) {
      document.querySelector('.userProfile').scrollIntoView({
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    scrollToUserProfileDiv();
  }, [scrollToUserProfile]);

  const containerStyle = {
    backgroundImage: userDetails ? `url('${userDetails.avatar_url}')` : 'url(https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80)', 
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    width: '100%',
    height: '40vh',
  };


  return (
    <>
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96 mb-4">
        <h1 className="text-2xl font-semibold mb-4">GitHub User Details</h1>
        <input
          type="text"
          placeholder="Enter GitHub username"
          className="w-full p-2 border rounded mb-4"
          value={username}
          onChange={handleInputChange}
        />
        <button
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          onClick={() => {
            fetchUserDetails();
            setScrollToUserProfile(false); // Disable smooth scrolling
          }}
        >
          Search
        </button>
        
      </div>
      
    </div>
      <div className='userProfile'>
      {notFound ? (
        <section>
        <div class="container">
          <div class="row">
            <div class="col-sm-12">
              <div class="col-sm-12 col-sm-offset-1 text-center">
                <div class="bg-img">
                  <h1 class="text-center">404</h1>
                </div>
                <div class="content">
                  <h3 class="h2">User not found!</h3>
                  <p>Please check username and try again.</p>
                  <a href="/" class="link">Go to Home</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
        ) : userDetails ? (
            <div class="max-w-4xl flex items-center h-auto lg:h-screen flex-wrap mx-auto my-32 lg:my-0 shadow-xl">
    
            <div id="profile" class="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 mx-6 lg:mx-0">
            
        
                <div class="p-4 md:p-12 text-center lg:text-left">
                    <div class="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center" style={containerStyle}></div>
                    
                    <h1 class="text-3xl font-bold pt-8 lg:pt-0">{userDetails.name}</h1>
                    <div class="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-teal-500 opacity-25"></div>
                    <p class="pt-4 text-base font-bold flex items-center justify-center lg:justify-start">{userDetails.login}</p>
                    <p class="pt-2 text-gray-600 text-xs lg:text-sm flex items-center justify-center lg:justify-start"><i class="fa-solid fa-book-bookmark"></i><span className='spanStyle'>{userDetails.public_repos}</span></p>
                    <p class="pt-3 text-sm"><i class="fa-solid fa-code"></i><span className='spanStyle'>{userDetails.public_gists}</span></p>
                    <p class="pt-3 text-sm"><i class="fa-regular fa-calendar-days"></i><span className='spanStyle'>{formattedCreatedAt}</span></p>

                    <div class="pt-12 pb-8">
                        <a href={userDetails.html_url} target='_blank'>
                        <button class="bg-teal-700 hover:bg-blue-800 hover:text-white text-black font-bold py-2 px-4 rounded-full">
                          Github Page
                        </button> 
                        </a>
                    </div>
        
                    
        
                </div>
        
            </div>
            
            <div class="w-full lg:w-2/5">
                <img src={userDetails.avatar_url} class="rounded-none lg:rounded-lg shadow-2xl hidden lg:block" alt='use_img'/>
            </div>
        
        
        </div>
        ) : null}
      </div>
    </>
  );
};

export default App;
