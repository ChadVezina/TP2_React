function Header({ title, description }) {
    return (
        <header className="p-4">
            <h1 className="text-4xl font-bold text-center text-slate-800">{title}</h1>
            <p className="text-lg text-center text-slate-600">{description}</p>
        </header>
    );
}

export default Header;