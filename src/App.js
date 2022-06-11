
import './App.css';
import { useEffect,useState } from 'react';

function App() {
  const [Crypto, setCrypto] = useState([]);
  const [Coin,setCoin] = useState("");
  useEffect(()=>{
    fetch("https://api.coinstats.app/public/v1/coins?skip=0&limit=100¤cy=INR")
    .then((res)=>res.json())
    .then(res=>{
      setCrypto(res.coins);
    })
  },[])
  const getData = () =>{
      fetch("https://api.coinstats.app/public/v1/coins?skip=0&limit=100¤cy=INR")
      .then((res)=>res.json())
      .then(res=>{
        setCrypto(res.coins);
      })
  }
  return (
    <div className="App">
      <div style={{display:'flex',alignItems:"center",justifyContent:"center",gap:30}}>
        <input placeholder='Search' onChange={(c)=>setCoin(c.target.value)}/>
        <img className="refresh" src={require("./Refresh-icon.png")} alt='refresh' onClick={getData}/>
      </div>
      <table>
        <thead>
          <tr>
            <td>Rank</td>
            <td>Name</td>
            <td>Symbol</td>
            <td>Market Cap</td>
            <td>Price</td>
            <td>Available Supply</td>
            <td>Volume(24hrs)</td>
          </tr>
        </thead>
        <tbody>
          {Crypto.filter((item)=> {return item.name.toLowerCase().includes(Coin.toLowerCase())})
          .map((val)=>{
            return(
              <>
              <tr id={Math.random().toString()}>
                    <td className="rank">{val.rank}</td>
                    <td className="logo">
                      <a href={val.websiteUrl}>
                        <img src={val.icon} alt="logo" width="30px" />
                      </a>
                      <p>{val.name}</p>
                    </td>
                    <td className="symbol">{val.symbol}</td>
                    <td>₹{val.marketCap}</td>
                    <td>₹{val.price.toFixed(2)}</td>
                    <td>{val.availableSupply.toFixed(2)}</td>
                    <td>{Number(val.volume).toFixed(0)}</td>
              </tr>
              </>
            )
          })}
        </tbody>
      </table>
      <div className='name'>
        <p style={{textAlign:"center"}}>created by{" "}
         <span >Youssef Elbltagi</span></p>
      </div>
    </div>
  );
}

export default App;
