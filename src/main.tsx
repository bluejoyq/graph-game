import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import App from './App.tsx';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAgoSF2XaRaY63OE2ikwYneeWcfsXxyNK8',
  authDomain: 'graph-game-34224.firebaseapp.com',
  projectId: 'graph-game-34224',
  storageBucket: 'graph-game-34224.firebasestorage.app',
  messagingSenderId: '606840885819',
  appId: '1:606840885819:web:e87be0997e456ef5b0c21e',
  measurementId: 'G-S4N6MHQ56E',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const _analytics = getAnalytics(app);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
