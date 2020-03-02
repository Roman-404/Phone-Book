import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const style = {
  table: {
    width: '60%',
    margin: 'auto',
    marginTop: '50px',
    textAlign: 'center'
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
      margin: '50px',
      marginRight: 0,
      padding: '50px',
      border: '1px solid #cad9e6',
      borderRadius: '15px',
      width: 'max-content',
      backgroundColor: '#F0F8FF'
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
      padding: '2px',
      marginBottom: '5px'
    }
  },
  tbody: {textAlign: 'center'}
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
    const re = (/^((8|\+7)[-]?)?(\(?\d{3}\)?[-]?)?[\d-]{7,12}(\d)$/);
    if (!re.test(phone_number)) {
      setSuccessPhoneValid(false)
      setErrorPhoneValid(true)
    }
    else {
      setSuccessPhoneValid(true)
      setErrorPhoneValid(false)
    }
    return phone_number.replace(/(\d+)[\s-]?(\d{2})[\s-]?(\d{2})/g, '$1-$2-$3')
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
        style={errorPhoneValid ? style.form.error : style.form.inputs}
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

  const sortByLastname = (field) => {
    return (a, b) => a[field].toLowerCase() > b[field].toLowerCase() ? 1 : -1;
  };
  
  return (
    <table style={style.table} className='table table-striped' aria-labelledby="tabelLabel">
      <thead className='table-dark'> 
        <tr>
          <th style={style.tableCell}>First name</th>
          <th style={style.tableCell}>Last name</th>
          <th style={style.tableCell}>Phone</th>
        </tr>
      </thead>
      <tbody style={style.tbody}>
      {userList.length ? userList.sort(sortByLastname('userLastname')).map((e,k) => (
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
    <section style={{display: 'flex'}}>
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