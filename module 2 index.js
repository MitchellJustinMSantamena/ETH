import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [isHidden, setIsHidden] = useState(false);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [sex, setSex] = useState('');
  const [cellphone, setCellphone] = useState('');
  const [signedUp, setSignedUp] = useState(false);
  const [dateTime, setDateTime] = useState('');

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(account);
    }
  };

  const handleAccount = (account) => {
    if (account) {
      console.log("Account connected: ", account);
      setAccount(account);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert('MetaMask wallet is required to connect');
      return;
    }

    const accounts = await ethWallet.request({ method: 'eth_requestAccounts' });
    handleAccount(accounts);

    // once wallet is set we can get a reference to our deployed contract
    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);

    setATM(atmContract);
  };

  const getBalance = async () => {
    if (atm) {
      setBalance((await atm.getBalance()).toNumber());
    }
  };

  const deposit = async () => {
    if (atm) {
      let tx = await atm.deposit(1);
      await tx.wait();
      getBalance();
    }
  };

  const withdraw = async () => {
    if (atm) {
      let tx = await atm.withdraw(1);
      await tx.wait();
      getBalance();
    }
  };

  const handleSignup = () => {
    // Validate name, age, sex, and cellphone number
    if (name.trim() === '' || age.trim() === '' || sex.trim() === '' || cellphone.trim() === '') {
      alert('Please provide all required information.');
      return;
    }

    // Save the user's information
    // For now, we'll just set signedUp to true to simulate signup completion
    setSignedUp(true);
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    setDateTime(now.toLocaleString());
  };

  const renderSignupForm = () => {
    return (
      <div>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="text" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />
        <input type="text" placeholder="Sex" value={sex} onChange={(e) => setSex(e.target.value)} />
        <input type="text" placeholder="Cellphone Number" value={cellphone} onChange={(e) => setCellphone(e.target.value)} />
        <button onClick={handleSignup}>Sign Up</button>
      </div>
    );
  };

  const initUser = () => {
    if (!ethWallet) {
      return <p>Please install MetaMask to use this ATM.</p>;
    }

    if (!account) {
      return <button onClick={connectAccount}>Connect to Friday</button>;
    }

    if (!signedUp) {
      return renderSignupForm();
    }

    if (balance === undefined) {
      getBalance();
    }

    return (
      <div className="atm">
        {!isHidden && (
          <div className="account-info">
            <p>Your Account: {account}</p>
            <p>Your Balance: {balance} ETH</p>
          </div>
        )}
        <button className="toggle-button" onClick={() => setIsHidden(!isHidden)}>
          {isHidden ? 'Show' : 'Hide'} Account Details
        </button>
        <button className="action-button" onClick={deposit}>Deposit 1 ETH</button>
        <button className="action-button" onClick={withdraw}>Withdraw 1 ETH</button>
        <button onClick={getCurrentDateTime}>View Current Date and Time</button>
        <p>{dateTime}</p>
      </div>
    );
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <main className="container">
      <header><h1>Welcome to Friday</h1></header>
      {initUser()}
      <style jsx>{`
        .container {
          text-align: center;
          padding: 2rem;
          font-family: Arial, sans-serif;
        }

        header {
          background-color: #282c34;
          padding: 1rem;
          color: white;
          margin-bottom: 2rem;
        }

        .atm {
          background: #f4f4f4;
          border: 1px solid #ddd;
          border-radius: 10px;
          padding: 2rem;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
          max-width: 400px;
          margin: 0 auto;
        }

        .account-info {
          margin-bottom: 1rem;
        }

        .toggle-button, .action-button {
          background-color: #007bff;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          margin: 0.5rem;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .toggle-button:hover, .action-button:hover {
          background-color: #0056b3;
        }

        .toggle-button {
          background-color: #17a2b8;
        }

        .toggle-button:hover {
          background-color: #117a8b;
        }
      `}</style>
    </main>
  );
}
