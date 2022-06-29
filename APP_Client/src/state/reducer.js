const app = window.require('electron').remote
const fs = app.require('fs')

if(!fs.existsSync('./src/state/user.json')){
  let user = {
    username: null,
    email: null,
    tel: null,
    password: null,
    repertoire: []

  }
let donnees = JSON.stringify(user)
fs.writeFileSync('./src/state/user.json', donnees)
}

let fichier = fs.readFileSync('./src/state/user.json')


export const initialState = JSON.parse(fichier);

function reducer(state, action) {
  console.log(action)

  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        username: action.payload.username,
        email: action.payload.email,
        tel: action.payload.email,
        password: action.payload.password,
        privateKey: action.payload.privateKey,
      };

    case 'SET_PASSWORD_ACCEPTED':
      return {
        ...state,
        passwordAccepted: action.payload.passwordAccepted
      };

    case 'RESET':
      let user = {
        username: null,
        email: null,
        tel: null,
        password: null,
        privatekey: null,
        repertoire: []
    
      }
    let donnees = JSON.stringify(user)
    fs.writeFileSync('user.json', donnees)

    fs.unlinkSync('./keys/public.pem')
    fs.unlinkSync('./keys/private.pem')


      return {
        ...state,
        username: null,
        email: null,
        tel: null,
        password: null,
        privateKey: null,
        repertoire: [],
        passwordAccepted: false      
      };

    default:
      return state;
  }



}

export default reducer;