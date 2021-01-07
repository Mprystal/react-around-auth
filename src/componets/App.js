import React from 'react';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import PopupWithImage from './PopupWithImage';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import api from '../utils/Api';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] =React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false); 
  const [selectedCard, setSelectedCard] = React.useState(undefined);
  const [currentUser, setCurrentUser] = React.useState([]);
  const[cards, setCards]=React.useState([]);

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

  
  

  return (
  <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      
      <Header />

      <Main onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onImage={(card)=>{handleCardClick(card)}}
      onCardLike={(card)=>{handleCardLike(card)}} onCardDelete={(card)=>{handleCardDelete(card)}} cards={cards}/>

      <Footer />

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
