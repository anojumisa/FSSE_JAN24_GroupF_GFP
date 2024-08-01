export default function Navbar() {
    return (
        <div className="flex justify-between ">
            <div>
                <div>Logo</div>
            </div>
            <div className="flex gap-4">
                <div>Home</div>
                <div>About</div>
                <div>Browse</div>
                <div>Contact</div>
                <div>Become Seller</div>
            </div>
            <div className="flex gap-4">
                <div>Log In</div>
                <div>Register</div>
            </div>
        </div>
    )
}