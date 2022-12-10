import Link from "next/link";

const Navigation: React.FC = ({}) => {
    return <div>
        <Link href={'/'}>
            Home
        </Link>
         / 
        <Link href={'/items'}>
            Items
        </Link>
    </div>
};

export default Navigation;