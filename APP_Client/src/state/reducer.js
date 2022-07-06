const app = window.require('electron').remote
const fs = app.require('fs')
const axios = app.require('axios')

if (!fs.existsSync('./src/state/user.json')) {
  let user = {
    username: null,
    email: null,
    tel: null,
    password: null,
    repertoire: [],
    passwordAccepted: false,
    message: ''
  }
  let donnees = JSON.stringify(user)
  fs.writeFileSync('./src/state/user.json', donnees)
}

let fichier = fs.readFileSync('./src/state/user.json').toString()

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
      };

    case 'SET_PASSWORD_ACCEPTED':
      return {
        ...state,
        passwordAccepted: action.payload.passwordAccepted
      };

    case 'SET_PASSWORD':

      let userPass = {
        username: action.payload.username,
        email: action.payload.email,
        tel: action.payload.tel,
        password: action.payload.password,
        repertoire: [],
        passwordAccepted: false,
        message: '',
      }
      let donneesPass = JSON.stringify(userPass)
      fs.writeFileSync('./src/state/user.json', donneesPass)

      return {
        ...state,
        password: action.payload.password
      };

    case 'RESET':

      let fichier = fs.readFileSync('./src/state/user.json').toString()
      let fichierJson = JSON.parse(fichier)

      axios.post('http://18.233.162.213:3001/api/delete/user', { pseudo: fichierJson.username }).then((response) => {
        console.log(response.data.message);
      });

      let user = {
        username: null,
        email: null,
        tel: null,
        password: null,
        repertoire: [],
        passwordAccepted: false,
        message: '',
      }

      let donnees = JSON.stringify(user)

      fs.writeFileSync('./src/state/user.json', donnees)

      fs.unlinkSync('./keys/public.pem')
      fs.unlinkSync('./keys/private.pem')

      return {
        ...state,
        username: null,
        email: null,
        tel: null,
        password: null,
        repertoire: [],
        passwordAccepted: false,
        message: ''
      };

    case 'SET_MESSAGE':
      return {
        ...state,
        message: action.payload.message
      };

    default:
      return state;
  }



}

export default reducer;
