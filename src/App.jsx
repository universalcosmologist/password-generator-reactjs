import { useState,useCallback,useEffect,useRef} from 'react'

function App() {

  const [length,setLength]=useState(8);
  const [numallowed,setNumallowed]=useState(false);
  const [charallowed,setCharallowed]=useState(false);
  const [password,setPassword]=useState('');
  let password_ref=useRef(null);

  const passwordgenerator=useCallback(()=>{
    let pass=''
    let str='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    if(charallowed) str+='!@#$%^&*()_+`~'
    if(numallowed) str+='1234567890'
    for (let index = 1; index <=length; index++) {
       let pos=Math.floor(Math.random()*str.length);
       pass+=str.charAt(pos);
    }
    setPassword(pass);
  },[length,numallowed,charallowed,setPassword])

  const copytoclipboard=useCallback(()=>{
    password_ref.current?.select();
    window.navigator.clipboard.writeText(password_ref.current?.value);
  },[password])

  useEffect(()=>{
    passwordgenerator()
   },[length,numallowed,charallowed,passwordgenerator])

  return (
     <>
    <div className='flex flex-wrap justify-center items-center'>
    <div className='bg-slate-700 w-full max-w-md mt-12 px-5 py-5'>
      <div className='flex flex-wrap justify-between'>
      <input
      type='text' 
      placeholder='Password' 
      value={password}
      readOnly
      className='flex-grow rounded-sm text-lg'
      ref={password_ref}
      />
      <button className='bg-blue-700 text-lg px-1 py-1 rounded-sm text-white hover:bg-blue-800'
      onClick={copytoclipboard}>copy</button>
      </div>
      <div className='mt-4 text-orange-400'>
        <input 
         type='range' 
         className='cursor-pointer' 
         value={length}
         max={100}
         min={6}
         onChange={(e)=>setLength(e.target.value)}
         />
        <label className='text-lg ml-3 mr-2'>Length({length})</label>
        <input type='checkbox'
         className='cursor-pointer' 
         id='numinput'
         defaultChecked={numallowed}
         onChange={()=>
          setNumallowed((prev)=>!prev)}
         />
        <label className='text-lg ml-1 mr-3' htmlFor='numinput'>Number</label>
        <input type='checkbox' 
        className='cursor-pointer' 
        id='charinput'
        defaultChecked={charallowed}
        onChange={()=>
          setCharallowed((prev)=>!prev)}
        />
        <label className='text-lg ml-1 mr-3' htmlFor='charinput'>Character</label>
      </div>
    </div>
    </div>
     </>
  )
}

export default App
