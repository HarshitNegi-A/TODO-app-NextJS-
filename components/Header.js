import React from 'react';
import styles from './Header.module.css';
import Link from 'next/link';

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>Task Manager</div>
            <nav className={styles.navLinks}>
                <Link href="/" className={styles.navLink}>
                    Home
                </Link>
                <Link href="/completed-task" className={styles.navLink}>
                    Completed Tasks
                </Link>
            </nav>
        </header>
    );
};

export default Header;
