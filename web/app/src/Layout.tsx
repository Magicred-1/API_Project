import React from 'react';
import Link from 'next/link';
import Head from "next/head";

export const Menu = () => (
    <nav>
        <Head>
            <link rel="stylesheet" href="/css/menu.css" />
        </Head>
        <ul>
            <li>
                <Link href="/tickets">Tickets</Link>
                <ul>
                    <li><Link href="/tickets/create">Create Ticket</Link></li>
                </ul>
            </li>

            <li>
                <Link href="/spaces">Spaces</Link>
                <ul>
                    <li><Link href="/spaces/create">Create Space</Link></li>
                </ul>
            </li>

            <li>
                <Link href="/employees">Employees</Link>
                <ul>
                    <li><Link href="/employees/create">Create Employee</Link></li>
                </ul>
            </li>

            <li>
                <Link href="/animals">Animals</Link>
                <ul>
                    <li><Link href="/animals/create">Create Animal</Link></li>
                </ul>
            </li>

        </ul>
    </nav>
);

export default Menu;
