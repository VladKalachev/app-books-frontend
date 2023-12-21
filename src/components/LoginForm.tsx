import { useContext, useState } from 'react';
import storeContext from '../contexts/store';
import { observer } from 'mobx-react-lite';

const LoginForm = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const store = useContext(storeContext);

  return (
    <div >
      <div className="rounded-md shadow-sm -space-y-px mb-2" >
        <label htmlFor="email-address" className="sr-only">
          Email address
        </label>
        <input 
          id="email-address"
          onChange={e => setEmail(e.target.value)} 
          value={email} 
          type='text'  
          placeholder='Email'
          className="appearance-none rounded-none relative block
          w-full px-3 py-2 border border-gray-300
          placeholder-gray-500 text-gray-900 rounded-b-md
          focus:outline-none focus:ring-indigo-500
          focus:border-indigo-500 focus:z-10 sm:text-sm"
          />
      </div>
       
        <div className='mb-2'>
            <label htmlFor="password" className="sr-only">
                  Password
            </label>
            <input 
            id="password"
            onChange={e => setPassword(e.target.value)} 
            value={password} 
            type="password"
            name="password"  
            placeholder='Password'
            className="appearance-none rounded-none relative block
            w-full px-3 py-2 border border-gray-300
            placeholder-gray-500 text-gray-900 rounded-b-md
            focus:outline-none focus:ring-indigo-500
            focus:border-indigo-500 focus:z-10 sm:text-sm"
            />
        </div>

        <button onClick={() => store?.login(email, password)}>
          Логин
        </button>
        <button onClick={() => store?.registration(email, password)}>
          Регистрация
        </button>
     
  </div>
  )
}

export default observer(LoginForm);