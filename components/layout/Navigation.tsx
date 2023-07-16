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
         / 
        <Link href={'/items/my-items'}>
            My Items
        </Link>
         / 
        <Link href={'/items/create'}>
            Create
        </Link>
        /
        <Link href={'/reviews'}>
            Reviews
        </Link>
        /
        <Link href={'/admin/items'}>
            Items(Admin)
        </Link>
        /
        <Link href={'/admin/users'}>
            User(Admin)
        </Link>
        /
        <Link href={'/users/login'}>
            Login
        </Link>
        /
        <Link href={'/users/register'}>
            Register
        </Link>
    </div>
};

export default Navigation;