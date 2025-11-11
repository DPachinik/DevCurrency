import { BsSearch } from 'react-icons/bs'
import styles from './home.module.css'
import {  Link, useNavigate } from 'react-router-dom'
import { useEffect, useState, type FormEvent } from 'react'


export interface CoinsProps{
    id:string;
    name:string;
    symbol:string;
    priceUsd:string;
    vwap24Hr:string;
    changePercent24Hr:string;
    rank:string;
    supply:string;
    maxSupply:string;
    marketCapUsd:string;
    volumeUsd24Hr:string;
    explorer:string;
    formatedPrice?:string;
    formaterdMarket?:string;
    formatedVolume?:string;
}

interface DataProps{
    data:CoinsProps[];
}

export function Home(){

    const [input, setInput] = useState('');

    const [coins, setCoins]= useState<CoinsProps[]>([]);

    const [offset,setOffset] =useState(0);

    const navigate = useNavigate();

    useEffect(()=>{
        getData();
    },[offset])

    async function getData(){
        fetch(`https://rest.coincap.io/v3/assets?limit=10&offset=${offset}&apiKey=c5e3d82fa6795de9037e3cf25ae447ddf2a892a973dd9d3ea7c0b2c771750637`)
        .then(response =>response.json())
        .then((data:DataProps)=>{
            const coinsData = data.data;

            const price = Intl.NumberFormat("en-US",{
                style:"currency",
                currency:"USD"
            })

            const priceCompact = Intl.NumberFormat("en-US",{
                style: "currency",
                currency:"USD",
                notation:"compact"
            })

            const formatedResult = coinsData.map((item)=>{
                const formated = {
                    ...item,
                    formatedPrice:price.format(Number(item.priceUsd)),
                    formaterdMarket:priceCompact.format(Number(item.marketCapUsd)),
                    formatedVolume:priceCompact.format(Number(item.volumeUsd24Hr))
                }
                return formated
            })
            const listCoins = [...coins, ...formatedResult]
            setCoins(listCoins);
        })


        
    }

    function handleSubmit(e:FormEvent){
        e.preventDefault()

        if(input === '') return;

        navigate(`/detail/${input}`)

        
    }

    function handleMoreclick(){
        if(offset === 0 ){
            setOffset(10);
            return
        }
        setOffset(offset+10);
    }

    return(
        <main className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <input 
                type="text"
                placeholder="ingrese una moneda"
                value={input}
                onChange={(e)=>setInput(e.target.value)}
                />
                
                <button type="submit" className={styles.buttonSearch}>
                    <BsSearch size={30} color='#ffff' />
                </button>
            </form>

            <table>
                <caption>TOP CRIPTOMONEDAS DEL MERCADO</caption>

                <thead>
                    <tr>
                        <th scope='col'>Moneda</th>
                        <th scope='col'>Valor Mercado</th>
                        <th scope='col'>Precio</th>
                        <th scope='col'>Volumen</th>
                        <th scope='col'>Variación 24h </th>
                    </tr>
                </thead>

                <tbody id='tbody'>
                    {coins.length >0 && coins.map((item)=>(
                        <tr className={styles.tr} key={item.id}>
                        <td className={styles.tdlabel} data-label='Moneda'>
                            <div className={styles.name}>
                                <img src={`https://assets.coincap.io/assets/icons/${item.symbol.toLocaleLowerCase()}@2x.png`} 
                                alt='icono de moneda'
                                className={styles.img}
                                />
                                <Link to={`/detail/${item.id}`}>
                                    <span>{item.name}</span> | {item.symbol}
                                </Link>
                            </div>
                        </td>
                        <td className={styles.tdlabel} data-label='Valor Mercado'>
                            {item.formaterdMarket}
                        </td>
                        <td className={styles.tdlabel} data-label='Precio'>
                            {item.formatedPrice}
                        </td>
                        <td className={styles.tdlabel} data-label='Volumen'>
                            {item.formatedVolume}
                        </td>
                        <td className={Number(item.changePercent24Hr) > 0?`${styles.tdProfit}`:`${styles.tdLoss}`} data-label='Variación 24h'>
                            <span>{Number(item.changePercent24Hr).toFixed(2)}</span>
                        </td>
                    </tr>
                    ))}
                </tbody>


            </table>

            <button className={styles.buttonMore} onClick={handleMoreclick}>
                Cargar más
            </button>

        </main>
    )
}