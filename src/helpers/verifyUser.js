import { setState, getState } from '@/state.js';
const verifyUser = async () => {
  try {
    const res = await fetch('http://localhost:3000/verifyuser', {
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await res.json();
    console.log('verify');
    console.log(data);

    setState({ user: data });
  } catch (error) {
    console.log(error);
  }
};

export default verifyUser;
