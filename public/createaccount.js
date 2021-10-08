function CreateAccount(){
  const [show, setShow]         = React.useState(true);
  const [status, setStatus]     = React.useState('');
  const [name, setName]         = React.useState('');
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');
  const ctx = React.useContext(UserContext);  


  function validateName() {
    if (!name) {
      setStatus('You do have a name right?');
      setTimeout(() => setStatus(''),3000);
      return false;
    }
    return true;
  }

  function validateEmail() {
    if (!email) {
      setStatus('Surely you have an email...');
      setTimeout(() => setStatus(''),3000);
      return false;
    }
    return true;
  }

  function validatePassword() {
    if (!password) {
      setStatus('Please enter a password.');
      setTimeout(() => setStatus(''),3000);
      return false;
    }
    return true;
  }

  function validatePasswordLength() {
    if (password.length < 8) {
      setStatus('At least 8 characters please.')
      setTimeout(() => setStatus(''), 3000);
      return false;
    }
    return true;
  }

  function handleCreate(){
    console.log(name,email,password);
    if (!validateName(name,     'name'))     return;
    if (!validateEmail(email,    'email'))    return;
    if (!validatePassword(password, 'password')) return;
    if (!validatePasswordLength(password, 'password')) return;
    ctx.users.push({name,email,password,balance:100});
    setShow(false);
  }    

  function clearForm(){
    setName('');
    setEmail('');
    setPassword('');
    setShow(true);
  }

  let users = [];
  const addUser = (event) => {
    event.preventDefault();
    let user = {
      id: Date.now(),
      name: user,
      email: email,
      password: password
    }
    users.push(user);
    document.forms[0].reset();
  
    console.warn(user + ' added.');
  
    localStorage.setItem('userDatabase', JSON.stringify(users))
  }

  return (
    <Card
      bgcolor="primary"
      header="Create Account"
      status={status}
      body={show ? (  
              <>
              Name<br/>
              <input type="input" 
              className="form-control" 
              id="name" 
              placeholder="Enter name" 
              value={name} 
              onChange={e => setName(e.currentTarget.value)} required/><br/>

              Email address<br/>
              <input type="input" 
              className="form-control" 
              id="email" 
              placeholder="Enter email" 
              value={email} 
              onChange={e => setEmail(e.currentTarget.value)} required/><br/>

              Password<br/>
              <input type="password" 
              className="form-control" 
              id="password" 
              placeholder="Enter password" 
              value={password} 
              onChange={e => setPassword(e.currentTarget.value)} required/><br/>
              <button 
              type="submit" 
              className="btn btn-light" 
              onClick={handleCreate}>Create Account</button>
              </>
            ):(
              <>
              <h5>Success</h5>
              <button type="submit" className="btn btn-light" onClick={clearForm}>Add another account</button>
              </>
            )}
    />
  )
}