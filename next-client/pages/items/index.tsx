import Link from 'next/link';
import React from 'react'

const ItemsHome = () => {
  return (
    <div>
        <h1>Items Home</h1>
        <Link href={'/items/furniture-&-appliances/1523/stove'}>
          <a href="/items/furniture-&-appliances/1523/stove">Stove</a>
        </Link>
    </div>
  )
}

export default ItemsHome;