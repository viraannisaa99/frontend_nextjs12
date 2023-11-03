//import Link
import Link from "next/link";

function Navbar() {
	return (
		<header>
			<nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark fixed-top border-0 shadow-sm">
				<div className="container">
					<Link href="/" className="navbar-brand">
						LARAVEL & NEXT.JS
					</Link>
					<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarCollapse">
						<ul className="navbar-nav me-auto mb-2 mb-md-0">
							<li className="nav-item">
								<Link href="/posts" className="nav-link">
									POSTS
								</Link>
							</li>
						</ul>
						<ul className="navbar-nav ms-auto mb-2 mb-lg-0">
							<li className="nav-item">
								<Link href="/register" className="nav-link btn btn-primary btn-sm text-white shadow border-0 me-3">
									REGISTER
								</Link>
							</li>
							<li className="nav-item">
								<Link href="/login" className="nav-link btn btn-success btn-sm text-white shadow border-0">
									LOGIN
								</Link>
							</li>
						</ul>
						<form className="d-flex ms-3">
							<input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
							<button className="btn btn-success" type="submit">
								Search
							</button>
						</form>
					</div>
				</div>
			</nav>
		</header>
	);
}

export default Navbar;
