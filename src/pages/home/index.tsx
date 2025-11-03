import { BsSearch } from 'react-icons/bs'
import styles from './home.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState, type FormEvent } from 'react'


export function Home(){

    const [input, setInput] = useState('')

    const navigate = useNavigate();

    function handleSubmit(e:FormEvent){
        e.preventDefault()

        if(input === '') return;

        navigate(`/detail/${input}`)

        
    }

    function handleMoreclick(){
        alert('hola')
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
                
                <button type="submit">
                    <BsSearch size={30} color='#ffff' />
                </button>
            </form>

            <table>
                <caption>Top criptomonedas del mercado</caption>

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
                    <tr className={styles.tr}>
                        <td className={styles.tdlabel} data-label='Moneda'>
                            <div className={styles.name}>
                                <Link to='/detail/bitcoin'>
                                    <span>Bitcoin</span> | BT
                                </Link>
                            </div>
                        </td>
                        <td className={styles.tdlabel} data-label='Valor Mercado'>
                            1T
                        </td>
                        <td className={styles.tdlabel} data-label='Precio'>
                            8.000
                        </td>
                        <td className={styles.tdlabel} data-label='Volumen'>
                            2B
                        </td>
                        <td className={styles.tdProfit} data-label='Variación 24h'>
                            <span>1.20</span>
                        </td>
                    </tr>
                </tbody>


            </table>

            <button className={styles.buttonMore} onClick={handleMoreclick}>
                Cargar más
            </button>

        </main>
    )
}