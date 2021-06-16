import React,{useState, useEffect} from 'react';
import './App.css';
import Axios from 'axios';

function App() {

  const [videoGameName, setGameName] = useState('');
  const [review, setReview] = useState('');
  const [gameReviewList, setGameList] = useState([]);
  const [newReview, setNewReview] = useState("");

  useEffect(()=> {
    Axios.get("http://localhost:3002/api/get").then((response)=> {
      setGameList(response.data);
    });
  }, []);

  const submitReview = () => {
    Axios.post("http://localhost:3002/api/insert", {
      videoGameName: videoGameName, 
      gameReview: review
    });
    
    setGameList([
      ...gameReviewList,
      {video_game_name: videoGameName, game_review: review},
    ]);
  };

  const deleteReview = (game) => {
    Axios.delete(`http://localhost:3002/api/delete/${game}`);
  };

  const updateReview = (game) => {
    Axios.put("http://localhost:3002/api/update", {
      videoGameName: game, 
      gameReview: newReview,
    });
    setNewReview("");
  };

  return (
    <div className="App">
        <h1>Video Game Reviews</h1>

      <div className="form">
      <label>Video Game Name:</label>
      <input type="text" name="videoGameName" onChange={(e)=> {
        setGameName(e.target.value);
      }}/>
      <label>Review:</label>
      <input type="text" name="review" onChange={(e)=> {
        setReview(e.target.value);
      }}/>

      <button onClick={submitReview}>Submit</button>

      {gameReviewList.map((val)=> {
        return (
        <div className="card">
          <h1>{val.video_game_name}</h1> 
          <p>{val.game_review}</p>

          <button onClick={() => {deleteReview(val.video_game_name)}}>Delete</button>
          <input type="text" id="updateInput" onChange={(e)=> {
            setNewReview(e.target.value);
          }}/>
          <button onClick={()=> {updateReview(val.video_game_name)}}>Update</button>
        </div>
      );
      })};
      </div>
    </div>
  );
}

export default App;
