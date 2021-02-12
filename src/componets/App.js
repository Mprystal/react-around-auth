import React, {useState} from 'react';
import {Route, Switch, useHistory } from "react-router-dom";

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import PopupWithImage from './PopupWithImage';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
// import InfoTooltip from './InfoTooltip;'
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import api from '../utils/Api';
import Register from './Register';
import Login from './Login';
import {getContent} from './Auth';
import ProtectedRoute from './ProtectedRoute';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] =useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false); 
  const [selectedCard, setSelectedCard] = useState(undefined);
  const [currentUser, setCurrentUser] = useState([]);
  const[cards, setCards]=useState([]);
  const[loggedIn, setLoggedIn] = useState(false);
  
  const history = useHistory();

  React.useEffect(() => {
    let jwt = localStorage.getItem('jwt');
    if(jwt){
     getContent(jwt)
     .then((res)=> {
       if(res){
         console.log(res)
        setLoggedIn(true);
        history.push('/')
       }
     })
    }
  }, [history])

  const handleSignOut = () =>{
    console.log('clicked')
    localStorage.removeItem('jwt')
    setLoggedIn(false);
    history.push('/signin')
  }

  React.useEffect(() => {
    Promise.all([api.getUserInfo(),api.getCardList()]).then(
      ([userInfo,cardListData]) => { 
         setCurrentUser(userInfo)
         setCards(cardListData)
        }).catch((err) => {
          console.log(`Error: ${err}`);
        })
      },[])

  function handleCardLike(card) {        
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
    const newCards = cards.map((c) => c._id === card._id ? newCard : c);
    setCards(newCards);
    }).catch((e)=>console.log(e));
  } 

  function handleCardDelete(card){
    api.removeCard(card._id).then(()=>{
        const cardsAfterDelete = cards.filter((c) => c._id !== card._id)
        setCards(cardsAfterDelete);
    }).catch((e) => console.log(e))
   }

  function handleUpdateUser({name , about}){ 
    api.setUserInfo({name, about})
    .then(data => setCurrentUser(data))
    .then(()=>{closeAllPopups();})
    .catch(err => console.log(err))
  }

  function handleAddPlaceSubmit({name, link}){
    api.addCard({name, link})
    .then((newCard) =>setCards([newCard, ...cards]))
    .then(()=>{closeAllPopups();})
    .catch(err => console.log(err))
  }

  function handleUpdateAvatar({avatar}){
      api.setUserAvatar(avatar)
      .then(data => setCurrentUser(data))
      .then(()=>{closeAllPopups();})
      .catch(err => console.log(err))
  }

  function closeAllPopups(){
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(undefined);
    
  }

  function handleCardClick(card){
    setSelectedCard(card);
    
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }


  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleLogin(){
    console.log('running')
    setLoggedIn(true);
  }
  

  return (
  <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      <Switch>
        <ProtectedRoute exact path="/" 
        loggedIn={loggedIn} 
        handleSignOut={handleSignOut}
        component={Main} 
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick} 
        onAddPlace={handleAddPlaceClick} 
        onImage={(card)=>{handleCardClick(card)}}
        onCardLike={(card)=>{handleCardLike(card)}} 
        onCardDelete={(card)=>{handleCardDelete(card)}} 
        cards={cards}
        />
         
        <Route exact path="/signup">
          <Header loggedIn={loggedIn} handleSignOut={handleSignOut} /> 
          <Register history={history} />  
        </Route>
        <Route exact path="/signin">
          <Header loggedIn={loggedIn} path={'signin'} handleSignOut={handleSignOut} /> 
          <Login handleLogin={handleLogin} history={history}/>  
        </Route>
      </Switch>
     
        

      <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />

      <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}/>

      <AddPlacePopup onAddPlaceSubmit={handleAddPlaceSubmit} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}/>

      <PopupWithForm name={"popup_type_delete-card"} title={"Are you sure?"} />

      <PopupWithImage card={selectedCard}  onClose={closeAllPopups}/>
    
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
