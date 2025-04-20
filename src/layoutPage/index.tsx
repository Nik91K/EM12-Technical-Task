import './index.css'
import HeaderMain from '../components/headerComponent/headerMain'
import FooterMain from '../components/footerComponent/footerMain'

const LayoutPage = ({title, children} : {title: string, children:React.ReactNode}) =>{
    return (
        <div className="wrapper">
            <HeaderMain userName='User' />
            <main className='layout-main'>
                <h2 className='layout-h2'>{title}</h2>
                <div className="content">
                    {children}
                </div>
            </main>
            <FooterMain />
        </div>
    )
}

export default LayoutPage
