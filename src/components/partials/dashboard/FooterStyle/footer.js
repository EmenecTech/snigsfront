import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-body">
                <ul className="left-panel list-inline mb-0 p-0">
                    <li className="list-inline-item"><Link to="/dashboard/extra/privacy-policy">Privacy Policy</Link></li>
                    <li className="list-inline-item"><Link to="/dashboard/extra/terms-of-service">Terms of Use</Link></li>
                </ul>
                <div className="right-panel">
                    ©<script>document.write(new Date().getFullYear())</script>  SNIGS
                    <span className="text-gray">

                    </span> by <Link to="https://iqonic.design/">EMENEC</Link>.
                </div>
            </div>
        </footer>
    )
}

export default Footer
