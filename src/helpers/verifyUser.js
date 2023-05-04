import {setState} from '@/state.js';
const verifyUser = async () => {
  try {
    const res = await fetch('http://localhost:5000/verifyuser', {
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await res.json();
   setState({user: data});
  } catch (error) {
    console.log(error)
  }
}

export default verifyUser