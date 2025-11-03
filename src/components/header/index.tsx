import styles from './header.module.css'
import {Link} from 'react-router-dom'
export function Header(){
    return(
     <header className={styles.container}>
        <Link to='/'>
                <img src="/logo.svg" alt="logo DevCurrency"/>
        </Link>

     </header>
    )
}