import './footerMain.css';
import { AiFillTikTok } from "react-icons/ai";
import { FaInstagramSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaReddit } from "react-icons/fa";

const FooterMain = () => {
    return (
        <footer className="footer-main">
            <div className='footer-content'>
                <p>@2025 Technical Task. All Reghts Reserved.</p>
                <a href="" className='link'>Terms & Conditions</a>
            </div>
            <div className="footer-icons">
                <FaReddit className='footer-icon'/>  
                <FaLinkedin className='footer-icon'/>
                <FaTwitter className='footer-icon'/>
                <AiFillTikTok className='footer-icon'/>
                <FaInstagramSquare className='footer-icon'/>

            </div>
        </footer>
    )
}

export default FooterMain
