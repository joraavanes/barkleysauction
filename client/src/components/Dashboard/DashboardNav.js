import React from 'react'
import { NavLink } from 'react-router-dom'

import styles from './styles/Dashboard.scss'

const DashboardNav = () => {
    return (
        <div className={styles.dashboardContainer}>
            <h5 className={styles.listGroupHeader}>Barkley's Dashboard</h5>
            <ul className="list-group list-group-flush ">
                <li className={styles.listGroupItem}>
                    <NavLink to="/Dashboard" className={styles.listLink}>Dashboard</NavLink>
                </li>
                <li className={styles.listGroupItem}>
                    <NavLink to="/Dashboard/items/list-an-item" className={styles.listLink}>New Item</NavLink>
                </li>
                <li className={styles.listGroupItem}>
                    <NavLink to="/dashboard/users" className={styles.listLink}>Users</NavLink>
                </li>
                <li className={styles.listGroupItem}>
                    <NavLink to="/dashboard/list-an-item" className={styles.listLink}>New Item</NavLink>
                </li>
                <li className={styles.listGroupItem}>
                    <NavLink to="/dashboard/list-an-item" className={styles.listLink}>New Item</NavLink>
                </li>
                <li className={styles.listGroupItem}>
                    <NavLink to="/dashboard/list-an-item" className={styles.listLink}>New Item</NavLink>
                </li>
            </ul>
        </div>
    );
};

export default DashboardNav;