import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const style = {
  table: {
    borderCollapse: 'collapse'
  },
  tableCell: {
    border: '1px solid gray',
    margin: 0,
    padding: '5px 10px',
    width: 'max-content',
    minWidth: '150px'
  },
  form: {
    container: {
      padding: '20px',
      border: '1px solid #F0F8FF',
      borderRadius: '15px',
      width: 'max-content',
      marginBottom: '40px'
    },
    inputs: {
      marginBottom: '5px'
    },
    submitBtn: {
      marginTop: '10px',
      padding: '10px 15px',
      border:'none',
      backgroundColor: 'lightseagreen',
      fontSize: '14px',
      borderRadius: '5px'
    },
    error: {
      outline: 'none',
      border: '1px solid tomato',
      boxShadow: '0 0 3px 1px tomato',
      padding: '2px'
    }
  }
}

function PhoneBookForm({ setUserList, userList }) {

  const [isSubmit, setSubmit] = useState(false);
  const [successPnoneValid, setSuccessPhoneValid] = useState(false);
  const [errorPhoneValid, setErrorPhoneValid] = useState(false);

  const [form, setState] = useState({
    id: userList.length,
    userFirstname: '',
    userLastname: '',
    userPhone: ''
  });

  const handleSubmit = event => {
    event.preventDefault()
    if (successPnoneValid) {
      setUserList([...userList, form])
      setSubmit(true)
    }
  };

  const addField = e => {
    setSubmit(false)
    setState({
      ...form,
      id: userList.length,
      [e.target.name]: e.target.name === 'userPhone' ? phoneValidate(e.target.value) : e.target.value
    });
  };

  const phoneValidate = (phone_number) => {
    const re = (/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/);
    if (!re.test(phone_number)) {
      setSuccessPhoneValid(false)
      setErrorPhoneValid(true)
    }
    else {
      setSuccessPhoneValid(true)
      setErrorPhoneValid(false)
    }
    return phone_number
  };

  return (
    <form onSubmit={handleSubmit} style={style.form.container}>
      <label>First name:</label>
      <br />
      <input 
        style={style.form.inputs}
        className='userFirstname'
        name='userFirstname' 
        type='text'
        value={isSubmit ? '' : form.userFirstname}
        onChange={addField}
        required
      />
      <br/>
      <label>Last name:</label>
      <br/>
      <input 
        style={style.form.inputs}
        className='userLastname'
        name='userLastname' 
        type='text'
        value={isSubmit ? '' : form.userLastname}
        onChange={addField}
        required
      />
      <br/>
      <label>Phone:</label>
      <br/>
      <input
        style={style.form.inputs, errorPhoneValid ? style.form.error : null}
        className='userPhone' 
        name='userPhone' 
        type='text'
        value={isSubmit ? '' : form.userPhone}
        onChange={addField}
        required
      />
      <br/>
      <input 
        style={style.form.submitBtn} 
        className='submitButton'
        type='submit' 
        value='Add User' 
      />
    </form>
  )
}

function InformationTable({ userList }) {
  return (
    <table style={style.table} className='informationTable'>
      <thead> 
        <tr>
          <th style={style.tableCell}>First name</th>
          <th style={style.tableCell}>Last name</th>
          <th style={style.tableCell}>Phone</th>
        </tr>
      </thead>
      <tbody>
      {userList.length ? userList.map((e,k) => (
          <tr key={k}>
            <td style={style.tableCell}>{e.userFirstname}</td>
            <td style={style.tableCell}>{e.userLastname}</td>
            <td style={style.tableCell}>{e.userPhone}</td>
          </tr>
      )) : 
      null
      }
      </tbody>
    </table>
  );
}

function Application(props) {

  const [userList, setUserList] = useState([]);
  
  return (
    <section>
      <PhoneBookForm
      setUserList={setUserList}
      userList={userList} />
      <InformationTable
      userList={userList} />
    </section>
  );
}

ReactDOM.render(
  <Application />,
  document.getElementById('root')
);