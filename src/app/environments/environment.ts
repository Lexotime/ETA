




// Initialize Firebase
export const environment = {

  firebaseConfig : {
    apiKey: "AIzaSyCyHU_plKTd0126vYiCXxmB3z7GMOZC0kE",
    authDomain: "etoile-d-afrique-app-827db.firebaseapp.com",
    projectId: "etoile-d-afrique-app-827db",
    storageBucket: "etoile-d-afrique-app-827db.appspot.com",
    messagingSenderId: "243030714558",
    appId: "1:243030714558:web:d5dbd001cfc50ceb4056ef",
    measurementId: "G-DPK52XZGRT"
  },

  level: [
		{name: 'CI', value: 'CI', option: ['néan']},
		{name: 'CP', value: 'CP', option: ['néan']},
		{name: 'CE1', value: 'CE1', option: ['néan']},
		{name: 'CE1', value: 'CE1', option: ['néan']},
		{name: 'CM1', value: 'CM1', option: ['néan']},
		{name: 'CM2', value: 'CM2', option: ['néan']},
		{name: '6e', value: '6éme', option: ['néan']},
		{name: '5e', value: '5éme', option: ['néan']},
		{name: '4e', value: '4éme', option: ['néan']},
		{name: '3e', value: '3éme', option: ['néan']},
		{name: 'Second', value: 'Second', option: ['L', 'S', 'STEG']},
		{name: 'Première', value: 'Première', option: ['L1', 'L2', 'STEG', 'S1', 'S2']},
		{name: 'Terminale', value: 'Terminale', option: ['L1', 'L2', 'STEG', 'S1', 'S2']},
	],

  production: false,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.