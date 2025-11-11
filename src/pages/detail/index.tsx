import { useEffect, useState} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import {type CoinsProps } from '../home'
import styles from './detail.module.css'

interface ResponseData{
    data:CoinsProps;
}

interface ErrorData{
    error:string;
}

type DataProps = ResponseData | ErrorData 

export function Detail(){

    const [coin, setCoin] = useState<CoinsProps>()
    const [loading, setLoading] = useState(true);
    const {cripto} = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        async function getCoin(){
            try{
                fetch(`https://rest.coincap.io/v3/assets/${cripto}?apiKey=c5e3d82fa6795de9037e3cf25ae447ddf2a892a973dd9d3ea7c0b2c771750637`)
                .then(response=>response.json())
                .then((data:DataProps)=>{
                    if("error" in data){
                        navigate("/")
                        return;
                    }

                    const price = Intl.NumberFormat("en-US",{
                        style:"currency",
                        currency:"USD"
                    })

                    const priceCompact = Intl.NumberFormat("en-US",{
                        style: "currency",
                        currency:"USD",
                        notation:"compact"
                    })

                    const resultData ={

                        ...data.data,
                        formatedPrice:price.format(Number(data.data.priceUsd)),
                        formaterdMarket:priceCompact.format(Number(data.data.marketCapUsd)),
                        formatedVolume:priceCompact.format(Number(data.data.volumeUsd24Hr))
                    }

                    setCoin(resultData);
                    console.log(resultData)
                    setLoading(false);
                })

            }catch(error){
                console.log(error)
                navigate("/")

            }
    }
    getCoin()

    },[])


    if(loading){
        return(
            <div className={styles.container}>
                <h1 className={styles.center}>Cargando Moneda...</h1>
            </div>
        )
    }
   

    return(
        <div className={styles.container}>
            <h1 className={styles.center}>{coin?.name}</h1>
            <h1 className={styles.center}>{coin?.symbol}</h1>
            
            <section className={styles.content}>
                <img 
                src={`https://assets.coincap.io/assets/icons/${coin?.symbol.toLocaleLowerCase()}@2x.png`} 
                alt='Logo de la moneda'
                className={styles.logo}
                />

                <h1>{coin?.name}|{coin?.symbol}</h1>
                <p><strong>Precio:</strong>{coin?.formatedPrice}</p>

                <a>
                    <strong>Mercado:</strong>{coin?.formaterdMarket}
                </a>

                <a>
                    <strong>Volumen:</strong>{coin?.formatedVolume}
                </a>

                <a>
                    <strong>Variación 24h:</strong>
                    <span className={Number(coin?.changePercent24Hr)>0? styles.profit : styles.loss}>{Number(coin?.changePercent24Hr).toFixed(2)}</span> 
                </a>

            </section>

        </div>
    )
}